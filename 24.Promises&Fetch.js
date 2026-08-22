// Promises flatten's our code 
new Promise((resolve) => {
    loadProducts(() => {
        resolve();
    });

}).then(() => {
    return new Promise((resolve) =>
        loadCart(() => {
            resolve();
        })
    );

}).then(() => {
    renderOrderSummary();
    renderPaymentSummary();
});


//Callbacks make the code more complex and nested for large projects 
loadProducts(() => {
    loadCart(() => {
        renderOrderSummary();
        renderPaymentSummary();
    });
});


//practice of Promises
function loadProducts(callback) {
    // simulate async product loading
    setTimeout(() => {
        console.log('Simulated products loaded');
        if (typeof callback === 'function') callback();
    }, 300);
}

new Promise((resolve) =>{
    loadProducts(() => {
        resolve();
    });
}).then(() => {
    console.log('Products loaded successfully');
});

// Promise.all lets us run multiple async tasks in parallel and wait for all of them to complete before proceeding
Promise.all([
    new Promise((resolve) => {
        setTimeout(() => resolve('Products loaded'), 300);
    }),
    new Promise((resolve) => {
        setTimeout(() => resolve('Cart loaded'), 500);
    })
]).then((results) => {
    console.log(results);
    console.log('All async tasks completed');
});


//Fetch

//Fetch is better way to make HTTP request 

class Product {
    constructor(productDetails) {
        Object.assign(this, productDetails);
    }
}

class Clothing extends Product {}

let products = [];

function loadProductsFetch() {
    const promise = fetch('https://supersimplebackend.dev/products')
        .then((response) => {
            if (!response.ok) {
                throw new Error(`Request failed: ${response.status}`);
            }
            return response.json();
        })
        .then((productsData) => {
            products = productsData.map((productDetails) => {
                if (productDetails.type === 'clothing') {
                    return new Clothing(productDetails);
                }

                return new Product(productDetails);
            });

            console.log('Loaded products');
            return products;
        });

    return promise;
}

loadProductsFetch().catch((error) => {
    console.error('Could not load products:', error);
});
// const xhr = new XMLHttpRequest();

// xhr.addEventListener('load', () => {
//     console.log(xhr.response);
// });

// xhr.open('GET', 'https://supersimplebackend.dev/documentation');
// xhr.send();

