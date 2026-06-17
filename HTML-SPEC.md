# HTML 規格書｜AI 編輯用（完整復刻）

> 用途：把這份規格書 + `index.html` 一起餵給 AI，就能精準改文案／換圖／調排版，
> 而**不破壞版型**。換圖遮罩細節另見 [`TEMPLATE-SPEC.md`](./TEMPLATE-SPEC.md)。

---

## 0. 給 AI 的起手指令（先貼這段）

```
你要編輯一份 IG 輪播 HTML（index.html）。鐵則：
1. 只改我指定的部分，其餘一字不動。
2. 不准改：遮罩 .slide::before 的漸層、:root 變數、slide 尺寸 405×506、
   元件 class 結構、字型 <link> 與 @font-face、z-index 分層。
3. 改顏色一律改 :root 變數，不准在元素寫死色碼。
4. 套用既有 class，不要自創新樣式；要微調只用 inline style 覆寫單一頁。
5. 改完提醒我跑 `node export.cjs` 重新出圖。
照《HTML 規格書》第 5 章逐頁藍圖的結構填字。
```

---

## 1. 檔案結構

```
index.html              本體（7 個 <section class="slide">）
S1.jpg ~ S7.jpg         背景圖（相對路徑）
fonts/fonts.css + woff2 打包字型 Noto Sans TC（離線同字體，禁改）
export.cjs              出圖腳本
output/slide-0N.png     截圖成品 1620×2024
```

---

## 2. 全域 token（`:root`，改色改這裡）

| 變數 | 值 | 用途 |
|------|-----|------|
| `--ink` | `#ffffff` | 標題/主白字 |
| `--soil` | `rgba(255,255,255,.88)` | 一般白字 |
| `--muted` | `rgba(255,255,255,.68)` | 弱化副文 |
| `--ash` | `rgba(255,255,255,.50)` | 最弱 |
| `--accent` | `#b89ae8`（淡紫） | 標題強調字 |
| `--accent-soft` | `#d8c4f2` | 備用 |
| `--shadow` | `0 18px 44px rgba(40,10,80,.45)` | slide 陰影 |

body 底色 `linear-gradient(160deg,#5a3d7a,#34205a)`；
slide fallback 底 `linear-gradient(160deg,#4a3470,#6044a0 50%,#3a2860)`。

---

## 3. Slide 容器與三層結構

```
.slide  405 × 506，border-radius 4，overflow hidden
├─ z0  .bg            照片：background-size cover；預設 position center top
├─ z1  .slide::before 紫色遮罩（漸層由上到下漸濃；精確值見 TEMPLATE-SPEC §2）→ 禁改
└─ z2  .topbar / .main / .footer  文字直接壓遮罩
```

遮罩漸層（**禁改**）：
```css
linear-gradient(to bottom,
  rgba(72,35,130,.40) 0%, rgba(62,28,112,.62) 55%, rgba(48,18,92,.82) 100%)
```

---

## 4. 共用元件庫（套既有 class，勿自創）

### 排版框
| class | 關鍵值 |
|-------|--------|
| `.topbar` | 左頁碼／右標籤；white .65；9.5px/900；padding 9px 20px 0 |
| `.footer` | 左帳號／右(hint+dots)；同色字；padding 0 20px 9px |
| `.dots span` | 4px 圓點 white .35；`.on` → 寬 12px、white .88 |
| `.hint` | white .72；11px/800；非大寫（翻頁提示） |

### 字級
| class | size / weight / line-height | 色 |
|-------|------|----|
| `.g-label` | 9px / 900 / — letter-spacing 1.4 | white .70 |
| `.title-xl` | 30px / 900 / 1.28 | --ink |
| `.title-lg` | 22px / 900 / 1.42 | --ink |
| `.body-md` | 14.5px / 500 / 1.82 | --soil |
| `.body-sm` | 12px / 500 / 1.8 | --muted |
| `.accent` | 繼承 / 900 | --accent |

### 容器對齊
- `.main` 預設 `justify-content:center`，padding 20px 24px 16px
- `.main.top` → `flex-start`，padding-top 22px
- 單頁特例用 inline 覆寫（見第 5 章）

### 文字框（三種）
| class | 外觀 | 用在 |
|-------|------|------|
| `.sub-box` | 半透明白卡 rgba(255,255,255,.14)+blur10+細白框；radius 12 | S1/S2 補充句 |
| `.rail-box` | 左側 3px 白直線 + rgba(.12)+blur8；radius 0 10 10 0 | S4/S6 強調段 |
| `.cta-box` | rgba(.16)+blur12+白框；置中；radius 14 | S7 行動呼籲 |

### 數字清單
```
.step-stack  grid，gap 14（S3 用 gap 10）
.step-item   grid 34px 1fr
.step-item b 白底圓圈 34×34，數字 #3a1a60，14px/900   ← 圈色禁改
.step-title  14px/700 白
.step-sub    11.5px/400 muted
```

### 其他
`.divider` 36×2 白 .40 短線；`.quote-large` 26px 置中（本版未用）。

---

## 5. 逐頁藍圖（改文案照這結構填）

> 每頁一個 `<section class="slide">`，內含 `.bg` / `.topbar` / `.main` / `.footer`。
> 「main 覆寫」= 寫在 `.main` 的 inline style。

| 頁 | 圖 | topbar 右 | main 對齊 | g-label | 標題 | 內文/框 | dots 亮 | hint |
|----|----|----------|-----------|---------|------|---------|--------|------|
| S1 | S1.jpg | 北漂 10Y | flex-end + 右對齊 | 我的人生故事 | `.title-xl` 28px 右對齊，5 行 `<br>`，末行「全拿去**追夢**」追夢 40px accent，「20-30歲」accent | `.sub-box`（置中、align-self stretch）最後我沒紅… | 1 | 往右滑看全文 -> |
| S2 | S2.jpg | 共感 | 預設 center | 你有沒有也曾經這樣 | `.title-lg` 快30歲的時候\n開始忍不住回頭看 | 3 段：`.body-md`(.80) 有人結婚…／`.body-md` 粗 而我呢？／`.body-sm` 30歲的我… + `.sub-box` 那些年值得嗎 | 2 | 繼續下一頁--> |
| S3 | S3.jpg | 代價 | 預設 center | 我為夢想付出的代價 | `.title-lg` **19px** 這十年… | `.step-stack` gap10 四項 1-4；尾 `.body-sm`(.72) 那時候的我… | 3 | 繼續下一頁--> |
| S4 | S4.jpg（bg-position center 50%） | 不後悔 | flex-end + padding-bottom 18 | （無） | `.title-lg` 最後我沒紅，也沒有錢 | `.divider` + `.rail-box`（但你問我…／**accent** 我能很篤定…不後悔／後悔自己…）+ `.body-sm`(.78) 夢想的價值… | 4 | 繼續下一頁--> |
| S5 | S5.jpg | 能力 | 預設 center | 夢想送給我的能力 | `.title-lg` **19px** 夢想沒有實現，但它送給我\n3個一輩子受用的能力 | `.step-stack` 三項，每項 step-title + step-sub | 5 | 繼續下一頁--> |
| S6 | S6.jpg | 底氣 | 預設 center | 最大的收穫 | `.title-lg` 北漂十年\n最大的收穫 | `.divider` + `.rail-box`（不是名氣…／**accent** 願意爭取、願意挑戰、願意相信自己…）+ `.body-sm`(.72) 那些看似… | 6 | 繼續下一頁--> |
| S7 | S7.jpg | 全新賽局 | flex-end + 右對齊 + padding-bottom 16 | 開啟新章（右對齊） | `.title-lg` 右對齊 人生到30歲\n不是一場成果發表會\n也不是人生KPI結算日 | `.body-sm`(.78) 右對齊 羽翼正慢慢豐滿\n故事才正要開始 + `.cta-box`(align-self stretch) 三段，末段 **accent** @chapeiyi | 7 | （無 hint） |

帳號字串固定 `@chapeiyi`（footer 全 7 頁 + S7 CTA 末段）。

---

## 6. 可改 vs 禁改（復刻關鍵）

✅ **可改**
- 各頁文字內容（照第 5 章結構填）
- accent 圈選哪幾個字（包 `<span class="accent">`）
- 換圖（見第 7 章）
- 單頁 `background-position` 微調（主體被切時）
- 顏色：改 `:root` 變數

⛔ **禁改**
- 遮罩 `.slide::before` 漸層數值
- `:root` 以外寫死色碼
- slide 尺寸 405×506、border-radius、z-index 分層
- 元件 class 的結構與關鍵尺寸（圓圈 34px、step 欄寬…）
- 字型 `<link href="fonts/fonts.css">` 與 `@font-face`

---

## 7. 換圖

命名成 `S1.jpg`~`S7.jpg` 蓋掉原檔即可（HTML 不動），或改 `.bg` 的 `url()`。
選圖原則與位置微調 → 見 [`TEMPLATE-SPEC.md`](./TEMPLATE-SPEC.md)。

---

## 8. 出圖

```
node export.cjs
```
→ `output/slide-01.png`~`slide-07.png`，**1620×2024**（405×506 ×4）。

---

## 9. AI 指令範本（可直接複製）

**改單頁文案**
```
依《HTML 規格書》第 5 章 S3 結構，把四個代價改成：
1.〇〇 2.〇〇 3.〇〇 4.〇〇；其餘整份 HTML 一字不動。
```

**整批換圖**
```
我已把 7 張新圖命名 S1.jpg~S7.jpg 放進資料夾。HTML 不用改路徑。
逐頁檢查主體是否被遮罩/裁切切到，若有就只在該頁 .bg 加 background-position 微調，
遮罩與其他頁不准動。
```

**改強調字**
```
把 S1 末行的 accent 強調字從「追夢」改成「〇〇」，
保留 40px 與 accent class，--accent 變數不變。
```

**改色調**
```
只改 :root 的 --accent 為 #〇〇〇〇〇〇，其他變數與遮罩不動。
```

**出圖**
```
改完跑 node export.cjs，確認 output/ 7 張為 1620×2024。
```

---

## 10. 驗收檢查清單

- [ ] `.slide::before` 遮罩漸層未動
- [ ] `:root` 變數未動（除非明確要改色）
- [ ] 元件 class 結構未動，無自創樣式
- [ ] 7 頁 dots 亮點對應頁碼（S1→第1顆 … S7→第7顆）
- [ ] 帳號全 `@chapeiyi`
- [ ] 字型仍走 `fonts/fonts.css`（離線同字體）
- [ ] `node export.cjs` 出圖 1620×2024
