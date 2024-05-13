nowmth = new Date().toISOString().slice(0, 7);
nowdt = new Date().toISOString().substring(0, 10);
let mthrdo = document.querySelector('#month');
let dtrdo = document.querySelector('#date');

document.getElementById('monthInput').value = nowmth;
document.getElementById('monthInput').max = nowmth;

document.getElementById('dateInput').value = nowdt;
document.getElementById('dateInput').max = nowdt;

let tablemt = document.querySelector('.tablemth');
let tabledt = document.querySelector('.tabledt');


// 라디오 버튼 클릭 이벤트 리스너 추가
mthrdo.addEventListener('change', () => {
    document.querySelector('.mon').classList.remove('hid');
    document.querySelector('.dt').classList.add('hid');
});

dtrdo.addEventListener('change', () => {
    document.querySelector('.mon').classList.add('hid');
    document.querySelector('.dt').classList.remove('hid');
});

// 할인권 정보 전체 조회
const getSumCouponInfo = async () => {
    const res = await fetch(`http://52.79.137.65:32322/sumfind`)
    if (res.ok) {
        const data = await res.json()
        return data;
    } else {
        throw new Error('할인권 정보 조회 실패!');
    }
};

// 할인권 정보 검색 조회
const findSumCouponInfo = async (skey) => {
    const res = await fetch(`http://52.79.137.65:32322/sumfindall/${skey}`)
    if (res.ok) {
        const data = await res.json()
        return data;
    } else {
        throw new Error('할인권 정보 조회 실패!');
    }
};


// coupon sum 조회
const displayCouponSum = async (coupons, skey) => {
    const cpsums = await findSumCouponInfo(skey);
    console.log(skey);
    console.log(cpsums.length);

    const couponlist = document.querySelector('#cpsumtbody');
    let html = '';
    if (coupons.length !== 0 || cpsums.length !== 0) {
        // 보류
        // if (cpsums.length === 0){
        //     html += `
        //         <tr class="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
        //             <td class="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0 text-center" colspan="4">
        //                 쿠폰 사용 정보가 없습니다.
        //             </td>
        //         </tr>
        //     `;
        // }
        for (const s of cpsums) {
            html += `
                <tr class="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
            `;
            if (cpsums.indexOf(s) === 0) {
                html += `
                    <td id="dsctm"
                        class="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0"
                        rowspan="${cpsums.length}">
                        ${skey}
                    </td>
            `;
            }
            html += `
                    <td class="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                        ${s.disc}
                    </td>
                    <td class="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                        유료
                    </td>
                    <td class="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                        ${s.count}
                    </td>
                </tr>
            `;
        }
        for (const c of coupons) {
            html += `
                <tr class="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
            `;
            if (coupons.indexOf(c) === 0) {
                html += `
                    <td id="dsctm"
                        class="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0"
                        rowspan="${coupons.length}">
                        전체
                    </td>
            `;
            }
            html += `
                    <td class="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                        ${c.disc}
                    </td>
                    <td class="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                        유료
                    </td>
                    <td class="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                        ${c.count}
                    </td>
                </tr>
            `;
        }
    } else {
        html += `
            <tr class="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                <td class="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0 text-center" colspan="4">
                    쿠폰 사용 정보가 없습니다.
                </td>
            </tr>
        `;
    }
    html += '';
    couponlist.innerHTML = html;
};


// 페이지 로드시 실행
window.addEventListener('load', async () => {
    try {
        const coupons = await getSumCouponInfo();
        displayCouponSum(coupons, nowmth);
        console.log(coupons);
    } catch (e) {
        console.error(e);
        alert('할인권 목록 조회 실패!!');
    }
});


// 검색 기능
document.addEventListener('DOMContentLoaded', () => {
    let cpschbtn = document.querySelector("#cpschbtn");

    cpschbtn.addEventListener('click', async () => {

        let cpkey = "";
        if (mthrdo.checked) {
            cpkey = document.querySelector('#monthInput').value;
        } else if (dtrdo.checked) {
            cpkey = document.querySelector('#dateInput').value;
        } else {
            alert('올바른 값이 아닙니다.');
        }


        if (cpkey) {
            try {
                const coupons = await getSumCouponInfo();
                displayCouponSum(coupons, cpkey);
                console.log(coupons);
            } catch (e) {
                console.error(e);
                alert('할인권 목록 조회 실패!!');
            }
        } else {
            alert('검색어를 입력해주세요.');
        }
    });
});
