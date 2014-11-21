status("Tieing down loose ends...");

document.getElementById('howtoplay').onclick = showHTP;
document.getElementById('howtoplay-close').onclick = hideHTP;
document.getElementById('playerboxes').getElementsByTagName('a')[0].onclick = function(e){startGame(2,e);};
document.getElementById('playerboxes').getElementsByTagName('a')[1].onclick = function(e){startGame(3,e);};
document.getElementById('playerboxes').getElementsByTagName('a')[2].onclick = function(e){startGame(4,e);};

status("Reticulating splines...");
for(i=0;i < cells.length;i++)
{
    cells[i].onclick = function(e){takeTurn(e)};
    cells[i].style.background = none;
    cells[i].setAttribute("data-color", "none")
    cells[i].setAttribute("data-updateto", "stay");
}
