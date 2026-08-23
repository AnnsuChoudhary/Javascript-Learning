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

//We can manually throw errors in our code to handle specific cases.
//For that we use "throw" 


async function loadProductsAsync() {
    try {
        throw new Error('error1');  // Always throw Error objects
        
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


//Promise doesn't work with future errors, so we need to handle them with try/catch in async/await functions.   
//we use another parameter in Promise that is reject

function validatePayment(amount) {
    return new Promise((resolve, reject) => {
        if (amount <= 0) {
            reject(new Error('Amount must be greater than 0'));
        } else {
            resolve({ status: 'paid', amount: amount });
        }
    });
}

validatePayment(100)
    .then((payment) => console.log('Payment:', payment))
    .catch((error) => console.error('Payment error:', error.message));

    