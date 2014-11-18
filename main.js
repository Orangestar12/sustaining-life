status("Getting game stuff ready...");

function startGame(prs, e){
    document.getElementsByTagName('html')[0].style.paddingBottom = '1em';
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
        cells[i].setAttribute("data-color", "none")
        cells[i].setAttribute("data-updateto", "stay");
    }
    
    status("Populating Player 1's cells.");
    document.getElementsByClassName('r-2 c-2')[0].setAttribute("data-color", "blue");
    document.getElementsByClassName('r-2 c-3')[0].setAttribute("data-color", "blue");
    document.getElementsByClassName('r-3 c-2')[0].setAttribute("data-color", "blue");
    document.getElementsByClassName('r-3 c-3')[0].setAttribute("data-color", "blue");
    
    status("Populating Player 2's cells.");
    document.getElementsByClassName('r-8 c-8')[0].setAttribute("data-color", "red");
    document.getElementsByClassName('r-8 c-9')[0].setAttribute("data-color", "red");
    document.getElementsByClassName('r-9 c-8')[0].setAttribute("data-color", "red");
    document.getElementsByClassName('r-9 c-9')[0].setAttribute("data-color", "red");
    
    if(players > 2){
        status("Populating Player 3's cells.");
        document.getElementsByClassName('r-2 c-8')[0].setAttribute("data-color", "yellow");
        document.getElementsByClassName('r-2 c-9')[0].setAttribute("data-color", "yellow");
        document.getElementsByClassName('r-3 c-8')[0].setAttribute("data-color", "yellow");
        document.getElementsByClassName('r-3 c-9')[0].setAttribute("data-color", "yellow");
    }
    else{p3extinct = true;}
    
    if(players > 3){
        status("Populating Player 4's cells.");
        document.getElementsByClassName('r-8 c-2')[0].setAttribute("data-color", "green");
        document.getElementsByClassName('r-8 c-3')[0].setAttribute("data-color", "green");
        document.getElementsByClassName('r-9 c-2')[0].setAttribute("data-color", "green");
        document.getElementsByClassName('r-9 c-3')[0].setAttribute("data-color", "green");
    }
    else{p4extinct = true;}
    for(i=0;i<cells.length;i++){colorCell(cells[i]);}
    turn = 1;
    getTurn();
    e.preventDefault();
}

function takeTurn()
{
    if(this.getAttribute("data-color") != "none")
    {
        status('Please choose an empty cell.');
    }
    else{
        switch(turn){
            case 1:
                this.setAttribute("data-color", "blue");
                break;
            case 2:
                this.setAttribute("data-color", "red");
                break;
            case 3:
                this.setAttribute("data-color", "yellow");
                break;
            case 4:
                this.setAttribute("data-color", "green");
                break;
        }
        turn++;
        //skip extinct players
        while(extinct(turn))
            turn++;
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
                                if(getCell(x+xx,y+yy).getAttribute("data-color") != "none"){
                                    //console.log('found neighbor at '+xx+', '+yy);
                                    neighbors++;
                                    evalColor(getCell(x+xx,y+yy));
                                }
                            }
                        }
                    //console.log('totaled up to '+neighbors+' neighbors.');
                    //debugger;
                    if(getCell(x,y).getAttribute("data-color") != "none"){ //evaluate lives or dies
                        if(neighbors<2){
                            getCell(x,y).setAttribute("data-updateto", "none"); //death by underpop
                        }
                        else if(neighbors > 3){
                            getCell(x,y).setAttribute("data-updateto", "none"); //death by overpop
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
            for(i=0;i<cells.length;i++){
                    if(cells[i].getAttribute("data-updateto") != "stay") {cells[i].setAttribute("data-color", cells[i].getAttribute("data-updateto"));}
                    cells[i].setAttribute("data-updateto", "stay");
                    evalColor(cells[i]);
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
            if(extinct(1) && extinct(2) && extinct(3) && extinct(4)){ //tie
                status("All cells are extinct! It's a tie!");
                document.getElementById('menu').classList.remove('hidden');
                document.getElementsByTagName('html')[0].style.paddingBottom = '10em';
            }
            else{
                if(extinct(2) && extinct(3) && extinct(4)){ //player 1 wins
                    status("Blue wins!");
                    document.getElementById('menu').classList.remove('hidden');
                    document.getElementsByTagName('html')[0].style.paddingBottom = '10em';
                }
                if(extinct(1) && extinct(3) && extinct(4)){ //player 2 wins
                    status("Red wins!");
                    document.getElementById('menu').classList.remove('hidden');
                    document.getElementsByTagName('html')[0].style.paddingBottom = '10em';
                }
                if(extinct(1) && extinct(2) && extinct(4)){ //player 3 wins
                    status("Yellow wins!");
                    document.getElementById('menu').classList.remove('hidden');
                    document.getElementsByTagName('html')[0].style.paddingBottom = '10em';
                }
                if(extinct(1) && extinct(2) && extinct(3)){ //player 4 wins
                    status("Green wins!");
                    document.getElementById('menu').classList.remove('hidden');
                    document.getElementsByTagName('html')[0].style.paddingBottom = '10em';
                }
            }
        }//end evaluation
        for(i=0;i<cells.length;i++){
            colorCell(cells[i]);
        }
    }
}
