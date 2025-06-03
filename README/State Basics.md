# #6 State Basics

---

## State

- 컴포넌트의 동적인 데이터(변화 가능한 값)를 다루는 데 사용
    - 즉, 사용자의 입력, 버튼 클릭, API 응답 등으로 인해 **값이 바뀌는 데이터**는 `state`로 관리
- state에 따라 화면이 렌더링 되도록 만들 수 있음

`useState` -  React 함수형 컴포넌트에서 상태(state)를 관리할 수 있도록 해주는 훅(Hook)

- `import { useState } from 'react'`
- 실제 프로젝트에서는 항상 import 됨
- 숫자, 불리언, 문자열, 객체, 배열 등 어떤 값이든 사용될 수 있음

- 리렌더링 - 웹페이지가 새로고침되지 않은 채로 내용만 바뀜
    - `const [count, setCount] = useState(0)` - 리렌더링됨
    - `setCount` 없이 값만 변경할 경우 새로고침 해야만 화면 변경 (리렌더링 X)
    - 배열 안의 항목들을 변경하는 것으로는 리렌더링 발생하지 않음

- 기존 배열의 요소를 활용하여 새로운 배열을 만들 때 배열의 스프레딩이 사용됨
    
    ```jsx
    const array1 = [1,2,3]
    const array2 = […array1,4,5] // → const array2 =[1,2,3,4,5]
    ```
    
    ```
    const addTodo = (newTodo) => {
        setTodos([...todos, newTodo]) //기존의 것 + 새로 추가한 것
        setNewTodo('') //입력 후 입력창 지워두기
      }
    ```
