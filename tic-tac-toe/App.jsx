import { useState } from 'react'
import Board from "./Board";
import './App.css'

function App() {
  const [board,setBoard]=useState(Array(9).fill(""));
  const [player,setPlayer]=useState("X");
  const [winner,setWinner]=useState(null);

  //이겼는지 여부 확인 - board로 입력받은 배열에서 winningLines에 해당되는 것(승리조건)이 있는지 확인한 후 있다면 승자 반환, 아니면 null 반환
  const checkWin = (board) => {
    //승리조건에 해당하는 라인 지정
    const winningLines=[
      [0,1,2],[3,4,5],[6,7,8],
      [0,3,6],[1,4,7],[2,5,8],
      [0,4,8],[2,4,6]
    ];
    //board 확인하여 승리조건 만족하면 승자 반환
    for(let[a,b,c] of winningLines){
      if(board[a]&&board[a]===board[b]&&board[a]===board[c]) return board[a];
    }
    //승리조건 만족하지 못하면 null 반환
    return null;
  }

  //게임 진행
  const playGame = (square) => {

    //비어있거나 승자가 정해져 있으면 작동 안함
    if (board[square] !== "" || winner) return;

    //플레이가 칸 선택하면 새로 보드판 업데이트
    const newBoard=[...board];
    newBoard[square]=player;
    setBoard(newBoard);

    //승자 확인 - 승자 있으면 winner에 승자 지정, 무승부(모든 칸 다 찼는데 승자 없음)면 '없음'지정, 둘 다 아니면 게임 계속 진행_턴 넘김
    const win=checkWin(newBoard);
    if (win) {
      setWinner(win);
    }else if(!newBoard.includes('')){
      setWinner("없음");
    }else {
      setPlayer(player==="X"?"O":"X");
    }

  }

  //게임 다시하기 함수 - 보드 전부 비우고 승자도 지움
  const resetGame=()=> {
    setBoard(Array(9).fill(""));
    setPlayer("X");
    setWinner(null);
  }

  return (
    <>
      {/* 승자 있으면 승자 출력, 없으면 플레이어 출력 */}
      <h2>{winner ? `승자: ${winner}` : `현재 차례: ${player}`}</h2>
      <Board board={board} onClick={playGame} />
      <button onClick={resetGame} style={{marginTop:"20px"}}>다시하기</button>
    </>
  )
}

export default App