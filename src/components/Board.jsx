import React, {useState} from 'react';
import Square from "./Square";

function Board() {

    const [isXTurn, setXTurn] = useState(true)
    const [state, setState] = useState(Array(9).fill(null))

    const [count, setCount] = useState(0) //to check for draw

    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ]

    const checkWinner = () => {

        for(let winningValue of winningCombinations) {

            const [a, b, c] = winningValue

            if(state[a] !== null && state[a] === state[b] && state[b] === state[c])
                return state[a]
        }

        return false
    }

    let isWinner = checkWinner()

    if( count === 9 && isWinner === false ) isWinner = "Draw"
    const handleClick = (index) => {

        if(state[index] !== null) return;

        const copyState = [...state]
        copyState[index] = isXTurn ? "X": "O"
        setState(copyState)
        setCount(count+1)
        setXTurn(!isXTurn)
    }


    const resetBoard = () => {
        setState(Array(9).fill(null))
        setCount(0)
    }


    return (
        <>

        {
            isWinner ?
                (
                    <div style={ {textAlign:"center"} }>
                        {
                            isWinner === 'Draw'
                                ?
                                <h2> Game {isWinner} </h2>
                                :
                                <h2> Player {isWinner} won the game </h2>
                        }
                        <button onClick={resetBoard}>Play Again</button>
                    </div>
                )
                :
                (
                    <>

                        <h2 style={ {textAlign: "center"} }> Turn : { isXTurn ? "X" : "O" } </h2>

                        <div className='board'>
                            <div className='board-row'>
                                <Square value={state[0]} onClick={() => handleClick(0)} />
                                <Square value={state[1]} onClick={() => handleClick(1)} />
                                <Square value={state[2]} onClick={() => handleClick(2)} />
                            </div>
                            <div className='board-row'>
                                <Square value={state[3]} onClick={() => handleClick(3)} />
                                <Square value={state[4]} onClick={() => handleClick(4)} />
                                <Square value={state[5]} onClick={() => handleClick(5)} />
                            </div>
                            <div className='board-row'>
                                <Square value={state[6]} onClick={() => handleClick(6)} />
                                <Square value={state[7]} onClick={() => handleClick(7)} />
                                <Square value={state[8]} onClick={() => handleClick(8)} />
                            </div>
                        </div>

                    </>
                )
        }

        </>
    );
}

export default Board;