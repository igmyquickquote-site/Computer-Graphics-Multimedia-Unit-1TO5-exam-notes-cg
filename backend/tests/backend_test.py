"""CG Revision Booklet backend regression suite (compact schema, Unit 1 + Unit 2)."""
import os

import pytest
import requests
from dotenv import dotenv_values

frontend_env = dotenv_values("/app/frontend/.env")
base_url = os.environ.get("REACT_APP_BACKEND_URL") or frontend_env.get("REACT_APP_BACKEND_URL")
if not base_url:
    raise RuntimeError("REACT_APP_BACKEND_URL is missing")
BASE_URL = base_url.rstrip("/")

UNIT2_TOPIC_IDS = [
    "bresenham", "midpoint-circle", "polygon-fill", "transforms",
    "reflect-shear", "homogeneous", "window-viewport", "clipping",
]
UNIT1_TOPIC_IDS = [
    "intro-cg", "display-devices", "crt", "raster-scan", "random-scan",
    "rgb", "cmy", "hsv", "dda", "scan-conversion",
]
UNIT3_TOPIC_IDS = [
    "3d-concepts", "3d-translate-scale", "3d-rotation", "parallel-projection",
    "perspective-projection", "hidden-surface", "bezier", "bspline",
]
UNIT4_TOPIC_IDS = [
    "intro-multimedia", "mm-components", "text-images", "digital-audio",
    "digital-video", "animation", "compression", "mm-applications",
]
UNIT5_TOPIC_IDS = [
    "jpeg", "mpeg", "huffman", "cd-dvd", "streaming", "vr-ar",
    "mm-project", "file-formats",
]


@pytest.fixture(scope="session")
def api():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s


@pytest.fixture(scope="session")
def unit1(api):
    r = api.get(f"{BASE_URL}/api/units/cg-unit-1", timeout=30)
    assert r.status_code == 200, r.text[:300]
    return r.json()


@pytest.fixture(scope="session")
def unit2(api):
    r = api.get(f"{BASE_URL}/api/units/cg-unit-2", timeout=30)
    assert r.status_code == 200, r.text[:300]
    return r.json()


@pytest.fixture(scope="session")
def unit3(api):
    r = api.get(f"{BASE_URL}/api/units/cg-unit-3", timeout=30)
    assert r.status_code == 200, r.text[:300]
    return r.json()


@pytest.fixture(scope="session")
def unit4(api):
    r = api.get(f"{BASE_URL}/api/units/cg-unit-4", timeout=30)
    assert r.status_code == 200, r.text[:300]
    return r.json()


@pytest.fixture(scope="session")
def unit5(api):
    r = api.get(f"{BASE_URL}/api/units/cg-unit-5", timeout=30)
    assert r.status_code == 200, r.text[:300]
    return r.json()


# --- health / root ---
class TestHealth:
    def test_root(self, api):
        r = api.get(f"{BASE_URL}/api/", timeout=30)
        assert r.status_code == 200
        assert "message" in r.json()


# --- /api/units listing ---
class TestUnitsList:
    def test_list_units(self, api):
        r = api.get(f"{BASE_URL}/api/units", timeout=30)
        assert r.status_code == 200
        data = r.json()
        assert isinstance(data, list) and len(data) == 5
        assert [u["unit_id"] for u in data] == [
            "cg-unit-1", "cg-unit-2", "cg-unit-3", "cg-unit-4", "cg-unit-5",
        ]
        assert [u["unit_number"] for u in data] == [1, 2, 3, 4, 5]
        for u in data:
            assert "_id" not in u
            for k in ("title", "subtitle", "subject"):
                assert u.get(k)
            # listing must be lightweight (no topics payload)
            assert "topics" not in u

    def test_unknown_unit_404(self, api):
        r = api.get(f"{BASE_URL}/api/units/does-not-exist", timeout=30)
        assert r.status_code == 404
        assert r.json().get("detail") == "Unit not found"


# --- Unit 2 structure ---
class TestUnit2:
    def test_meta_and_topic_ids(self, unit2):
        assert unit2["unit_number"] == 2
        assert unit2["title"] == "CG Unit 2 — Rapid Revision"
        assert "_id" not in unit2
        assert [t["id"] for t in unit2["topics"]] == UNIT2_TOPIC_IDS

    def test_topic_schema_compact(self, unit2):
        for t in unit2["topics"]:
            assert "quick_facts" in t and isinstance(t["quick_facts"], list) and t["quick_facts"]
            assert "key_points" not in t  # old schema removed
            assert t.get("title") and t.get("definition")
            assert isinstance(t.get("number"), int)

    def test_final_sections(self, unit2):
        fs = unit2["final_sections"]
        assert set(fs.keys()) == {"cheat_card", "last_minute_revision", "must_memorize"}
        cc = fs["cheat_card"]
        assert cc["read_time"]
        assert isinstance(cc["formulas"], list) and len(cc["formulas"]) >= 6
        assert isinstance(cc["hooks"], list) and len(cc["hooks"]) >= 6
        assert len(fs["last_minute_revision"]) == 8
        assert len(fs["must_memorize"]) == 10

    def test_bresenham_solved_example(self, unit2):
        t = next(t for t in unit2["topics"] if t["id"] == "bresenham")
        table = t["solved_example"]["table"]
        assert len(table["rows"]) == 7
        assert table["rows"][-1][-1] == "(8, 6)"
        assert t["diagram_key"] == "dda-grid"

    def test_midpoint_circle_solved_example(self, unit2):
        t = next(t for t in unit2["topics"] if t["id"] == "midpoint-circle")
        table = t["solved_example"]["table"]
        assert len(table["rows"]) == 4
        assert "(4, 3)" in table["rows"][-1][-1]
        assert "stop" in table["rows"][-1][-1]

    def test_diagram_keys(self, unit2):
        keys = {t["id"]: t.get("diagram_key") for t in unit2["topics"]}
        assert keys["clipping"] == "region-codes"
        assert keys["homogeneous"] is None  # intentionally no diagram
        assert keys["window-viewport"] == "window-viewport"


# --- Unit 1 structure (compacted) ---
class TestUnit1:
    def test_meta_and_topics(self, unit1):
        assert unit1["unit_number"] == 1
        assert [t["id"] for t in unit1["topics"]] == UNIT1_TOPIC_IDS

    def test_cheat_card(self, unit1):
        fs = unit1["final_sections"]
        assert set(fs.keys()) == {"cheat_card", "last_minute_revision", "must_memorize"}
        cc = fs["cheat_card"]
        assert len(cc["formulas"]) == 6
        assert len(cc["hooks"]) == 6
        assert cc["read_time"]
        assert "must_draw" not in fs and "answer_templates" not in fs

    def test_dda_table_four_columns(self, unit1):
        t = next(t for t in unit1["topics"] if t["id"] == "dda")
        table = t["solved_example"]["table"]
        assert len(table["headers"]) == 4
        for row in table["rows"]:
            assert len(row) == 4

    def test_quick_facts_present(self, unit1):
        for t in unit1["topics"]:
            assert t.get("quick_facts")
            assert "key_points" not in t


# --- Unit 3 structure (3D graphics, new feature) ---
class TestUnit3:
    def test_meta_and_topic_ids(self, unit3):
        assert unit3["unit_number"] == 3
        assert unit3["title"] == "CG Unit 3 — Rapid Revision"
        assert "_id" not in unit3
        assert [t["id"] for t in unit3["topics"]] == UNIT3_TOPIC_IDS
        assert len(unit3["topics"]) == 8

    def test_topic_schema_compact(self, unit3):
        for t in unit3["topics"]:
            for k in ("analogy", "definition", "working", "quick_facts", "memory_trick"):
                assert t.get(k), f"{t['id']} missing {k}"
            assert isinstance(t["working"], list) and t["working"]
            assert isinstance(t["quick_facts"], list) and t["quick_facts"]
            assert "key_points" not in t
            assert isinstance(t.get("number"), int)
            assert t.get("title")

    def test_solved_examples_only_on_four_topics(self, unit3):
        got = [t["id"] for t in unit3["topics"] if t.get("solved_example")]
        assert got == ["3d-translate-scale", "3d-rotation", "perspective-projection", "bezier"]

    def test_translate_scale_result(self, unit3):
        t = next(t for t in unit3["topics"] if t["id"] == "3d-translate-scale")
        rows = t["solved_example"]["table"]["rows"]
        assert rows[-1][-1] == "(6, 10, 14)"

    def test_rotation_result(self, unit3):
        t = next(t for t in unit3["topics"] if t["id"] == "3d-rotation")
        rows = t["solved_example"]["table"]["rows"]
        assert [r[-1] for r in rows] == ["\u22122", "1", "3"]
        assert "(\u22122, 1, 3)" in t["solved_example"]["note"]

    def test_perspective_results(self, unit3):
        t = next(t for t in unit3["topics"] if t["id"] == "perspective-projection")
        rows = t["solved_example"]["table"]["rows"]
        assert [r[-1] for r in rows] == ["3", "4"]

    def test_bezier_results(self, unit3):
        t = next(t for t in unit3["topics"] if t["id"] == "bezier")
        rows = t["solved_example"]["table"]["rows"]
        assert [r[-1] for r in rows] == ["4", "3"]

    def test_final_sections(self, unit3):
        fs = unit3["final_sections"]
        assert set(fs.keys()) == {"cheat_card", "last_minute_revision", "must_memorize"}
        cc = fs["cheat_card"]
        assert cc["read_time"]
        assert len(cc["formulas"]) == 7
        assert len(cc["hooks"]) == 6
        assert len(fs["last_minute_revision"]) == 8
        assert len(fs["must_memorize"]) == 10

    def test_comparison_tables(self, unit3):
        persp = next(t for t in unit3["topics"] if t["id"] == "perspective-projection")
        cmp1 = persp["comparison"]
        assert "Parallel vs Perspective" in cmp1["title"]
        assert len(cmp1["rows"]) == 5
        assert cmp1["headers"] == ["Point", "Parallel", "Perspective"]

        bs = next(t for t in unit3["topics"] if t["id"] == "bspline")
        cmp2 = bs["comparison"]
        assert "Bezier vs B-Spline" in cmp2["title"]
        assert len(cmp2["rows"]) == 4
        for row in cmp2["rows"]:
            assert len(row) == len(cmp2["headers"])

    def test_diagram_keys(self, unit3):
        keys = {t["id"]: t.get("diagram_key") for t in unit3["topics"]}
        assert keys == {
            "3d-concepts": "axes-3d",
            "3d-translate-scale": None,
            "3d-rotation": None,
            "parallel-projection": "projection-tree",
            "perspective-projection": "parallel-vs-perspective",
            "hidden-surface": "zbuffer",
            "bezier": "bezier",
            "bspline": None,
        }


# --- Unit 4 structure (Multimedia basics, new feature) ---
class TestUnit4:
    def test_meta_and_topic_ids(self, unit4):
        assert unit4["unit_number"] == 4
        assert unit4["title"] == "CG Unit 4 — Rapid Revision"
        assert unit4["subject"] == "Computer Graphics & Multimedia"
        assert "_id" not in unit4
        assert [t["id"] for t in unit4["topics"]] == UNIT4_TOPIC_IDS
        assert len(unit4["topics"]) == 8
        assert [t["number"] for t in unit4["topics"]] == list(range(1, 9))

    def test_topic_schema_compact(self, unit4):
        for t in unit4["topics"]:
            for k in ("analogy", "definition", "working", "quick_facts", "memory_trick"):
                assert t.get(k), f"{t['id']} missing {k}"
            assert isinstance(t["working"], list) and t["working"]
            assert isinstance(t["quick_facts"], list) and t["quick_facts"]
            assert "key_points" not in t
            assert isinstance(t.get("number"), int)
            assert t.get("title")

    def test_solved_examples_only_on_four_topics(self, unit4):
        got = [t["id"] for t in unit4["topics"] if t.get("solved_example")]
        assert got == ["text-images", "digital-audio", "digital-video", "compression"]

    def test_image_size_solved_example(self, unit4):
        t = next(t for t in unit4["topics"] if t["id"] == "text-images")
        se = t["solved_example"]
        rows = se["table"]["rows"]
        assert se["table"]["headers"] == ["Step", "Calculation", "Result"]
        assert rows[0][-1] == "4,80,000"
        assert rows[1][-1] == "14,40,000 B"
        assert "1.44 MB" in rows[-1][-1]

    def test_audio_size_solved_example(self, unit4):
        t = next(t for t in unit4["topics"] if t["id"] == "digital-audio")
        rows = t["solved_example"]["table"]["rows"]
        assert rows[0][-1] == "1,41,12,000 bits"
        assert rows[1][-1] == "17,64,000 B"
        assert "1.76 MB" in rows[-1][-1]

    def test_video_size_solved_example(self, unit4):
        t = next(t for t in unit4["topics"] if t["id"] == "digital-video")
        rows = t["solved_example"]["table"]["rows"]
        assert rows[0][-1] == "9,21,600 B"
        assert "230 MB" in rows[-1][-1]

    def test_compression_rle_solved_example(self, unit4):
        t = next(t for t in unit4["topics"] if t["id"] == "compression")
        se = t["solved_example"]
        rows = se["table"]["rows"]
        assert len(rows) == 4
        assert [r[1] for r in rows] == ["4A", "3B", "2C", "1D"]
        assert "10" in se["note"] and "8" in se["note"] and "1.25" in se["note"]

    def test_solved_example_row_widths(self, unit4):
        for t in unit4["topics"]:
            se = t.get("solved_example")
            if not se:
                continue
            assert se.get("title") and se.get("given") and se.get("note")
            headers = se["table"]["headers"]
            for row in se["table"]["rows"]:
                assert len(row) == len(headers), t["id"]

    def test_comparison_tables(self, unit4):
        expected = {
            "text-images": ("Bitmap vs Vector", ["Point", "Bitmap (Raster)", "Vector"]),
            "digital-audio": ("MIDI vs Digital Audio", ["Point", "MIDI", "Digital Audio"]),
            "compression": ("Lossless vs Lossy", ["Point", "Lossless", "Lossy"]),
        }
        with_cmp = [t["id"] for t in unit4["topics"] if t.get("comparison")]
        assert with_cmp == ["text-images", "digital-audio", "compression"]
        for tid, (title_part, headers) in expected.items():
            c = next(t for t in unit4["topics"] if t["id"] == tid)["comparison"]
            assert title_part in c["title"]
            assert c["headers"] == headers
            assert len(c["rows"]) == 4
            for row in c["rows"]:
                assert len(row) == len(headers)

    def test_final_sections(self, unit4):
        fs = unit4["final_sections"]
        assert set(fs.keys()) == {"cheat_card", "last_minute_revision", "must_memorize"}
        cc = fs["cheat_card"]
        assert cc["read_time"]
        assert len(cc["formulas"]) == 7
        assert len(cc["hooks"]) == 7
        assert len(fs["last_minute_revision"]) == 8
        assert len(fs["must_memorize"]) == 10
        for item in fs["last_minute_revision"]:
            assert item["topic"] and item["line"]
        for item in fs["must_memorize"]:
            assert item["term"] and item["definition"]

    def test_diagram_keys(self, unit4):
        keys = {t["id"]: t.get("diagram_key") for t in unit4["topics"]}
        assert keys == {
            "intro-multimedia": None,
            "mm-components": "mm-components",
            "text-images": "bitmap-vector",
            "digital-audio": "audio-sampling",
            "digital-video": "video-frames",
            "animation": "keyframe-tween",
            "compression": "compression-tree",
            "mm-applications": None,
        }

    def test_diagram_captions_match_keys(self, unit4):
        for t in unit4["topics"]:
            if t.get("diagram_key"):
                assert t.get("diagram_caption")
            else:
                assert t.get("diagram_caption") is None


# --- Unit 5 structure (JPEG/MPEG/Huffman/CD-DVD/Streaming/VR-AR, new feature) ---
class TestUnit5:
    def test_meta_and_topic_ids(self, unit5):
        assert unit5["unit_id"] == "cg-unit-5"
        assert unit5["unit_number"] == 5
        assert unit5["title"] == "CG Unit 5 — Rapid Revision"
        assert unit5["subject"] == "Computer Graphics & Multimedia"
        assert unit5.get("subtitle")
        assert "_id" not in unit5
        assert [t["id"] for t in unit5["topics"]] == UNIT5_TOPIC_IDS
        assert len(unit5["topics"]) == 8
        assert [t["number"] for t in unit5["topics"]] == list(range(1, 9))

    def test_topic_schema_compact(self, unit5):
        for t in unit5["topics"]:
            for k in ("analogy", "definition", "working", "quick_facts", "memory_trick"):
                assert t.get(k), f"{t['id']} missing {k}"
            assert isinstance(t["working"], list) and t["working"]
            assert isinstance(t["quick_facts"], list) and t["quick_facts"]
            assert "key_points" not in t
            assert isinstance(t.get("number"), int)
            assert t.get("title")

    def test_solved_examples_only_on_three_topics(self, unit5):
        got = [t["id"] for t in unit5["topics"] if t.get("solved_example")]
        assert got == ["huffman", "cd-dvd", "streaming"]

    def test_huffman_solved_example(self, unit5):
        t = next(t for t in unit5["topics"] if t["id"] == "huffman")
        se = t["solved_example"]
        table = se["table"]
        assert table["headers"] == ["Symbol", "Probability", "Code", "Bits"]
        codes = {r[0]: r[2] for r in table["rows"]}
        assert codes == {"A": "0", "B": "10", "C": "110", "D": "111"}
        assert [r[3] for r in table["rows"]] == ["1", "2", "3", "3"]
        assert "1.9 bits" in se["note"]

    def test_cd_dvd_solved_example(self, unit5):
        t = next(t for t in unit5["topics"] if t["id"] == "cd-dvd")
        rows = t["solved_example"]["table"]["rows"]
        assert rows[0][-1] == "2,68,80,000 bits"
        assert "3.36 MB" in rows[1][-1]
        assert "208 songs" in rows[-1][-1]

    def test_streaming_solved_example(self, unit5):
        t = next(t for t in unit5["topics"] if t["id"] == "streaming")
        rows = t["solved_example"]["table"]["rows"]
        assert rows[0][-1] == "920 s"
        assert "15.3 min" in rows[1][-1]

    def test_solved_example_row_widths(self, unit5):
        for t in unit5["topics"]:
            se = t.get("solved_example")
            if not se:
                continue
            assert se.get("title") and se.get("given") and se.get("note")
            headers = se["table"]["headers"]
            for row in se["table"]["rows"]:
                assert len(row) == len(headers), t["id"]

    def test_comparison_tables(self, unit5):
        with_cmp = [t["id"] for t in unit5["topics"] if t.get("comparison")]
        assert with_cmp == ["mpeg", "cd-dvd", "vr-ar"]
        expected = {
            "mpeg": ("I vs P vs B", ["Point", "I-frame", "P-frame", "B-frame"]),
            "cd-dvd": ("CD vs DVD", ["Point", "CD", "DVD"]),
            "vr-ar": ("VR vs AR", ["Point", "VR", "AR"]),
        }
        for tid, (title_part, headers) in expected.items():
            c = next(t for t in unit5["topics"] if t["id"] == tid)["comparison"]
            assert title_part in c["title"]
            assert c["headers"] == headers
            assert len(c["rows"]) >= 3
            for row in c["rows"]:
                assert len(row) == len(headers), tid

    def test_final_sections(self, unit5):
        fs = unit5["final_sections"]
        assert set(fs.keys()) == {"cheat_card", "last_minute_revision", "must_memorize"}
        cc = fs["cheat_card"]
        assert cc["read_time"]
        assert len(cc["formulas"]) == 6
        assert len(cc["hooks"]) == 7
        assert len(fs["last_minute_revision"]) == 8
        assert len(fs["must_memorize"]) == 11
        for item in fs["last_minute_revision"]:
            assert item["topic"] and item["line"]
        for item in fs["must_memorize"]:
            assert item["term"] and item["definition"]

    def test_diagram_keys(self, unit5):
        keys = {t["id"]: t.get("diagram_key") for t in unit5["topics"]}
        assert keys == {
            "jpeg": "jpeg-pipeline",
            "mpeg": "mpeg-frames",
            "huffman": "huffman-tree",
            "cd-dvd": "cd-dvd",
            "streaming": "streaming",
            "vr-ar": "vr-setup",
            "mm-project": None,
            "file-formats": None,
        }

    def test_diagram_captions_match_keys(self, unit5):
        for t in unit5["topics"]:
            if t.get("diagram_key"):
                assert t.get("diagram_caption")
            else:
                assert t.get("diagram_caption") is None


# --- idempotent seeding / persistence ---
class TestPersistence:
    def test_repeat_fetch_stable(self, api):
        a = api.get(f"{BASE_URL}/api/units/cg-unit-2", timeout=30).json()
        b = api.get(f"{BASE_URL}/api/units/cg-unit-2", timeout=30).json()
        assert a == b

    def test_unit4_repeat_fetch_stable(self, api):
        a = api.get(f"{BASE_URL}/api/units/cg-unit-4", timeout=30).json()
        b = api.get(f"{BASE_URL}/api/units/cg-unit-4", timeout=30).json()
        assert a == b
        assert a["unit_id"] == "cg-unit-4"

    def test_unit5_repeat_fetch_stable(self, api):
        a = api.get(f"{BASE_URL}/api/units/cg-unit-5", timeout=30).json()
        b = api.get(f"{BASE_URL}/api/units/cg-unit-5", timeout=30).json()
        assert a == b
        assert a["unit_id"] == "cg-unit-5"
        assert len(a["topics"]) == 8
