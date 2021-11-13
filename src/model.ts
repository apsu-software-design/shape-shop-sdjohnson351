
/**
 * Represents a product that can be bought
 */
export class Product {
    private name: string;
    private price: number;
    private description: string;

    public constructor(name: string, price: number, description: string) {
        this.name = name;
        this.price = price;
        this.description = description;
    }

    public getName(): string { return this.name; }
    public getPrice(): number { return this.price; }
    public getDescription(): string { return this.description; }
}

/**
 * Used to represent the shop and the shopping cart
 */
export class ShopModel{
    private products: Product[];
    private counts: number[];

    constructor(products: Product[]){
        this.products = products;
        this.counts = new Array<number>(products.length);
        for(let i:number = 0; i < products.length; i++){
            this.counts[i] = 0;
        }
    }

    /**
     * Add a new type of product to the shop
     * @param product 
     */
    addNewProduct(product: Product){
        this.products.push(product);
        this.counts.push(0);
    }
    
    /**
     * Removes a product from being available to be sold
     * @param product 
     */
    removeProductFromShop(product: Product){
        let index = this.products.indexOf(product);
        if(index > -1){
            this.products.splice(index, 1);
            this.counts.splice(index, 1);
        }
    }

    /**
     * Removes a product from a shopping cart
     * @param index 
     */
    removeProduct(index: number){
        if(index > -1 && index < this.counts.length){
            this.counts[index] = 0;
        }
    }

    /**
     * Increments the count of the product at the given index
     * @param countInd 
     * @param count 
     */
    addToCount(countInd: number, count: number){
        this.counts[countInd] += count;
    }

    /**
     * Returns an array of all the products
     * @returns 
     */
    getProducts(): Product[]{
        return this.products;
    }

    /**
     * Returns the counts of each product
     * @returns 
     */
    getCounts(): number[]{
        return this.counts;
    }
}