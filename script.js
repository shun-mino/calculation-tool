// 配管サイズ → 配管外径（mm）
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

// ヒーター電線外径（mm・固定）
const heaterWireDiameter = 38.0;

// 配管サイズ選択 → 外径表示
document.getElementById("pipeSize").addEventListener("change", (e) => {
  const d = pipeMap[e.target.value];
  document.getElementById("pipeDiameter").textContent =
    d ? `外径：${d} mm` : "外径：-";
});

function calcOne(pipeLength, heaterLength, escapeLength, pipeDiameter) {
  if (pipeLength <= escapeLength) return null;

  const A = heaterLength / (pipeLength - escapeLength);
  const rootInner = A * A - 1;
  if (rootInner <= 0) return null;

  return Math.PI * (38.0 + pipeDiameter) / Math.sqrt(rootInner);
}

document.getElementById("calcBtn").addEventListener("click", () => {
  const pipeSize = document.getElementById("pipeSize").value;
  const pipeDiameter = pipeMap[pipeSize];
  const resultSpan = document.getElementById("calcResult");

  if (!pipeDiameter) {
    resultSpan.textContent = "配管サイズ未選択";
    return;
  }

  // 行き（通常）
  const go = calcOne(
    Number(pipeLengthL.value),
    Number(heaterLengthL.value),
    Number(escapeLengthL.value),
    pipeDiameter
  );

  // 帰り（＝巻きピッチ）
  const pitch = calcOne(
    Number(pipeLengthR.value),
    Number(heaterLengthR.value),
    Number(escapeLengthR.value),
    pipeDiameter
  );

  if (go === null || pitch === null) {
    resultSpan.textContent = "計算不可";
    return;
  }

  resultSpan.textContent =
    `行き：${go.toFixed(0)} mm ／ 巻きピッチ：${pitch.toFixed(0)} mm`;
});

