# #11 Custom Hook

---

## Hook

- 함수의 문법에는 필드나 메소드가 없기 때문에 이를 구현할 수 있는 방법
- 특정 로직을 모듈로 분리하여 필요한 컴포넌트들에서 재사용할 수 있도록 함
- ex. useState, useReducer, useRef, useContect, useEffect 등 use로 시작하는 기능
    - useState - state를 함수 컴포넌트에서도다루기위해 useState 훅 사용

**Custom hook**

- hooks라는 폴더 만들고 js 문서 생성
- 함수의 이름은 use로 시작해야 리액트를 훅으로 인식
    - 리액트에서 훅과 다른 함수의 처리 과정이 다름 
    → 훅으로 인식되지 않을 경우 최적화나 렌더링 우선순위 등에 문제가 생길 수 있음
- 훅과 자바스크립트 모듈과 다른 점 - 내부에 다른 훅 사용 가능
    - 내부에서 훅을 사용할 수 있는 것은 다른 훅 뿐임
- 실행시에는 반드시 컴포넌트 안에 있어야 함 → 컴포넌트 밖일 경우 동작하지 않음

```jsx
import { useState, useEffect } from 'react'

function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  })

  useEffect(() => { //마운팅 직후 실행
    const handleResize = () => { 
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      })
    }
    //DOM 준비 후에 이벤트 등록하기 위해서
    window.addEventListener('resize', handleResize) //브라우저 창 바뀔 때마다 함수 실행
     //반환하는 함수는 언마운트 시점에 실행 - 컴포넌트 제거시 불필요한 이벤트 핸들러 제거
    return () => window.removeEventListener(
      'resize', handleResize)
  }, [])

  return windowSize
}

export default useWindowSize
```

```jsx
import './App.css'
import useWindowSize
 from './hooks/useWindowSize'

const App = () => {
  const {width, height}
   = useWindowSize()
```

---

## useFetch

알려진 훅이지만 내장 훅이 아닌 사용자가 직접 작성하는 커스텀 훅 (like 짜파구리)

```jsx
import { useState, useEffect } from 'react'

export const useFetch = (url) => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url)
        if (!response.ok) {
          throw new Error('Error')
        }
        const result = await response.json()
        setData(result)
      } catch (err) { setError(err.message)
      } finally { setLoading(false) }
    }
    fetchData()
  }, [])

  return { data, loading, error }
}
```
