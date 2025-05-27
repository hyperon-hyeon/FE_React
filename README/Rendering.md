# #3 Rendering

---

## 조건부 렌더링

`bool? 참 반환값: 거짓 반환값` - 앞의 boolean이 참일 경우 앞의 것 실행, 거짓일 경우 뒤의 것 실행

`{true && 문자열}` - 길이가 0이 아닌 문자열은 true로 인정되는 truthy (반대는 falsy)

- `{hasMessages && <h2>You have new messages!</h2>}` - 렌더링됨 (hasMessages = true일 경우)
    - 자바 스크립트에서 AND 앞뒤로 truthy가 오면 뒤의 값 반환
    - 앞의 값이 참이면 뒤의 JSX 요소가 그대로 반환되어 화면에 렌더링됨, 아니면 나타나지 않음
    - `{message && <p>Message: {message}</p>}` - message가 빈 문자열이라면 렌더링 X

`{true ?? null일 경우 반환값}` - null 병합 연산자 - null, defined만 뒤의 값 반환

- `Message: {message ?? <em>No message</em>}` - message가 null일 경우 뒤의 값 반환

`{true || falsy일 경우 반환값}` - OR 연산자는 어떤 값이든 falsy 해당하는 것 들어오면 뒤의 값 반환

- `Message: {message || <em>Empty</em>}` - message가 falsy에 해당하는 경우 뒤의 값 반환

---

## 리스트 렌더링

- 배열 안의 각 문자열을 리스트 아이템 태그로 감싼 새 배열을 렌더링한 결과
    - 반복될 요소에 key라는 속성 설정해줘야 함
        - 리스트가 빨리 파악할 수 있도록 번호를 붙임, 겹치지 않는 고유의 값
            
            ex. `<li *key*={*index*}>{*fruit*}</li>`
            
        - 이 배열 인덱스는 배열 안의 항목들을 구분할 방법이 없을 때에만 사용됨 (id 사용 등으로 대체)
        항목의 추가 및 삭제시에도 값이 바뀌기 때문에 변경이 잦은 곳에서는 효율 떨어지거나 오류 발생 가능
- 리스트 렌더링할 때 숫자, 문자열, JSX만 렌더링 되고 boolean은 화면에 나타나지 않음
- map 메소드는 매개변수를 받아 처리하는 값을 반환하는 함수를 매개변수로 받음
    - 배열의 각 요소를 해당 함수에 넣어 실행한 결과들로 새 배열 만들어 반환
- filter 메소드는 truthy, falsy 반환하는 함수를 매개변수로 받음 → 배열의 요소들 중 해당 함수에 넣어서 참을 반환하는 요소만 담은 새 배열을 반환
    - ex. .`filter(n⇒n%2==0)` - 짝수 반환
