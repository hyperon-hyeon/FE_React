# #8 useReducer

---

## useReducer

리액트 Hook이라 불리는 함수들 중 하나로, 관리해야 할 로직이 복잡할 때 사용되는 기능

- state 관련 로직이 복잡해질 때 state 사용하면 코드가 매우 길어짐
- 같은 로직이 여러 컴포넌트에 사용되면 중복 작성 코드도 많아짐

→ 이를 분리된 문서에서 독립적으로 작성할 수 있다면 코드의 효율성과 가독성 향상

- useState, useReducer - 값 변경시 화면도 렌더링

- src 파일 안에 `reducers` 라는 폴더 생성 - `useReducer.js`
    - 용도별로 폴더 지정하여 문서 정돈해야 함
    - 컴포넌트에 작성되어 있던 로직을 외부로 분리함

- App.jsx - useReducer에 작성된 함수와 객체를 디스트럭쳐링으로 import
    
    ```jsx
    import './App.css'
    import React, { useReducer } from 'react'
    import { userReducer, initialState }
    	from './reducers/userReducer'
    	
    function App() {
      const [state, dispatch]
       = useReducer(userReducer, initialState)
       
     
     //return 내부
     <input
            type="text" placeholder="Enter name"
            value={state.name}
            onChange={(e) => dispatch({ 
              type: 'SET_NAME',  payload: e.target.value })}
          />
    ```
    
    - 인자로 useReducer 함수와 초기상태 받음 
    → 두 요소가 담긴 배열이 반환되어 배열 디스트럭쳐링으로 할당
    - 관례적으로 state, dispatch 사용 - state는 상태값 가진 객체, dispatch는 이를 수정하는데 사용
        - 중괄호 표현식으로 state 객체 사용
        - 사용자 입력에 반응하는 이벤트 핸들러로 dispatch 사용 - state 객체값 바꾸고 리렌더링
    - type - dispatch 함수가 어떤 액션을 취할지 구별하기 위해 사용
        - 입력창을 통해 액션이 실행 → type 속성 기준으로 switch문 실행
    - payload - state의 수정된 값들은 payload에 담겨 전달 → 액션 객체의 payload 값으로 사용됨
        - 주로 웹페이지에 렌더링으로 나타날 데이터를 보냄

---

## 초기값 동적 지정

- useReducer.js
    
    ```jsx
    export const initialState = {
      name: '',
      year: '',
      warning: ''
    }
    
    export function userReducer(state, action) {
      switch (action.type) {
        case 'SET_NAME':
          return { 
            ...state, 
            name: action.payload.trim().toLowerCase() }
        case 'SET_YEAR': {
          const age
           = new Date().getFullYear() - action.payload
          if (age < 18) {
            return { 
              ...state, 
              warning: 'Must be at least 18 yrs old!' }
          }
          return { 
            ...state, 
            year: action.payload, 
            warning: '' 
            }
        }
        default:
          throw new Error('Unknown action type')
      }
    }
    ```
    
    - initialState - 속성들의 초기값 지정
        - 외부 요소에 의해, 동적으로 지정해야 하는 경우도 있음
    - useReducer - switch문을 사용하여 매개변수로 받아온 값에 따라 객체 반환
        - 현재 상태가 담긴 state 객체의 값을 스프레드 연산자로 가져와 수정된 값을 덮어씌움

- data.js - useReducer의 초기값 지정
    
    ```jsx
    const externalData = {
      name: 'jane doe',
      year: 1995
    }
    
    export default externalData
    ```
    
    - useReducer.js 수정
        
        ```jsx
        case 'RESET':
              return init(action.payload)
            default:
              throw new Error('Unknown action type')
          }
        }
        
        export function init(externalData) {
          return {
            ...initialState,
            name: externalData.name,
            year: externalData.year
          }
        }
        ```
        
        - init 함수
            - 객체 속성(초기값) 스프레딩으로 가져오고 name, year 속성을 externalData로 덮어씌워 반환 ⇒ 반환되는 객체가 초기값이 되는 것
            - 초기값을 계산하는데 비용이 많이 들거나 복잡한 로직이 필요할 때 사용
    - App.jsx 수정
        
        ```jsx
        import './App.css'
        import React, { useReducer } from 'react'
        import { userReducer, init }
         from './reducers/userReducer'
        import data from './data'
        
        function App() {
          const [state, dispatch]
           = useReducer(userReducer, data, init)
        ```
        
        - initialState 객체 대신 init(반환되는 객체가 초기값이 되게 함) 함수가 App 컴포넌트로 import
        - data 문서로부터 그곳에 작성된 객체 import → useReducer 함수의 2,3번째 인자로 전달 
        → state의 초기값 설정에 각각 함수(3번째 인자)와 매개변수(2번째 인자)로 사용됨
            - 3번째 인자로 들어가는 함수 - 해당 컴포넌트가 최초로 렌더링될 때 사용 (= ‘마운트’ 될 때)

- meta 사용
    - 컴포넌트 상태와 별개로 디버깅, 로깅, 추가 분석 등에 사용될 추가적인 데이터 보냄
    
    ```jsx
    export const initialState = {
      count: 0
    }
    
    export function countReducer(state, action) {
      const { value } = action.payload
      const { x, y } = action.meta
      switch (action.type) {
        case 'INC':
          console.log(`Click: (${x}, ${y})`)
          return { 
            ...state, 
            count: state.count + value
          }
        case 'DEC':
          console.log(`Click: (${x}, ${y})`)
          return { 
            ...state,
            count: state.count - value 
          }
        default:
          throw new Error('Unknown action type')
      }
    }
    ```
    
    - meta - 클릭의 좌표를 로깅하는데 사용됨
        - 화면에 직접적으로 나타나는 것 이외의 용도로 사용되는 데이터는 주로 meta 속성으로 보냄
    
    ```jsx
    import './App.css'
    import React, { useReducer } from 'react'
    import { countReducer, initialState }
     from './reducers/countReducer'
    
    function App() {
      const [state, dispatch]
       = useReducer(countReducer, initialState)
    
      const handleClick = (type, value, event) => {
        const { clientX: x, clientY: y } = event
        dispatch({
          type, payload: { value }, meta: { x, y }
        })
      }
    
      return (
        <>
          <p>Count: {state.count}</p>
          <button onClick={(e) => handleClick('INC', 1, e)}>+1</button>
          <button onClick={(e) => handleClick('DEC', 1, e)}>-1</button>
          <button onClick={(e) => handleClick('INC', 2, e)}>+2</button>
          <button onClick={(e) => handleClick('DEC', 2, e)}>-2</button>
        </>
      )
    }
    
    export default App
    ```
