// добавляем .webp к html, если webp поддерживается
// и .no-webp, если наоборот
function testWebP(callback) {
  let webP = new Image();
  webP.onload = webP.onerror = function () {
    callback(webP.height === 2);
  };
  webP.src =
    "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
}

testWebP(function (support) {
  if (support) {
    document.documentElement.classList.add("webp");
  } else {
    document.documentElement.classList.add("no-webp");
  }
});
