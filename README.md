# 30歲女生，北漂十年｜IG 輪播

7 頁 IG 輪播成品（@chapeiyi）。照片背景 + 紫色 overlay + 文字直壓版型。

## 使用方式

下載整個資料夾，**雙擊 `index.html`** 即在瀏覽器看到完整 7 頁。

不需安裝任何東西、**不需網路**。字型（Noto Sans TC）已打包進 `fonts/`，離線也是完全相同的字體。

## 檔案結構

```
ally-beipiao-carousel/
├── index.html          # 輪播本體
├── S1.jpg ~ S7.jpg     # 7 張背景圖（與 index.html 同層）
└── fonts/              # 打包的 Noto Sans TC（子集化，只含用到的字）
    ├── fonts.css       # @font-face 定義
    └── NotoSansTC-*.woff2  # 400/500/700/800/900 五個字重
```

`index.html` 用相對路徑引圖（`url('S1.jpg')`）與字型（`fonts/fonts.css`），整個資料夾搬到任何地方、離線都完美顯示。

## 規格

- 尺寸：每頁 405 × 506（顯示）
- 帳號：@chapeiyi
- 頁數：7（S1 封面 → S7 收尾 CTA）
