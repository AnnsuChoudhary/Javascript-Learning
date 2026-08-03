class Product{

    //Parameterized constructor
    //Constructor is used to initialize the object of the class
    //It's a defaut case and will always be called when an object is created
    constructor(id){
        this.id = id;
    }

    // Private method uses # to define a private method that can only be accessed within the class
    #setId(id){
        this.id = id;
        console.log('Id set to: ' + this.id);   
    }

    //Public method 
    extractId(){
        return this.id;
    }

    extraInfo(){
        return '';
    }
}


//Inheritance
class Clothing extends Product{
    constructor(id, size){
        super(id);
        this.size = size;
    }

    //Method Overriding
    extraInfo(){
        return 'Size: ' + this.size;
    }
}

class Electronics extends Product{

    constructor(id, warranty){
        super(id);
        this.warranty = warranty;
    }
    
    //Method Overriding
    extraInfo(){
        return 'Warranty: ' + this.warranty;
    }
}

const Tshirt = new Clothing(101, 'M');
const Laptop = new Electronics(102, '2 years');

// Polymorphism example: the same method name works for different subclass objects.
const products = [Tshirt, Laptop];
products.forEach(product => {
    console.log('Product ID:', product.extractId());
    console.log('Product Info:', product.extraInfo());
});

// Private method access examples
// Tshirt.#setId(102); // This will throw an error because #setId is a private method
// Tshirt.setId(102); // This will also throw an error because setId is not defined as a public method
// Tshirt.id = 102; // This will work because id is a public property

//Built-in Class : Date
const date = new Date();
console.log(date);

//inbuilt methods 
console.log(date.toLocaleTimeString());