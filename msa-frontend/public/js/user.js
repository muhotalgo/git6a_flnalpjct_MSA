const regbtn = document.querySelector('#regbtn');
const loginbtn = document.querySelector('#loginbtn');


const getUserInfo = async () => {
  const res = await fetch('http://52.79.137.65:8030/member');
  if (res.ok) {
      const data = await res.json();
      return data;
  } else {
      throw new Error('사용자 정보 조회 실패!');
  }
};

const displayUserInfo = (users) => {
    const userlist = document.querySelector('#user-list');

    let html = '<ul>';
    for (const u of users) {
        html += `
            <li>
                사용자 아이디: ${u.userid},
                사용자 이름: ${u.name},
                사용자 이메일: ${u.email},
                등록일: ${u.regdate},
            </li>
        `;
    }
    html += '</ul>';
    userlist.innerHTML = html;
};

// 페이지 로드시 실행
window.addEventListener('load', async() => {
    try {

        const users = await getUserInfo();
        displayUserInfo(users);
    } catch (e) {
        console.error(e);
        alert('사용자 목록 조회 실패!!');
    }
});

// 회원가입버튼 이벤트 추가

regbtn.addEventListener('click', async ()=> {
    const userfrm = document.querySelector('#userfrm');
    const userid = document.querySelector('#userid');
    const passwd = document.querySelector('#passwd');
    const name = document.querySelector('#name');
    const email = document.querySelector('#email');

    const res = await fetch('http://52.79.137.65:8030/users',
        {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userid: userid.value,
                    passwd: passwd.value,
                    name: name.value,
                    email: email.value
                })
        });
    const data = await res.json();
    if (res.ok) {
        alert('회원등록 성공!!');
    } else {
        alert('회원등록실패!!');
        console.log(data.detail);
    }
});

// 로그인버튼 이벤트 추가
loginbtn.addEventListener('click', async ()=> {
    const loginfrm = document.querySelector('#loginfrm');

    const userid = document.querySelector('#uid');
    const passwd = document.querySelector('#pwd');
    const res = await fetch('http://52.79.137.65:8030/login',
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                userid: userid.value,
                passwd: passwd.value
            })
        });
    const data = await res.json();
    if (res.ok) {
        alert('로그인 성공!!');
    } else {
        alert('로그인 실패!!');
        console.log(data.detail);
    }

});
