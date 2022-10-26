// http://localhost:3000/items

const searchInput = document.querySelector('#search');
const productsDOM = document.querySelector('.products-center');
const buttons = document.querySelectorAll('.btn');


let allProductsData = [];
const filters = {
    searchItem : '',
};



document.addEventListener('DOMContentLoaded',()=>{

    axios
    .get('http://localhost:3000/items')
    .then((res)=>{
        allProductsData = res.data;
        // render products on DOM
        renderProducts(res.data,filters);
    })
    .catch((err)=>{
        console.log("Error...!")
    });
});


function renderProducts(_products,_filters){

    const filteredProducts = _products.filter((p) =>{
        return p.title.toLowerCase().includes(_filters.searchItem.toLowerCase());
    });

    productsDOM.innerHTML = "";

    console.log(filteredProducts);
    // render to DOM
    filteredProducts.forEach((item)=>{

        const productsDiv = document.createElement('div');

        productsDiv.classList.add('product');
        productsDiv.innerHTML = 
        `<div class="img-container">
        <img class="product-img" src=${item.image}>
        </div>
        <div class="product-desc">
        <p class="product-price">${item.price}$</p>
        <p class="product-title">${item.title}</p>
        </div>`;
        productsDOM.appendChild(productsDiv);
    });
};


searchInput.addEventListener('input',(e)=>{
    filters.searchItem = e.target.value;
    renderProducts(allProductsData,filters);
});




// filter based on groups :

buttons.forEach(btn =>{
    btn.addEventListener('click',(e)=>{
        const filteredBtn =  e.target.dataset.filter;
        filters.searchItem = filteredBtn;
        console.log(filteredBtn)
        renderProducts(allProductsData,filters)
    })
})