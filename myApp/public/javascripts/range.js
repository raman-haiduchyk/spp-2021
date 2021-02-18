var slider = document.getElementById("min-salary");
var output = document.getElementById("min-salary-value");
output.innerHTML = slider.value;

slider.oninput = function() {
  output.innerHTML = this.value;
}