// 보류
// nowmth = new Date().toISOString().slice(0, 7);
// nowdt = new Date().toISOString().substring(0, 10);
// document.querySelector('#dateInput').value = nowdt;
// document.querySelector('#dateInput').max = nowdt;

let schbtn = document.querySelector("#schbtn");

// 입차 내역 검색 조회
const findCarInfo = async (skey) => {
    const res = await fetch(`http://52.79.137.65:32323/discount/${skey}`)
    if (res.ok) {
        const data = await res.json()
        return data;
    } else {
        throw new Error('할인권 정보 조회 실패!');
    }
};


// coupon log 조회
const displayCarInfo = (cars) => {

    // carlist 조회
    const carlist = document.querySelector('#slctcartb');
    let html = '';
    if (cars.length !== 0) {
        for (const c of cars) {
            console.log(c);
            html += `
                <tr class="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                    <td class="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0 hidden md:table-cell">${c.cno}</td>
                    <td class="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0 hidden md:table-cell">${c.ent_time}</td>
                    <td class="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0 hidden md:table-cell">${c.ent}</td>
                </tr>
            `;
        }
    } else {
        html += `
            <tr class="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                <td class="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0 text-center" colspan="3">
                    입차 내역이 없습니다.
                </td>
            </tr>
        `;
    }
    html += '';
    carlist.innerHTML = html;
};


// 페이지 로드시 실행
window.addEventListener('load', () => {
    try {
        const cars = [];
        displayCarInfo(cars);
    } catch (e) {
        console.error(e);
        alert('입차 목록 조회 실패!!');
    }
});

// 검색 기능
schbtn.addEventListener('click', async () => {
    let cpkey = document.querySelector('#cnoInput').value;

    if (cpkey) {
        try {
            const cars = await findCarInfo(cpkey);
            displayCarInfo(cars);
        } catch (e) {
            console.error(e);
            alert('할인권 목록 조회 실패!!');
        }
    } else {
        alert('검색어를 입력해주세요.');
    }
});
