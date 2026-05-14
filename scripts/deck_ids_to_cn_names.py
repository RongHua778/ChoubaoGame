# -*- coding: utf-8 -*-
"""将 Data 下卡组 JSON 的 cardIds（数字 catalog id）改为与 cards.json 一致的中文牌名字符串（炸弹→「炸弹」）。"""
from __future__ import annotations

import json
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
CARDS_PATH = ROOT / "Data" / "cards.json"


def main() -> None:
    if not CARDS_PATH.is_file():
        print("缺少 {}".format(CARDS_PATH), file=sys.stderr)
        sys.exit(1)
    catalog = json.loads(CARDS_PATH.read_text(encoding="utf-8"))
    id_to_name: dict[int, str] = {}
    for row in catalog.get("cards") or []:
        if not isinstance(row, dict):
            continue
        cid = row.get("id")
        card = row.get("card") or {}
        dn = ""
        if isinstance(card, dict) and isinstance(card.get("displayName"), str):
            dn = card["displayName"].strip()
        if isinstance(cid, int) and dn:
            id_to_name[cid] = dn

    def token_for_nid(n: int) -> str | None:
        if n == 0:
            return "炸弹"
        return id_to_name.get(n)

    deck_root = ROOT / "Data" / "Decks"
    for path in sorted(deck_root.rglob("*.json")):
        data = json.loads(path.read_text(encoding="utf-8"))
        ids = data.get("cardIds")
        if not isinstance(ids, list) or len(ids) == 0:
            continue
        new_list: list = []
        for x in ids:
            if isinstance(x, str):
                new_list.append(x.strip() if x.strip() else x)
                continue
            if isinstance(x, bool):
                continue
            if isinstance(x, int):
                t = token_for_nid(x)
            elif isinstance(x, float) and x == int(x):
                t = token_for_nid(int(x))
            else:
                t = None
            if not t:
                print("跳过 {}：未知 id {}".format(path.relative_to(ROOT), x), file=sys.stderr)
                sys.exit(1)
            new_list.append(t)
        data["cardIds"] = new_list
        path.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
        print("已重写 {}".format(path.relative_to(ROOT)))


if __name__ == "__main__":
    main()
