(function () {
  var existingTap = window.tap || {};

  if (typeof existingTap.createCanvas === "function") {
    return;
  }

  var canvas;
  var touchStartHandlers = [];
  var touchMoveHandlers = [];
  var touchEndHandlers = [];
  var touchCancelHandlers = [];

  function syncCanvasSize() {
    if (!canvas) {
      return;
    }

    var bounds = canvas.getBoundingClientRect();
    canvas.width = Math.floor(bounds.width);
    canvas.height = Math.floor(bounds.height);
  }

  function toTouch(event) {
    return {
      identifier: event.pointerId,
      clientX: event.clientX,
      clientY: event.clientY
    };
  }

  function emitTouch(handlers, event, touches) {
    var touch = toTouch(event);
    handlers.forEach(function (handler) {
      handler({
        touches: touches ? [touch] : [],
        changedTouches: [touch],
        timeStamp: event.timeStamp
      });
    });
  }

  window.tap = Object.assign({}, existingTap, {
    createCanvas: function () {
      if (!canvas) {
        canvas = document.createElement("canvas");
        document.body.appendChild(canvas);
        syncCanvasSize();
        window.addEventListener("resize", syncCanvasSize);
        window.addEventListener("orientationchange", syncCanvasSize);
        if (window.visualViewport) {
          window.visualViewport.addEventListener("resize", syncCanvasSize);
        }
        canvas.addEventListener("pointerdown", function (event) {
          emitTouch(touchStartHandlers, event, true);
        });
        canvas.addEventListener("pointermove", function (event) {
          emitTouch(touchMoveHandlers, event, true);
        });
        canvas.addEventListener("pointerup", function (event) {
          emitTouch(touchEndHandlers, event, false);
        });
        canvas.addEventListener("pointercancel", function (event) {
          emitTouch(touchCancelHandlers, event, false);
        });
      }

      return canvas;
    },

    onTouchStart: function (handler) {
      touchStartHandlers.push(handler);
    },

    onTouchMove: function (handler) {
      touchMoveHandlers.push(handler);
    },

    onTouchEnd: function (handler) {
      touchEndHandlers.push(handler);
    },

    onTouchCancel: function (handler) {
      touchCancelHandlers.push(handler);
    }
  });
})();
