(function() {
    const productsWrapper = document.querySelector('.wrapper');

    const baseUrl = 'http://localhost:3000/';
    const getProducts = () => {
        // const token = sessionStorage.getItem('token');
        const url = `${baseUrl}products`;
        fetch(url)
            .then(res => {
                if (res.status === 200) {
                    return res.json();
                }
                throw new Error('Cannot get products');
            })
            .then(data => {
                data.products.forEach(product => {
                    const markup = `
                    <div class="products" id="${product._id}">
                        <img src="${baseUrl}${product.productImage}" alt="${product.name}" class="product-image">
                        <h4 class="product-title">${product.name}</h4>
                        <p class="product-price"><span class="currency">$</span><span class="amt">${product.price}</span></p>
                    </div>
                    `;
                    productsWrapper.insertAdjacentHTML('beforeend', markup);
                });
            })
            .catch(error => {
                console.log(error);
            });
    };
    
    const isLoggedIn = () => {
        const token = sessionStorage.getItem('token');
        if (token) {
            // console.log('is logged in');
            getProducts();
        } else {
            window.location.replace('/login.html');
        }
    };
    
    window.addEventListener('load', isLoggedIn);
})();