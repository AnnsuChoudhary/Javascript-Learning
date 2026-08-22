//Error handling
//Error handling is important to catch errors and handle them gracefully

//main error catch code

xhr.addEventListener('error', () => {
    console.error('Request failed');
});



//Error handling with promises
//We use catch to handle errors in promises

function loadProductsFetch() {
    const promise = fetch('https://errorsupersimplebackend.dev/products')
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
        }).catch((error) =>  { //Catch error 
            console.error('Could not load products:', error);
        }); 

    return promise;
}

loadProductsFetch();



// Error handling with async/await
// Use try/catch to handle errors from awaited promises.

async function loadProductsAsync() {
    try {
        console.log('Loading products...');

        const response = await fetch('https://errorsupersimplebackend.dev/products');
        if (!response.ok) {
            throw new Error(`Request failed: ${response.status}`);
        }

        const productsData = await response.json();
        console.log('Loaded products:', productsData);
        return productsData;
    } catch (error) {
        console.error('Could not load products:', error.message);
        return [];
    }
}

loadProductsAsync();