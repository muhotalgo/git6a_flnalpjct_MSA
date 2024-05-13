const regbtn = document.querySelector('#regbtn');

const getCouponInfo = async () => {
    const res = await fetch(`http://52.79.137.65:32322/coupons`)
    if (res.ok) {
        const data = await res.json()
        return data;
    } else {
        throw new Error('할인권 정보 조회 실패!');
    }
};

// 전체 db 조회
const displayCouponInfo = (coupons) => {
    const couponlist = document.querySelector('#coupon-list');
    let html = '<ul>';
    for (const c of coupons) {
        html += `
            <li>
              차번호: ${c.cno},
              쿠폰이름: ${c.disc},
              쿠폰등록일: ${c.disc_time},
              쿠폰사용여부: ${c.usec}
            </li>
        `;
    }
    html += '</ul>';
    couponlist.innerHTML = html;
};

// 페이지 로드시 실행
window.addEventListener('load', async () => {
    try {
        const coupons = await getCouponInfo();
        displayCouponInfo(coupons);
    } catch (e) {
        console.error(e);
        alert('할인권 목록 조회 실패!!');
    }
});

// 할인권 버튼 이벤트 추가
regbtn.addEventListener('click', async () => {
    const cpfrm = document.querySelector('#cpfrm');
    const cno = document.querySelector('#regcno');
    const disc = document.querySelector('#regdisc');

    try {
        const res = await fetch('http://52.79.137.65:32322/coupons',
            {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    cno: cno.value,
                    disc: disc.value
                })
            });

        const data = await res.json();
        if (res.ok) {
            alert('할인권 등록 성공!!');
        } else {
            alert('할인권 등록 실패!!');
            console.log(data.detail);
        }
    } catch (error) {
        console.error('fetch 오류:', error);
        alert('서버와의 통신 중 오류가 발생했습니다.');
    }
});

