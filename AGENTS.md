# AGENTS.md — AI 編輯入口

你正要編輯這個 IG 輪播專案。**動手前必讀 [`HTML-SPEC.md`](./HTML-SPEC.md)**，並遵守裡面的「可改 / 禁改清單」。

## 鐵則（違反就無法復刻原版）

1. 只改使用者指定的部分，其餘整份 `index.html` 一字不動。
2. **禁改**：`.slide::before` 遮罩漸層、`:root` 變數、slide 尺寸 405×506、元件 class 結構、字型 `<link>` 與 `@font-face`、z-index 分層。
3. 改顏色一律改 `:root` 變數，不在元素寫死色碼。
4. 套既有 class，不自創樣式；單頁微調只用 inline style。
5. 改文案照 `HTML-SPEC.md` 第 5 章「逐頁藍圖」的結構填字。
6. 改完跑 `node export.cjs`，確認 `output/` 7 張為 1620×2024。

## 檔案導覽

| 檔 | 用途 |
|----|------|
| `index.html` | 本體，7 頁輪播 |
| `HTML-SPEC.md` | 完整規格書：token、元件庫、逐頁藍圖、prompt 範本 |
| `TEMPLATE-SPEC.md` | 換圖與遮罩快查 |
| `S1.jpg`~`S7.jpg` | 背景圖 |
| `fonts/` | 打包字型（離線同字體，禁改） |
| `export.cjs` | 出圖腳本 → `output/` |

## 起手 prompt（使用者可直接給我）

> 讀這個資料夾，照 AGENTS.md 與 HTML-SPEC.md 的規矩，幫我〔改 S3 文案／換圖／改色…〕，其餘不動，改完出圖。
