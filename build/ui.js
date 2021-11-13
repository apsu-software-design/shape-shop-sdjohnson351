"use strict";
//User Interface for The Shopping Cart 
//@author Stephen Johnson
Object.defineProperty(exports, "__esModule", { value: true });
exports.start = void 0;
var readlineSync = require("readline-sync"); //for easier repeated prompts
var model_1 = require("./model");
var views_1 = require("./views");
/**
 * Function to run the UI
 */
function start() {
    showMainMenu();
}
exports.start = start;
/**
 * The main menu. Will show until the user exits
 */
function showMainMenu() {
    var shopModel = new model_1.ShopModel([
        new model_1.Product("Triangle", 3.5, "It's got three sides!"),
        new model_1.Product("Square", 4.5, "It's got four sides!"),
        new model_1.Product("Pentagon", 5.5, "It's got five sides!")
    ]);
    while (true) { //run until we exit
        console.log("Welcome to the Shape Store! We offer the best shapes! Pick an option:\n  1. Add an item to the cart.\n  2. Remove an item to the cart.\n  3. View the items in the cart.\n  4. View the price of all items.\n  5. Quit.");
        var response = readlineSync.question('> ');
        if (response === '5' || response.slice(0, 2).toLowerCase() === ':q') {
            break; //stop looping, thus leaving method
        }
        switch (response) { //handle each response
            case '1':
                addItemToCart(shopModel);
                break;
            case '2':
                removeItemFromCart(shopModel);
                break;
            case '3':
                viewItemsInCart(shopModel);
                break;
            case '4':
                viewCartTotal(shopModel);
                break;
            default: console.log('Invalid option!');
        }
        console.log(''); //extra empty line for revisiting
    }
}
/**
 * Allows the user to select a product and add it to their cart.
 * @param shopModel
 */
function addItemToCart(shopModel) {
    var shopView = new views_1.ShopView(shopModel);
    shopView.buildView();
    console.log(shopView.getView());
    var response = readlineSync.question('> ');
    var res = parseInt(response);
    var count = 0;
    if (res > shopModel.getProducts().length || res < 1 || isNaN(res)) {
        console.log("Invalid Option!");
    }
    else {
        count = letUserSelectQuantity();
    }
    shopModel.addToCount(res - 1, count);
}
/**
 * Lets users choose how many of a selected shape that they want
 * @returns res
 */
function letUserSelectQuantity() {
    console.log("How many of this shape would you like to purchase?\n");
    var response = readlineSync.question('> ');
    var res = parseInt(response);
    if (isNaN(res) || res < 1) {
        res = 0;
    }
    return res;
}
/**
 * Removes a chosen item from the cart
 * @param shopModel
 */
function removeItemFromCart(shopModel) {
    var removeView = new views_1.RemoveView(shopModel);
    removeView.buildView();
    console.log(removeView.getView());
    var counts = shopModel.getCounts();
    var response = readlineSync.question('> ');
    var res = parseInt(response);
    var cartCount = new Array(0);
    if (!isNaN(res) && res >= 0 && res < counts.length) {
        for (var i = 0; i < counts.length; i++) {
            if (counts[i] > 0) {
                cartCount.push(i);
            }
        }
        res = cartCount[res];
        shopModel.removeProduct(res);
    }
}
/**
 * Displays the items in the cart
 * @param shopModel
 */
function viewItemsInCart(shopModel) {
    var cartView = new views_1.CartView(shopModel);
    cartView.buildView();
    console.log(cartView.getView());
}
/**
 * Displays the price total
 * @param shopModel
 */
function viewCartTotal(shopModel) {
    var priceView = new views_1.PriceView(shopModel);
    priceView.buildView();
    console.log(priceView.getView());
}
