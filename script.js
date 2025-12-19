// 配管サイズ → 配管外径 の対応表
const pipeMap = {
  "15A": 21.7,
  "20A": 27.2,
  "25A": 34.0,
  "32A": 42.7,
  "40A": 48.6,
  "50A": 60.5,
  "65A": 76.3,
  "80A": 89.1,
  "90A": 101.6,
  "100A": 114.3
};

// ヒーター電線外径（固定値）
const heaterWireDiameter = 38.0;

// 配管サイズ選択時に外径表示
document.getElementById("pipeSize").addEventListener("change", (e) => {
  const d = pipeMap[e.target.value];
  document.getElementById("pipeDiameter").textContent =
    d ? `外径：${d}` : "外径：-";
});

// 計算処理
document.getElementById("calcBtn").addEventListener("click", () => {
  const pipeSize = document.getElementById("pipeSize").value;
  const pipeLength = Number(document.getElementById("pipeLength").value);
  const heaterLength = Number(document.getElementById("heaterLength").value);
  const escapeLength = Number(document.getElementById("escapeLength").value);
  const resultSpan = document.getElementById("calcResult");

  // 入力チェック
  if (!pipeMap[pipeSize] || pipeLength <= 0 || heaterLength <= 0) {
    resultSpan.textContent = "入力エラー";
    return;
  }

  const pipeDiameter = pipeMap[pipeSize];

  // √の中身
  const rootInner =
    heaterLength / pipeLength - escapeLength - 1;

  if (rootInner <= 0) {
    resultSpan.textContent = "計算不可（√の中が0以下）";
    return;
  }

  // 計算式（確定）
  const result =
    Math.PI * (heaterWireDiameter + pipeDiameter) /
    Math.sqrt(rootInner);

  resultSpan.textContent = result.toFixed(3);
});
