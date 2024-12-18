function changeColor(color) {
  const box = document.getElementById("box");
  box.style.backgroundColor = color;
}

const box = document.getElementById("box");
box.addEventListener("click", function () {
  box.classList.add("bounce");

  setTimeout(function () {
    box.classList.remove("bounce");
  }, 500);
});
