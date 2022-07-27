//if  propertyname and value comes from a variable with same we can use shorthand syntax
const myname = 'Megha',
const UserAge = 27,
const user = {
    myname,
    age: UserAge,
    location:'New York'
}

//destructuring of object

const product = {
    label: 'Red notebook',
    price: 3,
    stock: 201,
    salePrice: undefined

}
//creating a variable with values of that property
//const label = product.label
const {label,stock} = product
console.log(label)
console.log(stock)

//renaming a property
const {price: productprice, stock}=product
console.log(productprice)

//default value for a property that does not exist
const {rating=5, stock} = product

//destructure properties in parameters of function
