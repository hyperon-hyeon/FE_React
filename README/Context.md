# #13 Context

---

## Context

props 전달 방식 - 부모 → 자식 클래스에게 전달시 중간의 모든 단계를 거쳐야 함

- 이 단계가 많아질수록 불필요한 코드 늘어나고 유지보수도 힘들어짐 ← props 전달되는 모든 단계의 컴포넌트에 관련 코드 넣어야 하기 때문 (prop 변경시 전부 변경해야 함)

해결 방안 ) Context

- 중간 단계 일일이 거치지 않고도 위쪽의 컴포넌트에서 아래쪽의 컴포넌트에 데이터 전달 가능 (전역적)
- 필요한 컴포넌트에만 해당 컨텍스트 사용하는 코드 작성하면 됨
- 다층 구조의 컴포넌트 사이에 편리한 데이터 공유 가능

```jsx
import { createContext, useState } from 'react'

const CountContext = createContext()

function CountProvider({ children }) {
  const [count, setCount] = useState(0)

  return (
    <CountContext value={{ count, setCount }}>
      {children}
    </CountContext>
  )
}

export { CountContext, CountProvider }
```

- Provider - 데이터(count state, 값 변경 함수) 공급하는 역할
    - 컨텍스트 적용받는 컴포넌트들은 count와 setCount 사용할 수 있게 됨
    - 프로바이더의 하위 컴포넌트들은 해당 컨텍스트가 제공하는 value props 값 변경시 모두 리렌더링
    → 한 프로바이더 안에 하위 컴포넌트들이 모두 위치하면 불필요한 렌더링 발생 잦음 → 용도별 분리
- 컨텍스트 객체와 프로바이더 컴포넌트가 객체로 묶여져서 내보내짐
