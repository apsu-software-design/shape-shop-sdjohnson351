"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShopModel = exports.Product = void 0;
/**
 * Represents a product that can be bought
 */
var Product = /** @class */ (function () {
    function Product(name, price, description) {
        this.name = name;
        this.price = price;
        this.description = description;
    }
    Product.prototype.getName = function () { return this.name; };
    Product.prototype.getPrice = function () { return this.price; };
    Product.prototype.getDescription = function () { return this.description; };
    return Product;
}());
exports.Product = Product;
/**
 * Used to represent the shop and the shopping cart
 */
var ShopModel = /** @class */ (function () {
    function ShopModel(products) {
        this.products = products;
        this.counts = new Array(products.length);
        for (var i = 0; i < products.length; i++) {
            this.counts[i] = 0;
        }
    }
    /**
     * Add a new type of product to the shop
     * @param product
     */
    ShopModel.prototype.addNewProduct = function (product) {
        this.products.push(product);
        this.counts.push(0);
    };
    /**
     * Removes a product from being available to be sold
     * @param product
     */
    ShopModel.prototype.removeProductFromShop = function (product) {
        var index = this.products.indexOf(product);
        if (index > -1) {
            this.products.splice(index, 1);
            this.counts.splice(index, 1);
        }
    };
    /**
     * Removes a product from a shopping cart
     * @param index
     */
    ShopModel.prototype.removeProduct = function (index) {
        if (index > -1 && index < this.counts.length) {
            this.counts[index] = 0;
        }
    };
    /**
     * Increments the count of the product at the given index
     * @param countInd
     * @param count
     */
    ShopModel.prototype.addToCount = function (countInd, count) {
        this.counts[countInd] += count;
    };
    /**
     * Returns an array of all the products
     * @returns Product[]
     */
    ShopModel.prototype.getProducts = function () {
        return this.products;
    };
    /**
     * Returns the counts of each product
     * @returns number[]
     */
    ShopModel.prototype.getCounts = function () {
        return this.counts;
    };
    return ShopModel;
}());
exports.ShopModel = ShopModel;
