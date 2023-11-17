// console.log("runn")
for (var i = 0; i < document.querySelectorAll("button.drum").length; i++) {
  document
    .querySelectorAll("button.drum")
    [i].addEventListener("click", function () {
      console.log(this);
    });
}
