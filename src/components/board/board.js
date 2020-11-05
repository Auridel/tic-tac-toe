import React, {useState} from "react";
import {connect} from "react-redux";

import "./board.scss";

const Board = ({active, side, moves, username}) => {
    const [move, setMove] = useState(false);

    return (
        <div className="board">
            {moves.map((item, i) => <div key={i} className="cell"/>)}
        </div>
    )
};


const mapStateToProps = (state) => {
    return {
        userName: state.userData.userName,
        active: state.game.active,
        side: state.game.side,
        moves: state.game.moves
    }
}

export default connect(mapStateToProps)(Board);