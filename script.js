tile = document.querySelectorAll('.tile');
tile.addEventListener("click", addx);
function addx(){
    var ti = document.getElementsByClassName('tile');
    var x = document.createTextNode("OK");
    ti.appendChild(x);
}