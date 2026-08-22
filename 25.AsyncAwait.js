async function loadpage(){

    console.log('Loading page...');

    await loadProductsFetch();

    return 'value';
}

// shortForm of ->

/*
function loadpage() {

    return new Promise((resolve) =>{
        console.log('Loading page...');
        resolve();
    }).then(() => {
        return loadProductsFetch();
    }).then(() => {
        return new Promise((resolve) => {
            resolve('value');
        });
    });
}
*/

loadpage().then((value)=>{
    console.log('next Step');
    console.log(value);
})