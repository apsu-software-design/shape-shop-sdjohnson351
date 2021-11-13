import { Product, ShopModel } from "./model";

/**
 * Class that represents the view type object
 */
abstract class View {
    protected model: ShopModel;
    protected display: string;

    constructor(model: ShopModel){
        this.model = model;
        this.display = "";
    }
    
    /**
     * Builds a string of what the display should be
     */
    buildView(){}

    /**
     * Retrieves the display string
     * @returns
     */
    getView(): string{
        return this.display;
    }
}

/**
 * Used to represent a list of shapes to buy
 */
export class ShopView extends View{
    /**
     * Builds a string based on the shapes avaliable to purchase
     */
    buildView(){
        this.display += "Here you can select you shape. Pick an option:\n";
        let i: number = 0;
        let products: Product[] = this.model.getProducts();
        for (; i < products.length; i++){
            this.display += `  ${i+1}. Buy a ${products[i].getName()}!\n`;
        }
        this.display += `  ${i+1}. Go back. Don't buy anything.\n`;
    }
}

/**
 * Used to represent the list of shapes in the cart that can be removed
 */
export class RemoveView extends View{
    /**
     * Builds a string based on the shapes in the shopping cart
     */
    buildView(){
        let j = 0;
        this.display += `Select an item to be removed from the cart.\n`;
        let products: Product[] = this.model.getProducts();
        for (let i = 0; i < products.length; i++){
            if(this.model.getCounts()[i] > 0){
                this.display += `${j}: ${products[i].getName()}\n`;
                j++;
            }
        }
    }
}

/**
 * Used to represent the user's shopping cart and the items within
 */
export class CartView extends View{
    /**
     * Builds a string based on what is in the shopping cart and what their values are
     */
    buildView(){
        let counts: number[] = this.model.getCounts();
        let products: Product[] = this.model.getProducts();
        for(let i = 0; i < counts.length; i++){
            if(counts[i] > 0){
                this.display +=`
                
       Name: ${products[i].getName()}
      Price: ${products[i].getPrice()}
Description: ${products[i].getDescription()}
   Quantity: ${counts[i]}`;
            }
        }
    }
}

/**
 * Used to represent the total price of the shopping cart
 */
export class PriceView extends View{
    /**
     * Builds a string based on the total price
     */
    buildView(){
        let total: number = 0;
        let counts: number[] = this.model.getCounts();
        let products: Product[] = this.model.getProducts();
        for(let i = 0; i < counts.length; i++){
            if(counts[i] > 0){
            total += products[i].getPrice() * counts[i];
            }
        }
        this.display += `Shopping Cart Total: $${total.toFixed(2)}`;
    }
}