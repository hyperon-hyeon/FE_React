import Square from "./Square";
import styles from "./Board.module.css"

function Board({ board, onClick }) {
  return (
    <div className={styles.board}>
      {/* 보드에 있는 각 요소에 대하여 적용 */}
      {board.map((value, i) => (
        //클릭시 해당 칸 반환, Onclick(i) 함수 실행 - App.jsx 파일에서 playGame에 해당하는 함수
        <Square key={i} value={value} onClick={() => onClick(i)} />
      ))}
    </div>
  );
}
export default Board