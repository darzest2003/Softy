/*====================================
SOFTY COSMETICS
script.js
Part 1
====================================*/

//=====================
// Sidebar
//=====================

function openMenu() {
    document.getElementById("sidebar").classList.add("active");
}

function closeMenu() {
    document.getElementById("sidebar").classList.remove("active");
}

//=====================
// Categories
//=====================

let currentCategory = "all";

//=====================
// Product Database
//=====================

const products = [

{
id:1,
category:"polish",
name:"Softy Nail Polish Red",
price:350,
description:"Premium glossy nail polish with long lasting shine.",
images:[
"polish1.png",
"polish2.png",
"polish3.png"
]
},

{
id:2,
category:"polish",
name:"Softy Nail Polish Pink",
price:360,
description:"Beautiful smooth finish with vibrant pink color.",
images:[
"pink1.png",
"pink2.png",
"pink3.png"
]
},

{
id:3,
category:"remover",
name:"Softy Nail Remover",
price:250,
description:"Quickly removes nail polish without damaging nails.",
images:[
"remover1.png",
"remover2.png",
"remover3.png"
]
},

{
id:4,
category:"lotion",
name:"Softy Soothing Lotion",
price:480,
description:"Moisturizes hands and keeps skin soft and healthy.",
images:[
"lotion1.png",
"lotion2.png",
"lotion3.png"
]
}

];

//=====================
// Cart
//=====================

let cart=[];

//=====================
// Display Products
//=====================

function loadProducts(category="all"){

currentCategory=category;

const container=document.getElementById("products");

container.innerHTML="";

let list=products;

if(category!="all"){

list=products.filter(p=>p.category===category);

}

list.forEach(product=>{

container.innerHTML+=`

<div class="product">

<div class="product-slider">

<img src="${product.images[0]}" class="active">

</div>

<div class="product-info">

<h3>${product.name}</h3>

<p>${product.description}</p>

<div class="price">

Rs.${product.price}

</div>

<button class="add-cart"

onclick="addToCart(${product.id})">

Add To Cart

</button>

<button class="buy-now"

onclick="viewProduct(${product.id})">

Buy Now

</button>

</div>

</div>

`;

});

}

//=====================
// Category Buttons
//=====================

function showCategory(category){

closeMenu();

loadProducts(category);

}

//=====================
// Product Search
//=====================

function getProduct(id){

return products.find(product=>product.id===id);

}

//=====================
// Product Popup
//=====================

let currentProduct=null;

let currentImage=0;

function viewProduct(id){

currentProduct=getProduct(id);

currentImage=0;

openProduct();

}

//=====================
// Product Modal
//=====================

function openProduct(){

const popup=document.getElementById("productPopup");

const img=document.getElementById("popupImage");

const title=document.getElementById("popupTitle");

const desc=document.getElementById("popupDescription");

const price=document.getElementById("popupPrice");

img.src=currentProduct.images[currentImage];

title.innerHTML=currentProduct.name;

desc.innerHTML=currentProduct.description;

price.innerHTML="Rs."+currentProduct.price;

popup.style.display="flex";

}

//=====================
// Close Product
//=====================

function closeProduct(){

document.getElementById("productPopup").style.display="none";

}

//=====================
// Next Image
//=====================

function nextImage(){

currentImage++;

if(currentImage>=currentProduct.images.length){

currentImage=0;

}

document.getElementById("popupImage").src=currentProduct.images[currentImage];

}

//=====================
// Previous Image
//=====================

function previousImage(){

currentImage--;

if(currentImage<0){

currentImage=currentProduct.images.length-1;

}

document.getElementById("popupImage").src=currentProduct.images[currentImage];

}

//=====================
// Start Website
//=====================

window.onload=function(){

loadProducts();

};
/*====================================
SOFTY COSMETICS
script.js
Part 2
Shopping Cart
====================================*/

//=====================
// Add To Cart
//=====================

function addToCart(id){

const product=getProduct(id);

const exist=cart.find(item=>item.id===id);

if(exist){

exist.qty++;

}else{

cart.push({
id:product.id,
name:product.name,
price:product.price,
image:product.images[0],
qty:1
});

}

updateCartCount();

}

//=====================
// Cart Counter
//=====================

function updateCartCount(){

let total=0;

cart.forEach(item=>{

total+=item.qty;

});

document.getElementById("cartCount").innerHTML=total;

}

//=====================
// Show Cart
//=====================

function showCart(){

const cartPage=document.getElementById("cartPage");

const cartItems=document.getElementById("cartItems");

const totalPrice=document.getElementById("totalPrice");

cartItems.innerHTML="";

let subtotal=0;

cart.forEach(item=>{

subtotal+=item.price*item.qty;

cartItems.innerHTML+=`

<div class="cart-item">

<img src="${item.image}">

<div class="cart-info">

<h4>${item.name}</h4>

<p>Rs.${item.price}</p>

<div class="qty-control">

<button onclick="decreaseQty(${item.id})">-</button>

<span>${item.qty}</span>

<button onclick="increaseQty(${item.id})">+</button>

</div>

</div>

<button class="remove-btn"

onclick="removeItem(${item.id})">

Remove

</button>

</div>

`;

});

const shipping=calculateShipping(subtotal);

const grandTotal=subtotal+shipping;

totalPrice.innerHTML=`

Subtotal : Rs.${subtotal}<br>

Shipping : Rs.${shipping}<br>

<b>Total : Rs.${grandTotal}</b>

`;

cartPage.style.display="flex";

}

//=====================
// Close Cart
//=====================

function closeCart(){

document.getElementById("cartPage").style.display="none";

}

//=====================
// Increase Qty
//=====================

function increaseQty(id){

cart.forEach(item=>{

if(item.id===id){

item.qty++;

}

});

updateCartCount();

showCart();

}

//=====================
// Decrease Qty
//=====================

function decreaseQty(id){

cart.forEach(item=>{

if(item.id===id){

item.qty--;

}

});

cart=cart.filter(item=>item.qty>0);

updateCartCount();

showCart();

}

//=====================
// Remove Item
//=====================

function removeItem(id){

cart=cart.filter(item=>item.id!==id);

updateCartCount();

showCart();

}

//=====================
// Shipping
//=====================

function calculateShipping(amount){

if(amount>=1500){

return 0;

}

let qty=0;

cart.forEach(item=>{

qty+=item.qty;

});

if(qty<=1){

return 120;

}

if(qty<=3){

return 180;

}

if(qty<=6){

return 220;

}

return 270;

}

//=====================
// Buy Now
//=====================

function checkout(){

if(cart.length==0){

alert("Your cart is empty.");

return;

}

closeCart();

document.getElementById("orderPopup").style.display="flex";

}

//=====================
// Close Order
//=====================

function closeOrder(){

document.getElementById("orderPopup").style.display="none";

}

//=====================
// Quantity Selector
//=====================

let buyQty=1;

function plusQty(){

buyQty++;

document.getElementById("buyQty").innerHTML=buyQty;

}

function minusQty(){

if(buyQty>1){

buyQty--;

}

document.getElementById("buyQty").innerHTML=buyQty;

  }
/*====================================
SOFTY COSMETICS
script.js
Part 3
Order Form + Google Sheets
====================================*/

//==================================
// Google Apps Script Web App URL
// Replace after deployment
//==================================

const SCRIPT_URL =
"https://script.google.com/macros/s/AKfycbyGstdYv6e_L-xvTa2KDc72JhMy8mJuc6n_4wpaUZmKqA-8ehQwUFs4azn9m2npYnay/exec";

//==================================
// Order Number
//==================================

function generateOrderNumber(){

const d=new Date();

return "SF"+
d.getFullYear()+
(d.getMonth()+1)+
d.getDate()+
Math.floor(Math.random()*900+100);

}

//==================================
// Submit Order
//==================================

const orderForm=document.getElementById("orderForm");

if(orderForm){

orderForm.addEventListener("submit",submitOrder);

}

function submitOrder(e){

e.preventDefault();

const inputs=orderForm.querySelectorAll("input,textarea");

const name=inputs[0].value.trim();

const contact=inputs[1].value.trim();

const email=inputs[2].value.trim();

const address=inputs[3].value.trim();

if(name==""||contact==""||email==""||address==""){

alert("Please fill all fields.");

return;

}

const orderNo=generateOrderNumber();

let productsList="";

let subtotal=0;

let qty=0;

cart.forEach(item=>{

subtotal+=item.price*item.qty;

qty+=item.qty;

productsList+=

item.name+

" x"+

item.qty+

" | ";

});

const shipping=calculateShipping(subtotal);

const total=subtotal+shipping;

const orderData={

orderNo:orderNo,

date:new Date().toLocaleString(),

customer:name,

contact:contact,

email:email,

address:address,

products:productsList,

quantity:qty,

subtotal:subtotal,

shipping:shipping,

total:total

};

sendToGoogleSheet(orderData);

}

//==================================
// Send To Google Sheet
//==================================

function sendToGoogleSheet(data){

fetch(SCRIPT_URL,{

method:"POST",

headers:{

"Content-Type":"application/json"

},

body:JSON.stringify(data)

})

.then(()=>{

orderSuccess(data);

})

.catch(()=>{

alert("Unable to submit order.");

});

}

//==================================
// Success
//==================================

function orderSuccess(data){

closeOrder();

cart=[];

updateCartCount();

const cartItems=document.getElementById("cartItems");

if(cartItems){

cartItems.innerHTML="";

}

alert(

"Thank You "+

data.customer+

"!\n\n"+

"Your order has been received.\n"+

"Order No: "+

data.orderNo+

"\n\nOur team will contact you shortly."

);

orderForm.reset();

window.scrollTo({

top:0,

behavior:"smooth"

});

}

//==================================
// Buy Single Product
//==================================

function buyCurrentProduct(){

cart=[];

cart.push({

id:currentProduct.id,

name:currentProduct.name,

price:currentProduct.price,

image:currentProduct.images[0],

qty:buyQty

});

updateCartCount();

closeProduct();

checkout();

}

//==================================
// Close Popup
//==================================

window.onclick=function(e){

const product=document.getElementById("productPopup");

const cartBox=document.getElementById("cartPage");

const order=document.getElementById("orderPopup");

if(e.target===product){

closeProduct();

}

if(e.target===cartBox){

closeCart();

}

if(e.target===order){

closeOrder();

}

};

//==================================
// Local Storage
//==================================

function saveCart(){

localStorage.setItem(

"softyCart",

JSON.stringify(cart)

);

}

function loadCart(){

const data=localStorage.getItem("softyCart");

if(data){

cart=JSON.parse(data);

updateCartCount();

}

}

const oldAdd=addToCart;

addToCart=function(id){

oldAdd(id);

saveCart();

};

const oldIncrease=increaseQty;

increaseQty=function(id){

oldIncrease(id);

saveCart();

};

const oldDecrease=decreaseQty;

decreaseQty=function(id){

oldDecrease(id);

saveCart();

};

const oldRemove=removeItem;

removeItem=function(id){

oldRemove(id);

saveCart();

};

//==================================
// Load Saved Cart
//==================================

window.addEventListener("load",()=>{

loadCart();

});

//==================================
// End Part 3
//==================================
