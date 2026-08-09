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

