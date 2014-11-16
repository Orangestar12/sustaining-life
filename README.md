sustaining-life
===============

Sustaining life is a game for 2-4 people on a 10x10 grid. Each player starts with a static 2x2 box in the corner of the screen. The goal is to eliminate all cells of your opponent's color while maintaining all cells of your own color.

When it is your turn, you may make any dead cell alive in your own color as you see fit. Each player gets one turn before an iteration.

When all players have moved, the first **iteration** begins. For each iteration, the cells on the board change according to the rules of [Conway's Game of Life](http://en.wikipedia.org/wiki/Conway's_Game_of_Life). Here are the rules: 

 1. Any live cell with less than two live neighbours dies, as if caused by under-population.
 2. Any live cell with two or three live neighbours lives on to the next generation.
 3. Any live cell with more than three live neighbours dies, as if by overcrowding.
 4. Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.

In addition, Sustaining Life features additional rules to ensure more competitive play.</p>

 1. The seed for each player is the corner 4 cells past the first row/column of cells.
 2. Cells of different color <b>do</b> affect each other.
 3. Any cell color that is completely wiped out is considered "extinct" and that player's turn will be skipped.
 4. New cells' color is determined by the number of cells surrounding it. (I.E. if 2 blue and 1 red cell are neighbors to a cell, it will turn blue.)
