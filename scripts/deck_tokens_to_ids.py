# -*- coding: utf-8 -*-
"""将 Data 下卡组 JSON 的 cardIds 规范化为数字 catalog id。

旧版中文牌名仍可迁移；「炸弹」→ 0。推荐卡组文件长期保存数字 ID，
这样修改 cards.json/carddesign.xlsx 里的展示名不会影响卡组解析和技能绑定。
"""
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
    name_to_id: dict[str, int] = {"炸弹": 0}
    for row in catalog.get("cards") or []:
        if not isinstance(row, dict):
            continue
        cid = row.get("id")
        card = row.get("card") or {}
        dn = ""
        if isinstance(card, dict) and isinstance(card.get("displayName"), str):
            dn = card["displayName"].strip()
        if isinstance(cid, int) and dn:
            name_to_id.setdefault(dn, cid)

    def id_for_token(token) -> int | None:
        if isinstance(token, bool):
            return None
        if isinstance(token, int):
            return token
        if isinstance(token, float) and token == int(token):
            return int(token)
        if isinstance(token, str):
            s = token.strip()
            if not s:
                return None
            if s.lstrip("-").isdigit():
                return int(s)
            return name_to_id.get(s)
        return None

    deck_root = ROOT / "Data" / "Decks"
    for path in sorted(deck_root.rglob("*.json")):
        data = json.loads(path.read_text(encoding="utf-8"))
        ids = data.get("cardIds")
        if not isinstance(ids, list) or len(ids) == 0:
            continue
        new_list: list = []
        for x in ids:
            cid = id_for_token(x)
            if cid is None:
                print("跳过 {}：未知卡牌 {}".format(path.relative_to(ROOT), x), file=sys.stderr)
                sys.exit(1)
            new_list.append(cid)
        data["cardIds"] = new_list
        path.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
        print("已重写 {}".format(path.relative_to(ROOT)))


if __name__ == "__main__":
    main()
