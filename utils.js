module.exports.checkWin = (moves) => {
    if(moves[0] && (moves[0] === moves[1]) && (moves[1] === moves[2])) return moves[0];
    else if(moves[3] && (moves[3] === moves[4]) && (moves[4] === moves[5])) return moves[3];
    else if(moves[6] && (moves[6] === moves[7]) && (moves[7] === moves[8])) return moves[6];
    else if(moves[0] && (moves[0] === moves[3]) && (moves[3] === moves[6])) return moves[0];
    else if(moves[1] && (moves[1] === moves[4]) && (moves[4] === moves[7])) return moves[1];
    else if(moves[2] && (moves[2] === moves[5]) && (moves[5] === moves[8])) return moves[2];
    else if(moves[0] && (moves[0] === moves[4]) && (moves[4] === moves[8])) return moves[0];
    else if(moves[2] && (moves[2] === moves[4]) && (moves[4] === moves[6])) return moves[2];
    return false;
}