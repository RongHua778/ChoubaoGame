(function () {
  if (window.tap) {
    return;
  }

  var canvas;
  var touchStartHandlers = [];

  function syncCanvasSize() {
    if (!canvas) {
      return;
    }

    var bounds = canvas.getBoundingClientRect();
    canvas.width = Math.floor(bounds.width);
    canvas.height = Math.floor(bounds.height);
  }

  window.tap = {
    createCanvas: function () {
      if (!canvas) {
        canvas = document.createElement("canvas");
        document.body.appendChild(canvas);
        syncCanvasSize();
        window.addEventListener("resize", syncCanvasSize);
        canvas.addEventListener("pointerdown", function (event) {
          var touch = {
            identifier: event.pointerId,
            clientX: event.clientX,
            clientY: event.clientY
          };
          touchStartHandlers.forEach(function (handler) {
            handler({ touches: [touch], changedTouches: [touch], timeStamp: event.timeStamp });
          });
        });
      }

      return canvas;
    },

    onTouchStart: function (handler) {
      touchStartHandlers.push(handler);
    }
  };
})();
