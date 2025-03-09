//addToCart: adds [itemNum] copies of [itemName] to our cart
function addToCart(itemName, itemNum) {
    const cartNameString = localStorage.getItem('cartNames');
    const cartNames = cartNameString ? JSON.parse(cartNameString) : [];
    const cartNumString = localStorage.getItem('cartNums');
    const cartNums = cartNumString ? JSON.parse(cartNumString) : [];
    cartNames.push(itemName);
    cartNums.push(itemNum);
    localStorage.setItem('cartNames', JSON.stringify(cartNames));
    localStorage.setItem('cartNums', JSON.stringify(cartNums));
}

//incCartNum: increases the number of copies of [itemName] in our cart by 1
function incCartNum(itemName) {
    const cartNameString = localStorage.getItem('cartNames');
    const cartNames = cartNameString ? JSON.parse(cartNameString) : [];
    const cartNumString = localStorage.getItem('cartNums');
    const cartNums = cartNumString ? JSON.parse(cartNumString) : [];
    var idx = cartNames.indexOf(itemName);
    cartNums[idx]++;
    localStorage.setItem('cartNums', JSON.stringify(cartNums));
}

//decCartNum: decreases the number of copies of [itemName] in our cart by 1, 
//            removing [itemName] entirely if this results in 0 copies of it
function decCartNum(itemName) {
    const cartNameString = localStorage.getItem('cartNames');
    const cartNames = cartNameString ? JSON.parse(cartNameString) : [];
    const cartNumString = localStorage.getItem('cartNums');
    const cartNums = cartNumString ? JSON.parse(cartNumString) : [];
    var idx = cartNames.indexOf(itemName);
    cartNums[idx]--;
    if (cartNums[idx] != 0) {
        localStorage.setItem('cartNums', JSON.stringify(cartNums));
    }
    else {
        removeFromCart(itemName);
    }
}

//removeFromCart: removes all copies of [itemName] from our cart
function removeFromCart(itemName) {
    const cartNameString = localStorage.getItem('cartNames');
    const cartNames = cartNameString ? JSON.parse(cartNameString) : [];
    const cartNumString = localStorage.getItem('cartNums');
    const cartNums = cartNumString ? JSON.parse(cartNumString) : [];
    var idx = cartNames.indexOf(itemName);
    cartNames.splice(idx, 1);
    cartNums.splice(idx, 1);
    localStorage.setItem('cartNames', JSON.stringify(cartNames));
    localStorage.setItem('cartNums', JSON.stringify(cartNums));
}

//getNumItemInCart: returns the number of copies of [itemName] currently in the cart
function getNumItemsInCart(itemName) {
    const cartNameString = localStorage.getItem('cartNames');
    const cartNames = cartNameString ? JSON.parse(cartNameString) : [];
    const cartNumString = localStorage.getItem('cartNums');
    const cartNums = cartNumString ? JSON.parse(cartNumString) : [];
    var idx = cartNames.indexOf(itemName);
    if (idx != -1) {
        return cartNums[idx];
    }
    return 0;
}