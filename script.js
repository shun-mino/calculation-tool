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

// 各選択欄に対して「選んだら右に表示」
document.querySelectorAll(".pipe-select").forEach(select => {
  select.addEventListener("change", () => {
    const row = select.closest(".row");
    const diameterSpan = row.querySelector(".diameter");

    if (pipeMap[select.value]) {
      diameterSpan.textContent = `外径：${pipeMap[select.value]}`;
    } else {
      diameterSpan.textContent = "外径：-";
    }
  });
});

// 合計計算（前回と同じ）
document.getElementById("calcBtn").addEventListener("click", () => {
  let total = 0;

  document.querySelectorAll(".pipe-select").forEach(select => {
    if (pipeMap[select.value]) {
      total += pipeMap[select.value];
    }
  });

  document.getElementById("resultValue").textContent = total.toFixed(1);
});
