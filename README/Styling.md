# #4 Styling

---

## 스타일링

1. img 요소 작성
    
    ```jsx
    import React from 'react';
    import exampleImage from './assets/example.jpg';
    
    function App() {
      return (
        <div>
          <h1>이미지 예제</h1>
          <img 
    	      src={imageUrl} 
    	      alt="예시 이미지" 
    	      />
        </div>
      );
    }
    
    export default App;
    ```
    
- img 요소 작성시 중괄호 표현식도 사용 가능
- 빌드시 어떠한 파일명일지 알 수 없기 때문에 단순 문자열로 src값 작성은 불가

1. 인라인 스타일 지정
- 중괄호 표현식 안에 객체 형태로 스타일 정보 작성
    - 외부의 변수나 상수에 저장하고 쓸 수 있음
- CSS 속성명 역시 kebab case → camel case 로 변경되었음을 확인할 수 있음

```jsx
<span style={
        {
          fontWeight: "bold",
          fontStyle: "italic"
        }
      }>
        Bold & Italic
      </span>
```

1. 외부에 저장된 객체를 JSX 요소 안으로 가져와 style 속성에 적용

```jsx
function App() {
  
  const divStyle = {
    backgroundColor: 'lightblue',
    margin: '12px',
    padding: '20px',
    borderRadius: '8px'
  }

 return (
    <>
      <div style={divStyle}>
        DIV 1
      </div>
    </>
  )
}
```

- 객체 스프레딩 - 기존 객체의 속성들을 활용하여 새로운 객체 만드는 것에 사용
    - 스프레드 연산자(`…`) 사용하여 기존 객체의 속성을 새로운 객체로 가져옴 → 새 객체에 속성을 직접 작성
    
    ```jsx
    <div
            style={{
              ...divStyle,
              color: 'darkblue',
              fontWeight: 'bold',
              
            }}
          >
            DIV 2
          </div>
    ```
    

1. 외부의 CSS 파일 가져와서 사용하기
- 이 파일들은 전역으로 사용되기 때문에 동일한 클래스명을 가진 요소들은 모두 해당 스타일을 적용받음
- 규모가 커지게 되면 클래스명의 변화를 주는 것이 어려울 수 있음 → CSS에서 지원하는 module 사용
`import './ButtonA.css';` → `import styles from './ButtonA.module.css';`
    - CSS 파일명_파일명.module.css 변경시 CSS 모듈 기능 활성화
    - 컴포넌트에서는 이들을 코드에서 사용할 수 있는 자바스크립트 객체로 import
    - 클래스명을 직접 문자열로 입력하지 않고 style 객체로부터 button이라는 속성 꺼내어 사용
- 각 속성들을 콘솔에 출력해보면 각 속성들에는 해당 클래스 및 아이디의 변형된 이름들이 저장되어 있음
    - 클래스명과 아이디를 고유한 이름들로 변형함으로써 다른 모듈에 속한 것들과 겹치지 않도록 함
