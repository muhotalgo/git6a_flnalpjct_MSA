// 버튼을 누르면 입력이 되도록 하는 기능
var carNo = '';

function addDigit(digit) {
    if (carNo.length < 4) {
        carNo += digit;
        updateCarNoDisplay();
    }
}

function clearDigit() {
    carNo = carNo.slice(0, -1);
    updateCarNoDisplay();
}

function updateCarNoDisplay() {
    var carNoDisplay = document.getElementById("cno");
    carNoDisplay.innerText = carNo.padEnd(4, '-');
}

// 할인권을 선택하여 적용하는 함수
function applyDiscount(discount) {
    var selectedDiscountBtn = document.getElementById("selectedDiscountBtn");
    selectedDiscountBtn.innerText = "선택된 할인권: " + discount;
    selectedDiscountBtn.style.display = "block";
}

function submitCarNo() {
    if (carNo.length === 4) {
        fetch(`http://52.79.137.65:32323/discount/${encodeURIComponent(carNo)}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('차량을 찾을 수 없습니다.');
                }
                return response.json();
            })
            .then(data => {
                console.log(data);
                if (Array.isArray(data) && data.length > 0) {
                    if (data.length === 1) {
                        const carInfo = {
                            cno: data[0].cno,
                            ent_time: data[0].ent_time,
                            ptime: data[0].ptime,
                            ent: data[0].ent
                        };
                        displayCarInfo(carInfo);
                    } else {
                        showCarSelectionModal(data);
                    }
                } else {
                    console.log("차량 정보가 없습니다.");
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert(error.message);
            });
    } else {
        alert("4자리의 차량번호를 입력하세요.");
    }
}

function showCarSelectionModal(cars) {
    var modal = document.getElementById("myModal");
    var carList = document.getElementById("carList");
    carList.innerHTML = ''; // 목록 초기화
    cars.forEach(car => {
        var listItem = document.createElement('li');
        var link = document.createElement('a');
        link.href = "javascript:void(0)";
        link.innerText = car.cno;
        // 클릭 이벤트 핸들러 등록
        link.onclick = function () {
            selectCar(car.cno); // 클릭된 차량 번호를 전달
        };
        listItem.appendChild(link);
        carList.appendChild(listItem);
    });
    modal.style.display = "block";

    // 모달이 열릴 때마다 이전에 등록된 이벤트 핸들러 삭제
    modal.addEventListener('shown.bs.modal', function () {
        carList.querySelectorAll('a').forEach(link => {
            link.removeEventListener('click', selectCar);
        });
    });
}

function selectCar(carNo) {
    fetch(`http://52.79.137.65:32323/discount-by-number/${encodeURIComponent(carNo)}`) // 클릭된 차량 번호를 전달
        .then(response => {
            if (!response.ok) {
                throw new Error('차량을 찾을 수 없습니다.');
            }
            return response.json();
        })
        .then(carInfo => {
            console.log("Selected car info:", carInfo); // 선택한 차량의 정보 출력
            displayCarInfo(carInfo); // 선택한 차량 정보 표시
            closeModal(); // 모달 닫기
        })
        .catch(error => {
            console.error('Error:', error);
            alert(error.message);
        });
}

function closeModal() {
    var modal = document.getElementById("myModal");
    modal.style.display = "none";
}

function submitDiscount() {
    var selectedDiscountBtn = document.getElementById("selectedDiscountBtn");
    var discount = selectedDiscountBtn.innerText.split(": ")[1];

    if (carNo !== '----') {
        fetch(`http://52.79.137.65:32323/discount/${encodeURIComponent(carNo)}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('차량을 찾을 수 없습니다.');
                }
                return response.json();
            })
            .then(data => {
                console.log(data);
                if (Array.isArray(data) && data.length > 0) {
                    var carInfo = data[0]; // 첫 번째 데이터의 차량 정보
                    updateDiscountInfo(carInfo, discount);
                } else {
                    console.log("차량 정보가 없습니다.");
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert(error.message);
            });
    } else {
        alert('차량번호를 입력해주세요.');
    }
}

function updateDiscountInfo(carInfo, discount) {
    var carNo = carInfo.cno;

    var requestUrl = `http://52.79.137.65:32323/discount/${encodeURIComponent(carNo)}/discount?disc=${encodeURIComponent(discount)}`;

    fetch(requestUrl, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(data => {
            alert(data.message);
        })
        .catch(error => console.error('Error:', error));
}


function displayCarInfo(carInfo) {
    if (carInfo) {
        const carNoElement = document.getElementById('carNo');
        const entTimeElement = document.getElementById('entTime');
        const parkTimeElement = document.getElementById('parkTime');
        const entNameElement = document.getElementById('entName');

        carNoElement.textContent = carInfo.cno || '정보 없음';
        entTimeElement.textContent = carInfo.ent_time || '정보 없음';
        parkTimeElement.textContent = carInfo.ptime || '정보 없음';
        entNameElement.textContent = carInfo.ent || '정보 없음';
    } else {
        console.error('Car info is empty or undefined.');
    }
}
