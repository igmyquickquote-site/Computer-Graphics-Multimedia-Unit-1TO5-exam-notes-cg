import os

import pytest
import requests
from dotenv import dotenv_values

frontend_env = dotenv_values("/app/frontend/.env")
base_url = os.environ.get("REACT_APP_BACKEND_URL") or frontend_env.get("REACT_APP_BACKEND_URL")
if not base_url:
    raise RuntimeError("REACT_APP_BACKEND_URL is missing")
BASE_URL = base_url.rstrip("/")

TOPIC_IDS = ["intro-cg", "display-devices", "crt", "raster-scan", "random-scan",
             "rgb", "cmy", "hsv", "dda", "scan-conversion"]


@pytest.fixture(scope="session")
def api():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s


@pytest.fixture(scope="session")
def unit(api):
    r = api.get(f"{BASE_URL}/api/units/cg-unit-1", timeout=30)
    assert r.status_code == 200, r.text[:300]
    return r.json()


# --- Module: root & units listing ---
class TestUnitsList:
    def test_root(self, api):
        r = api.get(f"{BASE_URL}/api/", timeout=30)
        assert r.status_code == 200
        assert "message" in r.json()

    def test_list_units(self, api):
        r = api.get(f"{BASE_URL}/api/units", timeout=30)
        assert r.status_code == 200
        data = r.json()
        assert isinstance(data, list) and len(data) >= 1
        u = next((x for x in data if x.get("unit_id") == "cg-unit-1"), None)
        assert u is not None, f"cg-unit-1 missing: {data}"
        for k in ["unit_id", "unit_number", "title", "subtitle", "subject"]:
            assert k in u, f"missing {k}"
        assert "_id" not in u
        assert "topics" not in u  # projection should exclude heavy fields

    def test_nonexistent_unit_404(self, api):
        r = api.get(f"{BASE_URL}/api/units/nonexistent", timeout=30)
        assert r.status_code == 404
        assert r.json().get("detail") == "Unit not found"


# --- Module: unit detail structure ---
class TestUnitDetail:
    def test_no_object_id(self, unit):
        assert "_id" not in unit

    def test_ten_topics_ids(self, unit):
        topics = unit["topics"]
        assert len(topics) == 10, f"got {len(topics)}"
        assert [t["id"] for t in topics] == TOPIC_IDS

    @pytest.mark.parametrize("field", ["id", "number", "title", "analogy", "definition",
                                       "working", "diagram_key", "key_points",
                                       "memory_trick", "answer_5", "answer_10"])
    def test_topic_fields(self, unit, field):
        for t in unit["topics"]:
            assert field in t, f"topic {t.get('id')} missing {field}"
            assert t[field] not in (None, "", []), f"topic {t.get('id')} empty {field}"
        if field in ("working", "key_points"):
            for t in unit["topics"]:
                assert isinstance(t[field], list) and len(t[field]) > 0

    def test_final_sections(self, unit):
        fs = unit["final_sections"]
        expected = {"last_minute_revision": 10, "must_memorize": 15,
                    "must_draw": 8, "answer_templates": 8}
        for key, count in expected.items():
            assert key in fs, f"missing {key}"
            assert len(fs[key]) == count, f"{key} has {len(fs[key])} not {count}"

    def test_final_section_item_shapes(self, unit):
        fs = unit["final_sections"]
        for it in fs["last_minute_revision"]:
            assert it["topic"] and it["line"]
        for it in fs["must_memorize"]:
            assert it["term"] and it["definition"]
        for it in fs["must_draw"]:
            assert it["diagram_key"] and it["label"] and it["tip"]
        for it in fs["answer_templates"]:
            assert it["title"] and it["marks"] and isinstance(it["steps"], list) and it["steps"]


# --- Module: DDA solved example ---
class TestDDA:
    @pytest.fixture(scope="class")
    def dda(self, unit):
        t = next(x for x in unit["topics"] if x["id"] == "dda")
        assert "solved_example" in t
        return t["solved_example"]

    def test_table_seven_rows(self, dda):
        rows = dda["table"]["rows"]
        assert len(rows) == 7, f"got {len(rows)}"
        assert len(dda["table"]["headers"]) == 5

    def test_pixels(self, dda):
        expected = [(2, 3), (3, 4), (4, 4), (5, 5), (6, 5), (7, 6), (8, 6)]
        rows = dda["table"]["rows"]
        for (px, py), row in zip(expected, rows):
            txt = " ".join(str(v) for v in row).replace(" ", "")
            assert f"({px},{py})" in txt, f"pixel ({px},{py}) not in row {row}"

    def test_params(self, dda):
        blob = str(dda)
        for token in ["6", "3", "0.5", "1"]:
            assert token in blob
        assert "\u0394x" in blob or "dx" in blob.lower() or "Δx" in blob
