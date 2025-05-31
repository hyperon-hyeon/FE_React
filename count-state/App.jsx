import { useState } from 'react'
import DisplayNumber from './DisplayNumber'
import styles from './App.module.css';
import './App.css'

function App() {
	// 상태(state) 만들기: count는 현재 값, setCount는 count 변경 함수. 초기값은 0 
  const [count, setCount] = useState(0);
  
  // count 업데이트: number로 받은 수를 기존의 수와 연산하여 count 변경
  const calculateNumber = (number) => {
    setCount(prev => prev + number);
  };

  return (
    <>
    {/*count 표시: DisplayNumber에 count를 number props로 넘겨 표시*/}
      <div className={styles.div}>
        <DisplayNumber number={count} />
      </div>
      {/*버튼 만들기: 버튼 만들고 각 숫자를 calculateNumber 함수에 인자로 넘겨 연산*/}
      <div className={styles.div}>
        <button className={styles.button} onClick={()=>calculateNumber(-100)}>-100</button>
        <button className={styles.button} onClick={()=>calculateNumber(-10)}>-10</button>
        <button className={styles.button} onClick={()=>calculateNumber(-1)}>-1</button>
        <button className={styles.button} onClick={()=>calculateNumber(+1)}>+1</button>
        <button className={styles.button} onClick={()=>calculateNumber(+10)}>+10</button>
        <button className={styles.button} onClick={()=>calculateNumber(+100)}>+100</button>
      </div>
    </>
  )
}

export default App
