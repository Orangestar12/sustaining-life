//note to self use classlist https://developer.mozilla.org/en-US/docs/Web/API/element.classList
function status(text){
    document.getElementById('status').innerHTML = text;
    console.log(text);
};

status("Initializing variables...");

var cells = document.getElementsByClassName('cell');
var turn = 1;
players = 0;
var p1extinct = false;
var p2extinct = false;
var p3extinct = false;
var p4extinct = false;

var blues = 0;
var reds = 0;
var yellows = 0;
var greens = 0;

status("Initializing colors...");

//colors
var none = "rgb(238, 238, 238)";
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

function startGame(prs){
    players = prs;
    status('Starting game with ' + players + ' players...');
    document.getElementById('menu').classList.add('hidden');
    
    status("Resetting necessary variables...")
    p1extinct = false;
    p2extinct = false;
    p3extinct = false;
    p4extinct = false;
    
    status("Resetting all cells...")
    for(i=0;i < cells.length;i++)
    {
        cells[i].style.background = none;
        cells[i].setAttribute("data-updateto", "stay");
    }
    
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
    turn = 1;
    getTurn();
}

function getCell(x,y){return document.getElementsByClassName("r-"+x+" c-"+y)[0]}
function evalColor(elem){
    switch(elem.style.background){
        case blue:
            blues++;
            break;
        case red:
            reds++;
            break;
        case yellow:
            yellows++;
            break;
        case green:
            greens++;
            break;
    }
}
function maxArray(array){
    var largest = Math.max.apply( Math, array );
    switch(largest){
        case blues:
            return blue;
            break;
        case reds:
            return red;
            break;
        case yellows:
            return yellow;
            break;
        case greens:
            return green;
            break;
    }
}; //thanks John Resig http://ejohn.org/blog/fast-javascript-maxmin/
function extinct(player){
    switch(player){
        case 1:
            if(p1extinct==true)
                return true;
            break;
        case 2:
            if(p2extinct==true)
                return true;
            break;
        case 3:
            if(p3extinct==true)
                return true;
            break;
        case 4:
            if(p4extinct==true)
                return true;
            break;
    }
    return false;
}
function getTurn(){
        switch(turn){
            case 1:
                status("Blue's turn.");
                break;
            case 2:
                status("Red's turn.");
                break;
            case 3:
                status("Yellow's turn.");
                break;
            case 4:
                status("Green's turn.");
                break;
        }
}

function colorMe()
{
    if(this.style.background != none)
    {
        status('Please choose an empty cell.');
    }
    else{
        switch(turn){
            case 1:
                this.style.background = blue;
                break;
            case 2:
                this.style.background = red;
                break;
            case 3:
                this.style.background = yellow;
                break;
            case 4:
                this.style.background = green;
                break;
        }
        turn++
        //skip extinct players
        while(extinct(turn))
            turn++
        getTurn();
        if(turn>players){ //begin iteration
            var neighbors = 0;
            status('Evaluating cells...');
            for(x=1;x<=10;x++){
                for(y=1;y<=10;y++){
                    //console.log('checking cell '+x+', '+y);
                    for(xx = -1; xx <= 1; xx++)
                        for(yy = -1; yy <= 1; yy++){
                            if(x+xx != 0 && y+yy != 0 && x+xx != 11 && y+yy != 11 && !(xx == 0 && yy == 0)){
                                if(getCell(x+xx,y+yy).style.background != none){
                                    //console.log('found neighbor at '+xx+', '+yy);
                                    neighbors++;
                                    evalColor(getCell(x+xx,y+yy));
                                }
                            }
                        }
                    //console.log('totaled up to '+neighbors+' neighbors.');
                    //debugger;
                    if(getCell(x,y).style.background != none){ //evaluate lives or dies
                        if(neighbors<2){
                            getCell(x,y).setAttribute("data-updateto", none); //death by underpop
                        }
                        else if(neighbors > 3){
                            getCell(x,y).setAttribute("data-updateto", none); //death by overpop
                        }
                    }
                    else if(neighbors == 3){ //evaluate reproduction
                        getCell(x,y).setAttribute("data-updateto", maxArray([blues,reds,yellows,greens]));
                    }
                    neighbors = 0;
                    blues = 0;
                    reds = 0;
                    yellows = 0;
                    greens = 0;
                }
            }
            for(x=1;x<=10;x++){
                for(y=1;y<=10;y++){
                    if(getCell(x,y).getAttribute("data-updateto") != "stay") {getCell(x,y).style.background = getCell(x,y).getAttribute("data-updateto");}
                    getCell(x,y).setAttribute("data-updateto", "stay");
                    evalColor(getCell(x,y));
                }
            }
            //check for extinction
            if(blues == 0 && p1extinct == false){p1extinct=true;status("Blue has been eliminated!")}
            if(reds == 0 && p2extinct == false){p2extinct=true;status("Red has been eliminated!")}
            if(yellows == 0 && p3extinct == false){p3extinct=true;status("Yellow has been eliminated!")}
            if(greens == 0 && p4extinct == false){p4extinct=true;status("Green has been eliminated!")}
            blues = 0;
            reds = 0;
            yellows = 0;
            greens = 0;
            turn=1;
            //skip extinct players
            while(extinct(turn))
                turn++
            getTurn();
            //check for win condition
            if(p1extinct==true && p2extinct==true && p3extinct==true && p4extinct==true){ //tie
                status("All cells are extinct! It's a tie!");
                document.getElementById('menu').classList.remove('hidden');
            }
            else{
                if(p2extinct==true && p3extinct==true && p4extinct==true){ //player 1 wins
                    status("Blue wins!");
                    document.getElementById('menu').classList.remove('hidden');
                }
                if(p1extinct==true && p3extinct==true && p4extinct==true){ //player 2 wins
                    status("Red wins!");
                    document.getElementById('menu').classList.remove('hidden');
                }
                if(p1extinct==true && p2extinct==true && p4extinct==true){ //player 3 wins
                    status("Yellow wins!");
                    document.getElementById('menu').classList.remove('hidden');
                }
                if(p1extinct==true && p2extinct==true && p3extinct==true){ //player 4 wins
                    status("Green wins!");
                    document.getElementById('menu').classList.remove('hidden');
                }
            }
        }//end evaluation
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
    cells[i].style.background = none;
    cells[i].setAttribute("data-updateto", "stay");
}

// remove preloading thing when all is done
document.getElementsByTagName('body')[0].removeChild(document.getElementsByTagName('div')[0]);
status("Done.");
