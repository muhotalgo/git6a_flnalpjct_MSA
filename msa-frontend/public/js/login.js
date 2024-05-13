const loginfrm = document.querySelector('#loginfrm');
const userid = document.querySelector('#userid');
const passwd = document.querySelector('#passwd');
const loginbtn = document.querySelector('#loginbtn');

// 로그인버튼 이벤트 추가
loginbtn.addEventListener('click', async (e) => {
    e.preventDefault(); // 폼의 기본 제출 행동을 막습니다.

    // 입력 값 검증
    if (!userid.value.trim() || !passwd.value.trim()) {
        alert('ID와 비밀번호를 입력하세요.');
        return; // 입력이 비어있으면 여기서 함수 실행을 중단
    }

    try {
        const res = await fetch('http://52.79.137.65:32324/login', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                mid: userid.value,
                mpwd: passwd.value
            })
        });
        const data = await res.json();

        if (res.ok) {
            //console.log(data.access_token);
            localStorage.setItem('token', data.access_token);
            localStorage.setItem('loginuser', userid.value);
            //localStorage.setItem('loginname', mname.value);
            // 클라이언트에 저장하는거라 보안에 구멍이 생길 수 있음, HTTPS 접속하게 해야함
            alert('로그인 성공!!');
            window.location.href = '/login/discount.html';
        } else {
            alert('로그인에 실패하였습니다. 아이디 혹은 비밀번호를 확인하세요.');
            console.log(data.detail || data.message); // 실패 이유 출력
        }
    } catch (error) {
        console.error('서버와의 통신 중 문제가 발생했습니다. 에러코드 1', error);
        alert('서버와의 통신 중 문제가 발생했습니다. 에러코드 1');
    }
});
