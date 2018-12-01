
$(function () {

    var squares = [],
        SIZE = 10,
        EMPTY = "&nbsp;",
        score,
        moves,
        turn = "X",

        /*
         * Clears the score and move count, erases the board, and makes it
         * X's turn.
         */
        startNewGame = function () {
            turn = "X";
            score = {
                "X": 0,
                    "O": 0
            };
            moves = 0;
            squares.forEach(function (square) {
                square.html(EMPTY);
            });
        },

        /*
         * Returns whether the given score is a winning score.
         */
        win = function (clicked) {
            // Get all of the classes this cell belongs to
            var memberOf = clicked[0].className.split(/\s+/);

            // Check elements with the same class, and see if they contain "turn", i.e. X or O
            for (var i = 0; i < memberOf.length; i++) {
                var testClass = '.' + memberOf[i];
                // If the number of elements containing "turn" == SIZE,
                // we have a winning condition
                if ($('#tictactoe').find(testClass + ':contains(' + turn + ')').length == SIZE) {
                    return true;
                }
            }

            return false;
        },

        /*
         * Sets the clicked-on square to the current player's mark,
         * then checks for a win or cats game.  Also changes the
         * current player.
         */
        set = function () {

            if ($(this).html() !== EMPTY) {
                return;
            }
            $(this).html(turn);
            moves += 1;
            score[turn] += $(this)[0].indicator;
            //console.log(score[turn]);
            if (win($(this))) {
                alert(turn + " wins!");
                startNewGame();
            } else if (moves === SIZE * SIZE) {
                alert("Cat\u2019s game!");
                startNewGame();
            } else {
                turn = turn === "X" ? "O" : "X";
            }
        },

        /*
         * Creates and attaches the DOM elements for the board as an
         * HTML table, assigns the indicators for each cell, and starts
         * a new game.
         */
        play = function () {
            var board = $("<table border=1 cellspacing=0>"),
                indicator = 1;
            for (var i = 0; i < SIZE; i += 1) {
                var row = $("<tr>");
                board.append(row);
                for (var j = 0; j < SIZE; j += 1) {
                    var cell = $("<td height=120 width=120 align=center valign=center></td>");
                    cell.addClass('col' + j); // The cell is in column j
                    cell.addClass('row' + i); // The cell is in row i
                    if (i == j) {
                        cell.addClass('dia0'); // The cell is in the down/right diagonal
                    }
                    if (j == SIZE - i - 1) {
                        cell.addClass('dia1'); // The cell is in the up/right diagonal
                    }
                    cell[0].indicator = indicator;
                    cell.click(set);
                    row.append(cell);
                    squares.push(cell);
                    indicator += indicator;
                }
            }

            // Attach under tictactoe if present, otherwise to body.
            $(document.getElementById("tictactoe") || document.body).append(board);
            startNewGame();
        };

    play();
});