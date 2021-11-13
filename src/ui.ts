//User Interface for The Shopping Cart 
//@author Stephen Johnson

import readlineSync = require('readline-sync'); //for easier repeated prompts
import {Product, ShopModel} from './model';
import {ShopView, PriceView, RemoveView, CartView} from './views';

/**
 * Function to run the UI
 */
export function start() {
  showMainMenu();
}

/**
 * The main menu. Will show until the user exits
 */
function showMainMenu() {

  let shopModel = new ShopModel([
    new Product("Triangle", 3.5, "It's got three sides!"),
    new Product("Square", 4.5, "It's got four sides!"),
    new Product("Pentagon", 5.5, "It's got five sides!")
  ]);

  while(true){ //run until we exit
    console.log(`Welcome to the Shape Store! We offer the best shapes! Pick an option:
  1. Add an item to the cart.
  2. Remove an item to the cart.
  3. View the items in the cart.
  4. View the price of all items.
  5. Quit.`);

    let response = readlineSync.question('> ')
    if(response === '5' || response.slice(0,2).toLowerCase() === ':q'){
      break; //stop looping, thus leaving method
    }

    switch(response) { //handle each response
      case '1': addItemToCart(shopModel); break;
      case '2': removeItemFromCart(shopModel); break;
      case '3': viewItemsInCart(shopModel); break;
      case '4': viewCartTotal(shopModel); break;
      default: console.log('Invalid option!');
    }
    console.log(''); //extra empty line for revisiting
  }
}

/**
 * Allows the user to select a product and add it to their cart.
 * @param shopModel 
 */
function addItemToCart(shopModel: ShopModel) {
  let shopView = new ShopView(shopModel);
  shopView.buildView();
  console.log(shopView.getView());

  let response = readlineSync.question('> ');
  let res = parseInt(response);
  let count: number = 0;

  if(res > shopModel.getProducts().length || res < 1 || isNaN(res)){ console.log("Invalid Option!"); }
  else{ count = letUserSelectQuantity(); }
  
  shopModel.addToCount(res-1, count);
}

/**
 * Lets users choose how many of a selected shape that they want
 * @returns 
 */
function letUserSelectQuantity(): number {
  console.log(`How many of this shape would you like to purchase?\n`);

  let response = readlineSync.question('> ')
  let res = parseInt(response);

  if(isNaN(res) || res < 1){ res = 0; }

  return res;
}

/**
 * Removes a chosen item from the cart
 * @param shopModel 
 */
function removeItemFromCart(shopModel: ShopModel) {
  let removeView = new RemoveView(shopModel);
  removeView.buildView();
  console.log(removeView.getView());

  let counts = shopModel.getCounts()

  let response = readlineSync.question('> ');
  let res = parseInt(response);
  let cartCount = new Array<number>(0);

  if(!isNaN(res) && res >= 0 && res < counts.length){
    for(let i = 0; i < counts.length; i++){
      if(counts[i] > 0){ cartCount.push(i); }
    }

    res = cartCount[res];

    shopModel.removeProduct(res);
  }
}

/**
 * Displays the items in the cart
 * @param shopModel 
 */
function viewItemsInCart(shopModel: ShopModel) {
  let cartView = new CartView(shopModel);
  cartView.buildView();
  console.log(cartView.getView());
}

/**
 * Displays the price total
 * @param shopModel 
 */
function viewCartTotal(shopModel: ShopModel) {
  let priceView = new PriceView(shopModel);
  priceView.buildView();
  console.log(priceView.getView());
}
