# #10 생명주기와 useEffect

---

## 생명주기

사람에게 출생, 성장, 죽음의 단계가 있듯 컴포넌트들도 생명 주기가 있음

- Mounting, Updating, Unmounting
    - Mounting - 컴포넌트가 처음으로 렌더링되는 시점
    - Updating - 주기적인 허물벗기로 새로운 모습이 되는 시점 (리렌더링)
    - Unmounting - 컴포넌트가 DOM에서 제거되는 시점

---

## useEffect

생명주기를 다루기 위한 Hook

- 예제 코드
    
    ```jsx
    import { useState, useEffect } from 'react'
    
    const FuncComp = () => {
      const [count, setCount] = useState(0)
    
      useEffect(() => {
        console.log('1. Mounted')
        return () => {
          console.log('3. Unmounted')
        }
      }, [])
    
      useEffect(() => {
        console.log('1. Mounted / 2. Updated')
      }, [count])
    ```
    
    - useEffect의 첫 호출에서는 두번째 인자 빈 배열([]), 두번째 호출에서는 state를 포함하는 배열
        - 두번째 인자로 빈 배열 넣으면 첫번째 인자로 넣은 함수는 컴포넌트 마운트 직후 실행됨 (최초만)
        - 두번째 인자로 넣은 배열에 state 관련 요소가 있는 경우도 마운트시에는 첫번째 인자로 넣은 함수 실행됨
    - useEffect 함수의 두번째 배열이 비어있고 첫번째 함수가 다른 함수를 반환할 경우 함수가 언마운트 직전에 실행됨
        - Unmount - 컴포넌트가 제거될 때 남아있는 불필요한 리소스 제거하는 용도로 사용 (방 청소)
    

- App.jsx
    
    ```jsx
    const App = () => {
      const [count1, setCount1] = useState(0)
      const [count2, setCount2] = useState(0)
    
      const handleIncrease = (setter) => { setter((prev) => prev + 1) }
    
    	//count1의 값에 따라 함수 실행
      useEffect(() => {
        console.log(`C1: ${count1}, C2: ${count2}`)
      }, [count1]) 
      
     	//count1과 count2의 값에 따라 함수 실행
      useEffect(() => {
        console.log(`C1: ${count1}, C2: ${count2}`)
      }, [count1,count]) 
      
      //모든 업데이트 반응하여 함수 실행
      useEffect(() => {
        console.log(`C1: ${count1}, C2: ${count2}`)
      })
    ```
    
    - 어느 state가 업데이트 될 때 useEffect에 인자로 넣은 함수가 실행될지를 정하기 위해 두번째 인자로 들어가는 배열 사용 (props도 사용 가능)
    - 두번째 인자인 배열을 넣지 않고 실행시 모든 렌더링에 반응
        - 의도하지 않은 동작으로 이어질 수 있기에 권장 X
        

---

## 실무에서의 useEffect

API 사용해서 서버에서 받아온 데이터를 화면에 렌더링하는 용도로 많이 사용

```jsx
import './App.css'
import { useState, useEffect } from 'react'

const App = () => {
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch('/data/books.json') //실무의 API URL 해당
        const data = await response.json()
        setBooks(data)
      } catch (error) {
        console.error('Failed to fetch books:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchBooks()
  }, []) //만약 필터링 등에 사용되는 데이터라면 이 배열에 기준 state 들어감
```

- 외부로부터 받아오는 (데이터 없이도 보여줄 수 있는) 부분들을 먼저 렌더링
    - 서버 요청 보내기 전에 페이지 기본 틀을 렌더링 - 마운팅 먼저 실행
    - 나머지는 DB에 저장된 내용으로 채움
- 틀 외의 부분에 렌더링될 요소에 필요한 데이터를 서버로부터 받아옴 - useEffect가 사용
    - 첫 마운트 이후 백엔드 서버에 요청을 보냄 → 요청 받은 서버는 해당 데이터를 리액트로 전송
    이러한 결과가 렌더링되어 화면에 나타남
