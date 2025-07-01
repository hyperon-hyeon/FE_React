# #5 Event

---

## 이벤트 핸들링

이벤트 - 사용자의 행동이나 브라우저의 동작 등에 의해 발생하는 사건

- ex. 사용자가 버튼을 클릭하거나 엔터키를 누르거나 특정 요소의 로딩이 완료될 때

이벤트 핸들링 - 이벤트들이 발생할 때 이뤄져야 하는 동작들을 프로그래밍 하는 것

- ex. 클릭시 콘솔 출력하는 함수

- `Button 1` 클릭 시 `handleClick` 함수가 실행 -  `handleClick` 함수가 미리 선언
(이게 더 좋은 방식)
    
    ```jsx
    <button onClick={handleClick}>
      Button 1
    </button>
    ```
    

- `Button 2` 클릭 시, **익명 함수**가 실행되며 콘솔에 `'Event 2'`가 출력
    
    ```jsx
    <button onClick={() => {console.log('Event 2')}}>
      Button 2
    </button>
    
    ```
    

- 이벤트 핸들러에 추가 인자(name)와 함께 기본 이벤트 객체(e)도 넘길 수 있음
    - 이벤트 객체 - 이벤트에 대한 상세 정보를 담는 객체 (이벤트 발생 요소, 발생 시간, 함께 눌린 키 등)
    - `SyntheticBaseEvent` - DOM의 이벤트 객체와 유사하지만 리액트에 의해 추가적인 최적화 적용
    주요 목적은 사용자가 브라우저의 종류와 무관하도록 모든 이벤트를 일관적으로 다루기 위함
    추가로, 이벤트 처리가 효율적으로 이뤄지도록 하여 성능을 높이는 등의 이점 제공

```jsx
<button 
    onClick={
      (e) => handleEvent(name, e)
    }
  >
```
