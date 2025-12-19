// 配管サイズ → 配管外径 の対応表
const pipeMap = {
  "10A": 14.5,
  "15A": 21.7,
  "20A": 28.3
};

// ヒーター電線外径（固定値）
const heaterWireDiameter = 38.0;

// 選択変更時に配管外径を表示
document.querySelectorAll(".pipe-select").forEach(select => {
  select.addEventListener("change", () => {
    const row = select.closest(".row");
    const display = row.querySelector(".diameter");

    if (pipeMap[select.value]) {
      display.textContent = `配管外径：${pipeMap[select.value]}`;
    } else {
      display.textContent = "配管外径：-";
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
