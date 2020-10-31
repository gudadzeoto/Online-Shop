// პროდუქტების მასივი
var products = [
  ['კომპიუტერი', 1900],
  ['ლეპტოპი', 2500],
  ['პლანშეტი', 150],
  ['მობილური ტელეფონი', 900],
  ['კომპიუტერული ნაწილები', 100]
]

var total = 0

// პროდუქტების მშობელი ობიექტი
var productsObj = document.getElementById('productstlist')

// ყველა პროდუქტის ობიექტის ჩამატება მშობელ ობიექტში
for (var i = 0; i < products.length; i++) {
  var productId = i
  var product = products[productId]
  var productName = product[0]
  var productPrice = product[1]

  var productObj = ''
  productObj += '<tr id=`${product}-${productId}`>'
  productObj += '<td><span id=`${id}-${productId}`>' + (productId + 1) + '</span></td>'
  productObj += '    <td><span id=`${name}-${productId}`>' + productName + '</span></td>'
  productObj += '    <td><span id=`${price}-${productId}`>' + productPrice + '</span></td>'
  productObj += '    <td><button class='btn btn-primary' id='id-' + productId + '' onclick='addcart(' + productId + ')'>კალათაში დამატება</button></td>'
  productObj += '</tr>'

  productsObj.innerHTML += productObj
}

// კალათაში დამატების ფუნქცია
function addcart (productID) {
  var productName = document.getElementById('name-' + productID).innerHTML
  var productPrice = document.getElementById('price-' + productID).innerHTML
  var cartObj = document.getElementById('cartlist')

  if (!document.getElementById('cart-product-' + productID)) {
    var productObj = ''
    productObj += '<tr id='cart-product-' + productID + ''>'
    productObj += '    <td><span id='cart-ID-' + productID + ''>' + (productID + 1) + '</span></td>'
    productObj += '    <td><span id='cart-name-' + productID + ''>' + productName + '</span></td>'
    productObj += '    <td><span id='cart-price-' + productID + ''>' + productPrice + '</span></td>'
    productObj += '    <td><input class='form-control' type='number' id='cart-quantity-' + productID + '' value='1' min='1' onchange='cartCalculate(this, ' + productID + ')' onfocus='this.oldvalue = +this.value;'></td>'
    productObj += '    <td><span id='cart-total-' + productID + ''>' + productPrice + '</span></td>'
    productObj += '    <td><button class='btn btn-danger' id='cart-id-' + productID + '' title='კალათიდან ამოშლა' onclick='removecart(' + productID + ')'><i class='fas fa-times'></i></button></td>'
    productObj += '</tr>'

    cartObj.innerHTML += productObj

    document.getElementById('cart-quantity-' + productID).oldvalue = +document.getElementById('cart-quantity-' + productID).value

    total = total + +productPrice
    updateTotal()
  }
}

// კალათიდან ამოშლის ფუნქცია
function removecart (productID) {
  if (confirm('ნამდვილად გსურთ კალათიდან წაშლა ?')) {
    var productTotal = document.getElementById('cart-total-' + productID).innerHTML
    total = total - +productTotal
    updateTotal()

    document.getElementById('cart-product-' + productID).outerHTML = ''
  }
}

// კალათაში დაანგარიშების ფუნქცია
function cartCalculate (input, productID) {
  var productPrice = document.getElementById('cart-price-' + productID).innerHTML
  var productQuantity = document.getElementById('cart-quantity-' + productID).value
  var productTotal = productPrice * productQuantity

  document.getElementById('cart-total-' + productID).innerHTML = productTotal

  var oldPrice = +input.oldvalue * +productPrice
  console.log('old price: ' + oldPrice)
  console.log('old price val: ')
  console.log(input.oldvalue)

  var newPrice = +input.value * +productPrice
  console.log('new price: ' + newPrice)
  console.log('new price val: ')
  console.log(input.value)

  total = total - oldPrice + newPrice
  updateTotal()

  input.oldvalue = +input.value
}

function updateTotal () {
  document.getElementById('totalPrice').innerHTML = total
}
