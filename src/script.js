// პროდუქტების მასივი
const products = [
    ["კომპიუტერი", 1900],
    ["ლეპტოპი", 2500],
    ["პლანშეტი", 150],
    ["მობილური ტელეფონი", 900],
    ["კომპიუტერული ნაწილები", 100]
];

let total = 0;

// პროდუქტების მშობელი ობიექტი
const productsObj = document.getElementById("productstlist");

// ყველა პროდუქტის ობიექტის ჩამატება მშობელ ობიექტში
for (let i = 0; i < products.length; i++) {
    let productId = i;
    let product = products[productId];
    let productName = product[0];
    let productPrice = product[1];

    let productObj = '';
    productObj += '<tr id="product-' + productId + '">';
    productObj += '    <td><span id="id-' + productId + '">' + (productId + 1) + '</span></td>';
    productObj += '    <td><span id="name-' + productId + '">' + productName + '</span></td>';
    productObj += '    <td><span id="price-' + productId + '">' + productPrice + '</span></td>';
    productObj += '    <td><button class="btn btn-primary" id="id-' + productId + '" onclick="addcart(' + productId + ')">კალათაში დამატება</button></td>';
    productObj += '</tr>';

    productsObj.innerHTML += productObj;
}

// კალათაში დამატების ფუნქცია
function addcart(productID) {
    const productName = document.getElementById("name-" + productID).innerHTML;
    const productPrice = document.getElementById("price-" + productID).innerHTML;
    const cartObj = document.getElementById("cartlist");

    if (!document.getElementById("cart-product-" + productID)) {
        let productObj = '';
        productObj += '<tr id="cart-product-' + productID + '">';
        productObj += '    <td><span id="cart-ID-' + productID + '">' + (productID + 1) + '</span></td>';
        productObj += '    <td><span id="cart-name-' + productID + '">' + productName + '</span></td>';
        productObj += '    <td><span id="cart-price-' + productID + '">' + productPrice + '</span></td>';
        productObj += '    <td><input class="form-control" type="number" id="cart-quantity-' + productID + '" value="1" min="1" onchange="cartCalculate(this, ' + productID + ')" onfocus="this.oldvalue = +this.value;"></td>';
        productObj += '    <td><span id="cart-total-' + productID + '">' + productPrice + '</span></td>';
        productObj += '    <td><button class="btn btn-danger" id="cart-id-' + productID + '" title="კალათიდან ამოშლა" onclick="removecart(' + productID + ')"><i class="fas fa-times"></i></button></td>';
        productObj += '</tr>';

        cartObj.innerHTML += productObj;

        document.getElementById("cart-quantity-" + productID).oldvalue = +document.getElementById("cart-quantity-" + productID).value;

        total = total + +productPrice;
        updateTotal();
    }
}

// კალათიდან ამოშლის ფუნქცია
function removecart(productID) {
    if (confirm('ნამდვილად გსურთ კალათიდან წაშლა ?')) {
        const productTotal = document.getElementById('cart-total-' + productID).innerHTML;
        total = total - +productTotal;
        updateTotal();

        document.getElementById('cart-product-' + productID).outerHTML = '';
    }
}

// კალათაში დაანგარიშების ფუნქცია
function cartCalculate(input, productID) {
    const productPrice = document.getElementById('cart-price-' + productID).innerHTML;
    const productQuantity = document.getElementById('cart-quantity-' + productID).value;
    let productTotal = productPrice * productQuantity;

    document.getElementById('cart-total-' + productID).innerHTML = productTotal;

    let oldPrice = +input.oldvalue * +productPrice;
    console.log('old price: ' + oldPrice);
    console.log('old price val: ');
    console.log(input.oldvalue);

    let newPrice = +input.value * +productPrice;
    console.log('new price: ' + newPrice);
    console.log('new price val: ');
    console.log(input.value);

    total = total - oldPrice + newPrice;
    updateTotal();

    input.oldvalue = +input.value;
}

function updateTotal() {
    document.getElementById('totalPrice').innerHTML = total;
}
