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


# --- factual-correction verification (iteration 6): substring checks on full unit JSON ---
import json as _json


def _dump(unit):
    return _json.dumps(unit, ensure_ascii=False)


class TestUnit1Corrections:
    def test_no_universal_half_rounds_up_rule(self, unit1):
        d = _dump(unit1)
        for bad in ["0.5 always rounds UP", "always rounds up", "always round up",
                    ".5 always rounds"]:
            assert bad.lower() not in d.lower(), bad

    def test_dda_nearest_pixel_wording(self, unit1):
        t = next(t for t in unit1["topics"] if t["id"] == "dda")
        assert "round(x), round(y)" in t["memory_trick"]
        assert "nearest pixel" in t["memory_trick"].lower()
        note = t["solved_example"]["note"]
        assert "nearest pixel" in note.lower()
        assert "worked example" in note.lower()

    def test_dda_pixels_unchanged(self, unit1):
        t = next(t for t in unit1["topics"] if t["id"] == "dda")
        rows = t["solved_example"]["table"]["rows"]
        assert [r[-1] for r in rows] == [
            "(2, 3)", "(3, 4)", "(4, 4)", "(5, 5)", "(6, 5)", "(7, 6)", "(8, 6)",
        ]

    def test_dda_lmr_and_cheat_hook_scoped(self, unit1):
        fs = unit1["final_sections"]
        lmr = next(i for i in fs["last_minute_revision"] if i["topic"] == "DDA")
        assert "nearest pixel" in lmr["line"].lower()
        hooks = " ".join(fs["cheat_card"]["hooks"])
        assert "round(x), round(y)" in hooks

    def test_cmy_theory_vs_practice(self, unit1):
        t = next(t for t in unit1["topics"] if t["id"] == "cmy")
        assert "In theory C+M+Y approaches black" in t["definition"] or \
               "In theory C + M + Y approaches black" in t["definition"]
        assert "SUBTRACTIVE" in t["definition"]
        working = " ".join(t["working"])
        assert "approaches black" in working
        assert "deeper, more efficient black" in working
        formulas = " ".join(t.get("formulas", []))
        assert "C = 1 \u2212 R" in formulas or "C=1\u2212R" in formulas.replace(" ", "")

    def test_rgb_cmy_table_all_mixed_row(self, unit1):
        d = _dump(unit1)
        assert "\u2248 Black (K ink in practice)" in d
        rgb = next(t for t in unit1["topics"] if t["id"] == "rgb")
        cmy = next(t for t in unit1["topics"] if t["id"] == "cmy")
        assert "ADDITIVE" in rgb["definition"].upper()
        assert "SUBTRACTIVE" in cmy["definition"].upper()

    def test_hsi_absent_and_hsv_expanded(self, unit1):
        d = _dump(unit1)
        assert "HSI" not in d
        t = next(t for t in unit1["topics"] if t["id"] == "hsv")
        assert "Hue" in _dump(t) and "Saturation" in _dump(t) and "Value" in _dump(t)


class TestUnit2Corrections:
    def test_composite_column_vector_right_to_left(self, unit2):
        t = next(t for t in unit2["topics"] if t["id"] == "homogeneous")
        working = " ".join(t["working"])
        assert "column vectors" in working
        assert "RIGHT to LEFT" in working
        assert "column vectors" in t["memory_trick"]
        fs = unit2["final_sections"]
        lmr = next(i for i in fs["last_minute_revision"] if i["topic"] == "Homogeneous")
        assert "column vectors" in lmr["line"]
        hooks = " ".join(fs["cheat_card"]["hooks"])
        assert "column vectors" in hooks
        mm = next(i for i in fs["must_memorize"]
                  if "Composite" in i["term"])
        assert "column vectors" in mm["definition"]
        assert "right to left" in mm["definition"].lower()

    def test_cohen_sutherland_accept_reject(self, unit2):
        t = next(t for t in unit2["topics"] if t["id"] == "clipping")
        working = " ".join(t["working"])
        assert "OR = 0000" in working and "ACCEPT" in working.upper()
        assert "AND \u2260 0000" in working and "REJECT" in working.upper()

    def test_bresenham_table_unchanged(self, unit2):
        t = next(t for t in unit2["topics"] if t["id"] == "bresenham")
        rows = t["solved_example"]["table"]["rows"]
        assert len(rows) == 7 and rows[-1][-1] == "(8, 6)"


class TestUnit3Corrections:
    def test_no_old_backface_convention(self, unit3):
        d = _dump(unit3)
        for bad in ["N\u00b7V \u2265", "N\u00b7V >=", "N \u00b7 V \u2265", "removes ~half the faces",
                    "half the faces"]:
            assert bad not in d, bad

    def test_backface_new_convention(self, unit3):
        t = next(t for t in unit3["topics"] if t["id"] == "hidden-surface")
        working = " ".join(t["working"])
        assert "TOWARDS the viewer" in working
        assert "N\u00b7V < 0" in working
        assert "sign reverses" in working
        assert "eliminate many faces" in " ".join(t["quick_facts"])
        assert "half the faces" not in _dump(t)

    def test_backface_consistent_across_sections(self, unit3):
        t = next(t for t in unit3["topics"] if t["id"] == "hidden-surface")
        formulas = " ".join(t.get("formulas", []))
        assert "N \u00b7 V < 0" in formulas or "N\u00b7V < 0" in formulas
        fs = unit3["final_sections"]
        cc = " ".join(fs["cheat_card"]["formulas"] + fs["cheat_card"]["hooks"])
        assert "N\u00b7V < 0" in cc
        lmr = next(i for i in fs["last_minute_revision"] if "Hidden" in i["topic"])
        assert "N\u00b7V < 0" in lmr["line"]
        mm = next(i for i in fs["must_memorize"] if "Back-face" in i["term"])
        assert "N\u00b7V < 0" in mm["definition"]
        assert "towards the viewer" in mm["definition"].lower()

    def test_zbuffer_and_painter_kept(self, unit3):
        t = next(t for t in unit3["topics"] if t["id"] == "hidden-surface")
        working = " ".join(t["working"]).lower()
        assert "closer" in working and "smaller z" in working
        assert "farthest to nearest" in working
        assert "closer surface" in t["diagram_caption"].lower()

    def test_bezier_math_unchanged(self, unit3):
        t = next(t for t in unit3["topics"] if t["id"] == "bezier")
        rows = t["solved_example"]["table"]["rows"]
        assert [r[-1] for r in rows] == ["4", "3"]


class TestUnit4Corrections:
    def test_pal_ntsc_approx(self, unit4):
        d = _dump(unit4)
        assert "PAL \u2248 25 fps" in d and "NTSC \u2248 30 fps" in d
        t = next(t for t in unit4["topics"] if t["id"] == "digital-video")
        assert "PAL \u2248 25 fps" in " ".join(t["working"])
        fs = unit4["final_sections"]
        lmr = next(i for i in fs["last_minute_revision"] if i["topic"] == "Video")
        assert "PAL \u2248 25" in lmr["line"] and "NTSC \u2248 30" in lmr["line"]
        mm = next(i for i in fs["must_memorize"] if "Frame Rate" in i["term"])
        assert "PAL \u2248 25 fps" in mm["definition"]
        cc = " ".join(fs["cheat_card"]["formulas"] + fs["cheat_card"]["hooks"])
        assert "PAL \u2248 25 fps" in cc

    def test_compression_ratios_qualitative(self, unit4):
        d = _dump(unit4)
        for bad in ["2\u20134\u00d7", "10\u2013100\u00d7", "2-4x", "10-100x"]:
            assert bad not in d, bad
        c = next(t for t in unit4["topics"] if t["id"] == "compression")["comparison"]
        row = next(r for r in c["rows"] if "Compression" in r[0])
        assert row[1] == "Usually smaller ratios"
        assert "Much higher" in row[2]

    def test_rle_and_ratio_formula_unchanged(self, unit4):
        t = next(t for t in unit4["topics"] if t["id"] == "compression")
        rows = t["solved_example"]["table"]["rows"]
        assert [r[1] for r in rows] == ["4A", "3B", "2C", "1D"]
        assert "1.25" in t["solved_example"]["note"]


class TestUnit5Corrections:
    def test_no_only_lossy_step_claim(self, unit5):
        d = _dump(unit5).lower()
        for bad in ["only lossy step", "the only lossy"]:
            assert bad not in d, bad

    def test_jpeg_main_lossy_step(self, unit5):
        t = next(t for t in unit5["topics"] if t["id"] == "jpeg")
        assert "MAIN lossy step" in " ".join(t["working"])
        assert "chroma subsampling" in " ".join(t["quick_facts"]).lower()
        assert "chroma subsampling" in t["exam_tip"].lower()
        assert "Main information loss \u2192 QUANTIZATION" in t["exam_tip"]
        assert "Quantize" in t["memory_trick"]
        hooks = " ".join(unit5["final_sections"]["cheat_card"]["hooks"])
        assert "MAIN lossy step" in hooks

    def test_jpeg_diagram_caption(self, unit5):
        t = next(t for t in unit5["topics"] if t["id"] == "jpeg")
        assert t["diagram_caption"]
        assert "only lossy" not in t["diagram_caption"].lower()

    def test_mpeg_frame_descriptions(self, unit5):
        t = next(t for t in unit5["topics"] if t["id"] == "mpeg")
        working = " ".join(t["working"])
        assert "previous I/P reference frame" in working
        assert "residual changes" in working
        assert "previous AND next reference frames" in working
        assert "usually the smallest" in working
        row = next(r for r in t["comparison"]["rows"] if r[0] == "Size")
        assert row[-1] == "Usually smallest"

    def test_mpeg4_container_distinction(self, unit5):
        t = next(t for t in unit5["topics"] if t["id"] == "mpeg")
        qf = " ".join(t["quick_facts"])
        assert "container format" in qf
        assert "MPEG-4 \u2192 MP4" not in _dump(unit5)
        lmr = next(i for i in unit5["final_sections"]["last_minute_revision"]
                   if i["topic"] == "MPEG")
        assert "container" in lmr["line"]

    def test_cd_dvd_numbers_unchanged(self, unit5):
        d = _dump(unit5)
        assert "700 MB" in d and "4.7 GB" in d
        t = next(t for t in unit5["topics"] if t["id"] == "cd-dvd")
        assert "208 songs" in t["solved_example"]["table"]["rows"][-1][-1]
