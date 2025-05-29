import styles from "./Square.module.css"

function Square({ value, onClick }) {
  return( 
    <>
    {/* 버튼에 받아온 값 출력 */}
    <button className={styles.square} onClick={onClick}>
      {value}
    </button>
    </>
  )
}
export default Square