const regfrm = document.querySelector('#registerForm');
//const userid = document.getElementById('userid'); // 수정된 부분
const passwd = document.getElementById('passwd'); // 수정된 부분
const mname = document.querySelector('#mname');
const pname = document.querySelector('#pname');
const regbtn = document.querySelector('#registerbtn');

regbtn.addEventListener('click', async (event) => {
    event.preventDefault(); // 기본 이벤트 방지 추가
    const res = await fetch('http://52.79.137.65:32324/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            mid: userid.value.trim(), // 수정된 부분
            mpwd: passwd.value.trim(), // 수정된 부분
            mname: mname.value,
            pname: pname.value
        })
    });
    const data = await res.json();
    if (res.ok) {
        alert('회원등록 성공!!');
        window.location.href = '/login/login.html';
    } else {
        alert('회원등록실패!!');
        console.log(data.detail);
    }
});
