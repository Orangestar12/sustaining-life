status("Initializing colors...");

//colors
var none = "rgba(238, 238, 238, 0.5)";
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

status("Setting up behind-the-scenes functions...");

function getCell(x,y){return document.getElementsByClassName("r-"+x+" c-"+y)[0]}
function evalColor(elem){
    switch(elem.getAttribute("data-color")){
        case "blue":
            blues++;
            break;
        case "red":
            reds++;
            break;
        case "yellow":
            yellows++;
            break;
        case "green":
            greens++;
            break;
    }
}

function maxArray(array){
    var largest = Math.max.apply( Math, array );
    switch(largest){
        case blues:
            return "blue";
            break;
        case reds:
            return "red";
            break;
        case yellows:
            return "yellow";
            break;
        case greens:
            return "green";
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
                document.getElementsByTagName('html')[0].style.backgroundColor = blue;
                break;
            case 2:
                status("Red's turn.");
                document.getElementsByTagName('html')[0].style.backgroundColor = red;
                break;
            case 3:
                status("Yellow's turn.");
                document.getElementsByTagName('html')[0].style.backgroundColor = yellow;
                break;
            case 4:
                status("Green's turn.");
                document.getElementsByTagName('html')[0].style.backgroundColor = green;
                break;
        }
}

function colorCell(elem){
    switch(elem.getAttribute('data-color')){
        case "blue":
            elem.style.background = blue;
            break;
        case "red":
            elem.style.background = red;
            break;
        case "yellow":
            elem.style.background = yellow;
            break;
        case "green":
            elem.style.background = green;
            break;
        case "none":
            elem.style.background = none;
    }
}

function lowqual(){
    document.getElementsByTagName('html')[0].className = "lq";
}
function midqual(){
    document.getElementsByTagName('html')[0].className = "lq mq";
}
function highqual(){
    document.getElementsByTagName('html')[0].className = "lq mq hq";
}
