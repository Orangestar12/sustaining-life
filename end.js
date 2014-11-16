status("Tieing down loose ends...");

document.getElementById('howtoplay').onclick = showHTP;
document.getElementById('howtoplay-close').onclick = hideHTP;
document.getElementById('playerboxes').getElementsByTagName('a')[0].onclick = function(){startGame(2);};
document.getElementById('playerboxes').getElementsByTagName('a')[1].onclick = function(){startGame(3);};
document.getElementById('playerboxes').getElementsByTagName('a')[2].onclick = function(){startGame(4);};

status("Reticulating splines...");
for(i=0;i < cells.length;i++)
{
    cells[i].onclick = takeTurn;
    cells[i].style.background = none;
    cells[i].setAttribute("data-updateto", "stay");
}
