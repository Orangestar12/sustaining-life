
            if(extinct(1) && extinct(2) && extinct(3) && extinct(4)){ //tie
                status("All cells are extinct! It's a tie!");
                document.getElementById('menu').classList.remove('hidden');
                document.getElementByTagName('html')[0].style.paddingBottom = '10em';
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
