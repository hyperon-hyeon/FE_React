# #1 Creating a React project

---

## 프로젝트 생성하기

terminal - `npm create vite@latest` 입력

- 프로젝트 파일 이름 지정 → 프레임 워크 선택 → 사용할 언어 선택 → 생성 완료
- 다른 방법으로 프로젝트 생성할 경우 내부 구성이 다름

생성되어 있는 파일

- css, html, gitignore, eslint.config.js, package.json, readme.md, vite.config.js
    - gitignore - 프로젝트 진행 상황 중간에 저장하는 과정에서 타임캡슐에 넣지 않을 파일들의 목록
        - 자동생성 되거나 보안 문제로 제외시켜야 하는 경우에 활용
    - eslint - 워드프로세스에서 맞춤법 검사기에 관한 설정에 해당
    - vite.config.js - 프로젝트 생성시 사용했던  vite의 설정 파일
    - package.json - 프로젝트 자체에 대한 설정

필요한 라이브러리 설치

- package.json  내부에서 언급한 라이브러리를 설치해야 함
    - dependencies / devDependencies - 설치해야할 라이브러리들
        - dependencies - 실제 사용자들이 해당 웹페이지 이용시 사용되는 라이브러리
        - devDependencies - 개발과정에서 테스트나 빌드에 사용되는 라이브러리들
        

⇒ `npm install` 로 설치 → 설치하면 node_modules 파일에 저장됨을 확인할 수 있음

---

## 프로젝트  명령어 사용하기

package.json 의 scripts 살펴보기 → dev, build, lint, preview 가 자주 사용되는 명령임

- 어떤 종류의 node.js인지에 따라 달라짐

```json
"scripts": {
    "dev": "vite",
    "build": "vite build",
    "lint": "eslint .",
    "preview": "vite preview"
  }
```

**프로젝트 명령어를 사용하는 방법**

- 터미널 사용 가능
- npm run/yarn(패키지 매니저) + 명령어
1. dev - 개발과정에 사용 (작성코드 실시간 반영 확인)
    
    ```jsx
    npm run dev
    
    > first-project@0.0.0 dev
    > vite
    
      VITE v6.3.5  ready in 404 ms
    
      ➜  Local:   http://localhost:5173/
      ➜  Network: use --host to expose
      ➜  press h + enter to show help
    h
    
      Shortcuts
      press r + enter to restart the server
      press u + enter to show server url
      **press o + enter to open in browser //제일 많이 사용할 예정**
      press c + enter to clear console
      press q + enter to quit
    ```
    
2. build - 개발 완료 후 포장 (서버에 올려서 웹 페이지로 배포될 파일들로 코드를 모아 컴파일)
    - build의 결과 dist 폴더가 생성됨을 확인할 수 있음
        - 폴더 안 파일명 뒤에 랜덤한 알파벳들은 파일 변경 여부를 판별하기 위한 해시값임
    - 해당 웹페이지를 가장 효율적으로 실행하기 적합한 형태로 압축하는 과정 포함
        - dist 파일 속 js, css 등의 파일은 불친절한 형태로 작성되어 있음 (개발자가 작업X)

1. preview - 시제품 확인 (배포 전 빌드된 파일 점검)
    
    ```jsx
    	npm run preview 
    
    > first-project@0.0.0 preview
    > vite preview
    
      ➜  Local:   http://localhost:4173/
      ➜  Network: use --host to expose
      ➜  press h + enter to show help
    h
    
      Shortcuts
      press o + enter to open in browser
      press q + enter to quit
    ```
    
    **localhost:1234**
    
    - [localhost](http://localhost) - 프로그램이 실행되고 있는 컴퓨터 (절대좌표에 꽂힌 팻말)
        - 기본적으로 127.0.0.1 주소 가리키도록 설정됨 (절대좌표)
    - 1234 - 포트 (앞의 주소가 가리키는 건물의 문 번호)
        - 같은 서버에서도 많은 서비스 실행 가능 → 제공하는 서비스마다 할당된 포트로 접속하도록 함
        - 5173 - 개발 중인 웹페이지 실시간 확인 용도 (`npm run dev`)
        - 4173 - 빌드된 결과를 테스트하는 용도로 설정 (`npm run preview`)
    

---

## 프로젝트 살펴보기

npm run dev 실행하여 본 페이지는 index.html과 다름


- index.html 코드 확인 결과

```jsx
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Vite + React</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>

```

- Vite가 index.html 파일을 작성된 그대로가 아닌 정해진 방식으로 가공하여 서빙함을 추측할 수 있음
- 개발자모드로 확인시 HTML 문서에는 없던 요소가 DOM에 들어있음을 확인할 수 있음 → JSX에 의해 동적으로 만들어져 삽입된 것

- 페이지 소스 보기를 통하여 확인한 결과

```jsx

<!doctype html>
<html lang="en">
  <head>
    <script type="module">import { injectIntoGlobalHook } from "/@react-refresh"
injectIntoGlobalHook(window);
window.$RefreshReg$ = () => {};
window.$RefreshSig$ = () => (type) => type;</script>

    <script type="module" src="/@vite/client"></script>

    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Vite + React</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>

```

함수를 컴포넌트로 구분되게 하는 요소

1. 함수의 이름 대문자로 시작
2. JSX로 작성된 태그 반환

```jsx
//Main.jsx 파일 일부
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App /> //APP이라는 컴포넌트 삽입 -> 이후 index.html에서 div 태그 안으로 렌더링됨
  </StrictMode>,
)

```