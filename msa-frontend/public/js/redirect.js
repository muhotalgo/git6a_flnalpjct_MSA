// 페이지 리디렉션 자바스크립트

// 로그인 되어있지 않으면 로그인 페이지로 리디렉션
const displayAfterLogin = () => {
   if (!localStorage.getItem('token')) {
       window.location.href = '/login.html';
       return false; // 로그인 페이지로 리디렉션될 경우 함수에서 false를 반환
   }
   return true; // 로그인 상태가 유효하면 true를 반환
};

// get user info
const getUserInfo = async () => {
    const res = await fetch('http://127.0.0.1:8020/users');
    if (res.ok) {
        const data = await res.json();
        return data;
    } else {
        throw new Error('사용자 정보 조회 실패!');
    }
};

// 로그인 된 사용자 추출
const displayUserInfo = () => {
    const userlist = document.querySelector('#user-list');
    const loguser = document.querySelector('#loguser');
    if (!userlist) {
        console.error('유저리스트가 없습니다');
        return; // 요소가 없을 경우 함수를 종료합니다.
    }
    const loggeduser = localStorage.getItem('loginuser');
    let html = '<p>';
    html += `${loggeduser}`; // 올바른 템플릿 리터럴 구문 사용
    html += '</p>';
    userlist.innerHTML = html;
    if (loguser) {
        loguser.value = loggeduser;
    }
};

// 로그인 된 사용자 추출 2
const displayUserInfo2 = () => {
    if (!userlist) {
        console.error('유저리스트가 없습니다');
        return; // 요소가 없을 경우 함수를 종료합니다.
    }
    const loggeduser = localStorage.getItem('loginuser');
    let html = '<p>';
    html += `${loggeduser}`; // 올바른 템플릿 리터럴 구문 사용
    html += '</p>';
    loguser.innerHTML = html;
};

// 페이지 로드시 실행
window.addEventListener('load', async () => {
    try {
        const isLoggedIn = displayAfterLogin();
        if (isLoggedIn) { // 로그인 상태가 유효할 경우에만 실행
            const userinfo = await getUserInfo();
            displayUserInfo();
        }
    } catch (e) {
        console.error(e);
        alert('페이지 로드 에러발생!!');
    }
});



// nav 바

// 할인적용 페이지
const PageButton1 = document.getElementById('discountPage');
// const userid = document.querySelector('#userid');

// 버튼에 클릭 이벤트 리스너를 추가합니다.
PageButton1.addEventListener('click', function() {
    // 페이지를 사용내역 페이지로 리디렉션합니다.
    window.location.href = '/login/discount.html';
})

// 시간대검색 페이지
const PageButton2 = document.getElementById('byTimePage');

// 버튼에 클릭 이벤트 리스너를 추가합니다.
PageButton2.addEventListener('click', function() {
    // 페이지를 시간대검색 페이지로 리디렉션합니다.
    window.location.href = '/login/select_cars.html';
})

// 사용내역 페이지
const PageButton3 = document.getElementById('logPage');

// 버튼에 클릭 이벤트 리스너를 추가합니다.
PageButton3.addEventListener('click', function() {
    // 페이지를 사용내역 페이지로 리디렉션합니다.
    window.location.href = '/login/coupon_log.html';
})

// 사용집계 페이지
const PageButton4 = document.getElementById('summaryPage');

// 버튼에 클릭 이벤트 리스너를 추가합니다.
PageButton4.addEventListener('click', function() {
    // 페이지를 사용내역 페이지로 리디렉션합니다.
    window.location.href = '/login/coupon_sum.html';
})

// 로그아웃 리디렉션
const logoutButton = document.getElementById('logOut');

// 버튼에 클릭 이벤트 리스너를 추가합니다.
logoutButton.addEventListener('click', function() {
    // 페이지를 사용내역 페이지로 리디렉션합니다.
    //window.location.href = './logout';
    localStorage.removeItem('token');
    //location.href = '/user.html';
    window.location.href = '/login/login.html';
})

// 회원정보수정 페이지
const mypageButton = document.getElementById('myinfo');

if (mypageButton !== null) {
    mypageButton.addEventListener('click', function() {
        window.location.href = '/login/myinfo.html';
    });
} else {
    console.error("Element with ID 'myinfo' was not found.");
}
