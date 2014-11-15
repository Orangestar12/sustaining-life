//note to self use classlist https://developer.mozilla.org/en-US/docs/Web/API/element.classList
function status(text){
    document.getElementById('status').innerHTML = text;
    console.log(text);
};

status("Initializing variables...");

var cells = document.getElementsByClassName('cell');

var p1extinct = false;
var p2extinct = false;
var p3extinct = false;
var p4extinct = false;

status("Initializing colors...");

//colors
var none = "#EEE";
var blue = "rgb(187, 187, 255)";
var red = "rgb(255, 187, 187)";
var green = "rgb(187, 255, 187)";
var yellow = "rgb(255, 255, 187)";

status("Initializing UI stuff...");

function showHTP(e){
    document.getElementById('info').classList.remove('hidden');
    e.preventDefault();
}
function hideHTP(e){
    document.getElementById('info').classList.add('hidden');
    e.preventDefault();
}

status("Getting game stuff ready...");

function startGame(players){
    status('Starting game with ' + players + ' players...');
    document.getElementById('menu').classList.add('hidden');
    
    status("Populating Player 1's cells.");
    document.getElementsByClassName('r-2 c-2')[0].style.background = blue;
    document.getElementsByClassName('r-2 c-3')[0].style.background = blue;
    document.getElementsByClassName('r-3 c-2')[0].style.background = blue;
    document.getElementsByClassName('r-3 c-3')[0].style.background = blue;
    
    status("Populating Player 2's cells.");
    document.getElementsByClassName('r-8 c-8')[0].style.background = red;
    document.getElementsByClassName('r-8 c-9')[0].style.background = red;
    document.getElementsByClassName('r-9 c-8')[0].style.background = red;
    document.getElementsByClassName('r-9 c-9')[0].style.background = red;
    
    if(players > 2){
        status("Populating Player 3's cells.");
        document.getElementsByClassName('r-2 c-8')[0].style.background = yellow;
        document.getElementsByClassName('r-2 c-9')[0].style.background = yellow;
        document.getElementsByClassName('r-3 c-8')[0].style.background = yellow;
        document.getElementsByClassName('r-3 c-9')[0].style.background = yellow;
    }
    else{p3extinct = true;}
    
    if(players > 3){
        status("Populating Player 4's cells.");
        document.getElementsByClassName('r-8 c-2')[0].style.background = green;
        document.getElementsByClassName('r-8 c-3')[0].style.background = green;
        document.getElementsByClassName('r-9 c-2')[0].style.background = green;
        document.getElementsByClassName('r-9 c-3')[0].style.background = green;
    }
    else{p4extinct = true;}
    
    status("Done.");
}

status("Making things pretty...");

function colorMe()
{
    if(this.style.background != blue)
    {
        this.style.background = blue;
    }
    else
    {
        this.style.background = none;
    }
}

status("Tieing down loose ends...");

document.getElementById('howtoplay').onclick = showHTP;
document.getElementById('howtoplay-close').onclick = hideHTP;
document.getElementById('playerboxes').getElementsByTagName('a')[0].onclick = function(){startGame(2);};
document.getElementById('playerboxes').getElementsByTagName('a')[1].onclick = function(){startGame(3);};
document.getElementById('playerboxes').getElementsByTagName('a')[2].onclick = function(){startGame(4);};

status("Reticulating splines...");
for(i=0;i < cells.length;i++)
{
    cells[i].onclick = colorMe;
}

// remove preloading thing when all is done
document.getElementsByTagName('body')[0].removeChild(document.getElementsByTagName('div')[0]);

status("Done.");
