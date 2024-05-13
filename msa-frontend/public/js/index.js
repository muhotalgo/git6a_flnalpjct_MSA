

const getProductInfo = async () => {
  const res = await fetch('http://52.79.137.65:8000/products');
  if (res.ok) {
      const data = await res.json();
      return data;
  } else {
      throw new Error('상품 정보 조회 실패!');
  }
};

const displayProductInfo = (products) => {
    const productlist = document.querySelector('#product-list');

    let html = '<ul>';
    for (const p of products) {
        html += `
            <li>
                상품명: ${p.name},
                상품설명: ${p.description},
                상품가격: ${p.price},
            </li>
        `;
    }
    html += '</ul>';
    productlist.innerHTML = html;
};


// 페이지 로드시 실행
window.addEventListener('load', async() => {
    try {

        const products = await getProductInfo();
        displayProductInfo(products);
    } catch (e) {
        console.error(e);
        alert('상품 목록 조회 실패!!');
    }
});
