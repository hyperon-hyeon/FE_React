import React from "react";
import styles from './DisplayNUmber.module.css';

//number 출력: 전달받은 number 값 출력
function DisplayNumber({number}){
    return (
        <>
            <p className={styles.text}> 현재 카운트</p>
            <h1 className={styles.number}>{number}</h1>
        </>
    )
}

export default DisplayNumber