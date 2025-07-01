# #9 useRef

---

## useRef

**렌더링과는 별개로 변수를 사용하거나 DOM 요소에 접근할 때 사용하는 기능**

- 렌더링 관계 없이 변경 가능한 값을 추적해야 하는 경우 유용
- console에는 바로 반영되지만, 따로 화면이 리렌더링되지 않음 (내부적으로는 변화)
- DOM 요소 직접 제어 (특정 입력 요소 포커스, 특정 요소로 스크롤 등)
    - DOM API 메소드나 속성을 그대로 사용할 수 있음 (ex. focus(), click(), style, innerHTML)
    - 입력창에 커서가 자동으로 가있는 경우(autofocus st.) 등에 활용

### 1. 렌더링 없이 값을 추적하는데 사용하는 경우

```jsx
import { useState, useRef } from 'react'

function Counter() {
  const count1 = useRef(0)
  const [count2, setCount2] = useState(0)

  const incrementRef = () => {
    count1.current += 1
    console.log('Ref Count:', count1.current)
  }
  
  return (
    <>
      <h2>Counter Counter</h2>
      <p>Count 1: {count1.current}</p>
      <p>Count 2: {count2}</p>
      <button onClick={incrementRef}>useRef</button>
      <button onClick={() => setCount2(c => c + 1)}>useState</button>
    </>
  )
}

export default Counter
```

- useRef 함수에 초기값을 넣으면 배열이 아닌 객체 타입의 결과가 반환됨
    - useRef 객체를 사용할 때는 이것의 current 값에 직접 접근하면 됨
- useRef 객체를 렌더링되는 부분에 직접 사용하는 것은 코드의 의도 명확하지 X
    - 렌더링에 사용되는 것은 state 사용, 내부적으로 사용되는 것은 useRef 사용하도록 분리

- 수정 - state, useRef 분리

```jsx
import { useState, useRef } from 'react'

function Counter() {
  const [count1, setCount1] = useState(0)
  const [count2, setCount2] = useState(0)
  const refCount = useRef(0)

  const incrementRef = () => {
    refCount.current += 1
    console.log(
      'Ref Count:', refCount.current
    )
  }

  const syncCounts = () => {
    setCount1(refCount.current)
    setCount2(prev => prev + 1)
  }

  return (
    <>
      <h2>Counter Counter</h2>
      <p>Count 1: {count1}</p>
      <p>Count 2: {count2}</p>
      <button onClick={incrementRef}>
        useRef
      </button>
      <button onClick={syncCounts}>
        useState
      </button>
    </>
  )
}

export default Counter
```

- useRef 아닌 상수를 쓰면? 컴포넌트 함수가 리렌더링 발생시 다시 실행되기 때문에 값이 초기화
    - 컴포넌트 함수 밖으로 빼면?
        
        컴포넌트가 하나만 렌더링되어있는 상황이라면 이상 없음 → 둘 이상이라면 변수가 공유되어 값 공유
        
- useRef 쓰면 여러 개의 컴포넌트도 각기 다른 값 분리되어 가지고 있음, 리렌더링시에도 값 분실 X

### 2. DOM 요소에 활용되는 경우 (autofocus st.)

```jsx
import './App.css'
import { useRef } from 'react'

const App = () => {
  const inputRef = useRef(null)

  const handleFocus = () => {
    console.log(inputRef.current)
    inputRef.current.focus()
  }

  return (
    <div>
      <input ref={inputRef}
      type="text" placeholder='Type...'/>
      <button onClick={handleFocus}>
        Focus Input
      </button>
    </div>
  )
}

export default App
```

- useRef 객체 선언 - 값 뿐 아니라 DOM 요소도 담을 수 있음 → null 명시하여 초기화
    - 이후 JSX 요소 작성시 ref 속성에 useRef 객체 넣음 (current 값으로 input DOM 요소 담김)
    - focus 등의 메소드를 가지고 있다는 것으로 보아 DOM 요소 가르키고 있음을 유추할 수 있음
