# 模板製作規格｜照片背景 + 紫色遮罩輪播

> 給下一個製作者：照這份規格換圖、改字，遮罩與質感會跟本篇完全相同。

---

## 一、核心結構（每頁三層）

每張 `.slide`（405 × 506）疊三層，由下到上：

| z-index | 層 | 作用 |
|---------|-----|------|
| 0 | `.bg` | 照片背景（`background-image`），`background-size: cover` |
| 1 | `.slide::before` | **紫色遮罩**，壓在照片上 → 文字才看得清楚 |
| 2 | `.topbar / .main / .footer` | 文字內容，直接壓在遮罩上 |

換圖只動 z0，**遮罩（z1）不要改**，質感就一致。

---

## 二、遮罩規格（關鍵，不要改）

```css
.slide::before {
  content: "";
  position: absolute;
  inset: 0;
  z-index: 1;
  background: linear-gradient(
    to bottom,
    rgba(72, 35, 130, 0.40) 0%,    /* 上方：淡 */
    rgba(62, 28, 112, 0.62) 55%,   /* 中段：中 */
    rgba(48, 18, 92, 0.82) 100%    /* 底部：濃，壓住帳號/dots */
  );
}
```

由上到下漸濃 → 不管換什麼照片，底部一定壓得夠暗、白字看得清。

照片載入前的底色（fallback，避免空白閃爍）：
```css
.slide { background: linear-gradient(160deg, #4a3470 0%, #6044a0 50%, #3a2860 100%); }
```

---

## 三、怎麼換圖（兩種做法）

**做法 A：檔名照舊（最省事）**
把新圖命名成 `S1.jpg` ~ `S7.jpg` 蓋掉原檔即可，HTML 一行都不用動。

**做法 B：改路徑**
在每張 slide 的 `.bg` 改 `url('你的檔名.jpg')`。

```html
<div class="bg" style="background-image: url('S1.jpg')"></div>
```

### 微調照片位置
預設 `background-position: center top`（在 CSS `.bg` 裡）。
若某張人臉/主體被切掉，單獨在那張覆寫，例如本篇 S4：
```html
<div class="bg" style="background-image: url('S4.jpg'); background-position: center 50%;"></div>
```

---

## 四、換圖選圖原則

- **直幅照片**，比例接近 4:5（405:506），cover 裁切後不變形
- 主體（人臉）放**畫面上半部**；下半部會被遮罩壓暗 + 疊文字
- 不挑太亮/太花的圖 → 遮罩是半透明，底圖太亮文字會吃力
- 亮一點暗一點都行，遮罩會吃掉差異，這就是「換圖也一致」的原因

---

## 五、文字與配色（要一致就別動）

```
accent 重點色：#b89ae8（淡紫）  ← 標題裡要強調的字
白字主色：#ffffff
副文：rgba(255,255,255,0.88) / 0.72 / 0.68（依層級遞減）
字型：Noto Sans TC，已打包在 fonts/（離線同字體，見 README）
```

文字框三種樣式（直接套 class）：
- `.sub-box` — 半透明白卡，補充句用（S1/S2）
- `.rail-box` — 左側白色直線強調（S4/S6）
- `.cta-box` — 結尾行動呼籲（S7）

---

## 六、改完怎麼出圖

```
node export.cjs
```
→ 自動截 7 張到 `output/slide-01.png` ~ `slide-07.png`
規格：405×506 ×4 = **1620×2024**，IG 直式。

---

## 七、一致性檢查清單

換完圖後確認：
- [ ] 遮罩 `.slide::before` 數值沒被動過
- [ ] 7 張圖都是直幅、主體在上半部
- [ ] 底部帳號 `@chapeiyi` 與 dots 看得清楚（遮罩夠濃）
- [ ] accent 色仍是 `#b89ae8`
- [ ] `node export.cjs` 出圖為 1620×2024
