//數字點選器
var NumberField = {
  opts: {
    quantityParentSelector: ".quantity-wrapper",
  },
  init: function (el) {
    this.$el = $(el);
    this.$elParent = this.$el.parent(this.opts.quantityParentSelector);

    if (this.$elParent.length === 0) {
      console.error("can't find .quantity-wrapper parent container");

      return false;
    }

    this.notice = this.$elParent.data("quantity-notice") || "";
    this.minNumber = parseInt(this.$el.attr("min"), 10) || 0;
    this.maxNumber = parseInt(this.$el.attr("max"), 10) || 999;

    this.addListener();

    return true;
  },
  addListener: function () {
    this.$el.on(
      "change",
      function () {
        this.set();
      }.bind(this)
    );
  },
  set: function () {
    this.number = this.getNumber(this.$el.val());

    if (this.maxNumber === this.number) {
      $('[data-quantity="plus"]').addClass("disabled");
    } else {
      $('[data-quantity="plus"]').removeClass("disabled");
    }

    if (this.minNumber === this.number) {
      $('[data-quantity="minus"]').addClass("disabled");
    } else {
      $('[data-quantity="minus"]').removeClass("disabled");
    }
  },
  getNumber: function (str) {
    return Math.ceil(parseFloat(this._replaceComma(str)));
  },
  setNumber: function (number) {
    this.$el.val(number);
  },
  setNotice: function (notice) {
    this.$elParent.attr("data-quantity-notice", notice);
  },
  isNumber: function (value) {
    return $.isNumeric(value);
  },
  _replaceComma: function (str) {
    return str.replace(/,/g, ".");
  },
};

$(document).ready(function () {
  NumberField.init(".quantity");

  // This button will increment the value
  $('[data-quantity="plus"]').click(function (e) {
    // Stop acting like a button
    e.preventDefault();
    // Get the field name
    fieldName = $(this).attr("data-field");
    // Get its current value
    var currentVal = parseInt($("input[name=" + fieldName + "]").val());
    // If is not undefined
    if (!isNaN(currentVal)) {
      // Increment
      $("input[name=" + fieldName + "]").val(currentVal + 1);
    } else {
      // Otherwise put a 1 there
      $("input[name=" + fieldName + "]").val(1);
    }

    $(".quantity").change();
  });
  // This button will decrement the value till 0
  $('[data-quantity="minus"]').click(function (e) {
    // Stop acting like a button
    e.preventDefault();
    // Get the field name
    fieldName = $(this).attr("data-field");
    // Get its current value
    var currentVal = parseInt($("input[name=" + fieldName + "]").val());
    // If it isn't undefined or its greater than 0
    if (!isNaN(currentVal) && currentVal > 0) {
      // Decrement one
      $("input[name=" + fieldName + "]").val(currentVal - 1);
    } else {
      // Otherwise put a 0 there
      $("input[name=" + fieldName + "]").val(0);
    }

    $(".quantity").change();
  });
});

//波浪動畫//
const canvases = document.querySelectorAll(".waveCanvas"); // 使用 class 選擇器
const ctxArray = Array.from(canvases).map((canvas) => canvas.getContext("2d"));

const waves = [
  {
    amplitude: 160,
    frequency: 0.005,
    speed: 0.5,
    color: "#ab834b",
    time: 0,
    xOffset: 0,
  },
  {
    amplitude: 150,
    frequency: 0.005,
    speed: 0.5,
    color: "#ab834b",
    time: 0,
    xOffset: 0,
  },
  {
    amplitude: 140,
    frequency: 0.005,
    speed: 0.5,
    color: "#ab834b",
    time: 0,
    xOffset: 0,
  },
  {
    amplitude: 130,
    frequency: 0.005,
    speed: 0.5,
    color: "#ab834b",
    time: 0,
    xOffset: 0,
  },
  {
    amplitude: 120,
    frequency: 0.005,
    speed: 0.5,
    color: "#ab834b",
    time: 0,
    xOffset: 0,
  },
];

function drawWaves(ctx, canvas) {
  canvas.width = window.innerWidth * 2;
  canvas.height = window.innerHeight * 2;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // 保存當前畫布狀態
  ctx.save();

  // 將整個 canvas 旋轉
  if (canvas.id === "waveCanvaschange") {
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate(-Math.PI / 8); // 修改這裡的角度
    ctx.translate(-canvas.width / 2, -canvas.height / 2);
  } else {
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate(Math.PI / 8);
    ctx.translate(-canvas.width / 2, -canvas.height / 2);
  }

  waves.forEach((wave) => {
    ctx.beginPath();
    for (let i = 0; i < canvas.width; i += 10) {
      const y =
        wave.amplitude *
        Math.sin(wave.frequency * i + wave.time) *
        Math.sin(wave.xOffset);
      ctx.lineTo(i, canvas.height / 2 + y);
    }
    ctx.strokeStyle = wave.color;
    ctx.stroke();

    // 模擬上升和下降運動
    wave.xOffset += 0.005;
    wave.time += 0.005;
  });

  // 還原畫布狀態
  ctx.restore();

  requestAnimationFrame(() => drawWaves(ctx, canvas));
}

function resizeCanvas() {
  canvases.forEach((canvas, index) => {
    drawWaves(ctxArray[index], canvas);
  });
}

window.addEventListener("resize", resizeCanvas);
resizeCanvas();

// JavaScript 函數，用於切換音樂播放狀態
function toggleAudio() {
  var audio = document.getElementById("myAudio");
  var buttonText = document.getElementById("buttonText");

  // 如果音樂正在播放，則暫停；否則，開始播放
  if (audio.paused) {
    audio.play();
    buttonText.innerHTML = "no_sound";
  } else {
    audio.pause();
    buttonText.innerHTML = "volume_up";
  }
}

//頁面回到最上
document.addEventListener("DOMContentLoaded", function () {
  // 在 DOM 載入完成後綁定事件

  // 獲取按鈕元素
  var scrollToTopBtn = document.getElementById("scrollToTopBtn");

  // 監聽按鈕點擊事件
  scrollToTopBtn.addEventListener("click", function () {
    // 滾動到頂部
    // 可以使用 window.scrollTo 或 window.scroll，具體取決於瀏覽器支援
    // 這裡使用 window.scrollTo，第一個參數為 x 座標，第二個參數為 y 座標
    window.scrollTo({
      top: 0,
      behavior: "smooth", // 可以添加平滑滾動效果
    });
  });
});
