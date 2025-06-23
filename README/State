# #7 State

---

App 컴포넌트는 Main.jsx의 StrictMode 안에서 사용됨

- 콘솔에서 특정 로그가 두번씩 출력되는 원인
- 이를 주석처리하거나 삭제하여 비활성화 하면 한 번만 출력됨

```jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  //<StrictMode>
    <App />
  //</StrictMode>,
)
```

---

## 컴포넌트의 리렌더링

**컴포넌트가 리렌더링되는 경우 - state 변경, props 변경, 부모의 리렌더링**

- 어떤 컴포넌트의 state가 변경될 때 해당 컴포넌트가 리렌더링됨
- 렌더링 사용 여부와는 상관없이 컴포넌트의 State가 변경되면 해당 컴포넌트가 리렌더링 됨
- 자식 컴포넌트의 경우 부모로부터 전달받은 props가 변경될 때에도 리렌더링됨
- 부모가 리렌더링 되면 자식도 리렌더링됨 / 부모의 컴포넌트는 해당 state와 무관할 경우 리렌더링 X

부모 컴포넌트에 있는  state 값을 자식 컴포넌트에서 변경할 수 있도록 하는 방법

- **setter 함수를 props로 자식 컴포넌트에게 넘겨줌** (함수도 데이터로 취급되기 때문에 가능)

```jsx
const convertedTemp = unit === "Celsius"
    ? (temperature * 9/5 + 32).toFixed(1)
    : ((temperature - 32) * 5/9).toFixed(1)
```

- setter 함수도 아니고 상수임에도 변할 수 있는 이유
    - state 값이 변할 때마다 화면이 리렌더링되기 때문
    - unit의 값이 바뀔 때 리렌더링에 의해 app 컴포넌트도 다시 실행되므로 상수가 다른 값으로 초기화

---

## 상태 끌어올리기

**여러 컴포넌트가 state를 공유할 때, 이를 부모 컴포넌트로 끌어올리고 변경 함수를 props로 전달하는 패턴**

같은 form 안의 여러개 state 효율적으로 다루는 법

- 객체의 속성을 수정하는 방법으로는 화면에 리렌더링되지 않음 (배열 관련 예제 참고)
    - 데이터의 변화를 화면에 반영하려면 state 담당하는 변경 함수 사용하고  이 함수의 인자로 속성들의 값이 바뀐 새 객체를 넣어줘야 함
- **여러 개의 state 하나로 묶어야 함**
    - formData 객체에 각각 키로 접근하는 방식으로 사용됨

- 기존 - 각각의 변경 함수 사용
    
    ```jsx
    const [username, setUsername] = useState('')
      const [isSubscribed, setSubscribed]
       = useState(false)
      const [role, setRole] = useState('user')
      const roles = ['user', 'admin', 'guest']
    ```
    

- 수정 - 하나의 변경 함수 사용
    
    ```jsx
    const [formData, setFormData] = useState({
        username: '',
        isSubscribed: false,
        role: 'user'
      })
      const roles = ['user', 'admin', 'guest']
    
      const handleChange = (e) => {
        const { name, value, type, checked }
         = e.target
        setFormData({
          ...formData,
          [name]:  type === 'checkbox' ? checked : value
        })
      }
      
      //return 내부
    	<label>
            <input
              type="checkbox"
              name="isSubscribed"
              checked={formData.isSubscribed}
              onChange={handleChange}
            />
            Subscribe
          </label>
    ```
    
- 예제에서는 handleChange 함수가 변경 함수로 사용됨
    - target 객체로부터 값들을 객체 디스트럭쳐링으로 가져옴
        - 이름 뿐 아니라 해당 요소의 타입까지 객체 속성으로 들어옴
    - 바꿀 속성의 이름 name으로 입력한 문자열로 식별하여 키로 사용, 콜론 다음으로는 변경값 입력 
    → 3항 연산자 활용
- setFormData 함수에 인자로 넣어 실행할 새 객체 안에 기존 formData의 항목들을 객체 스프레딩으로 가져옴
    - 기존에 값을 변경하고 있는 속성들은 유지해야 하기 때문
