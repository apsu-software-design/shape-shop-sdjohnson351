"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.PriceView = exports.CartView = exports.RemoveView = exports.ShopView = void 0;
/**
 * Class that represents the view type object
 */
var View = /** @class */ (function () {
    function View(model) {
        this.model = model;
        this.display = "";
    }
    /**
     * Builds a string of what the display should be
     */
    View.prototype.buildView = function () { };
    /**
     * Retrieves the display string
     * @returns display
     */
    View.prototype.getView = function () {
        return this.display;
    };
    return View;
}());
/**
 * Used to represent a list of shapes to buy
 */
var ShopView = /** @class */ (function (_super) {
    __extends(ShopView, _super);
    function ShopView() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ShopView.prototype.buildView = function () {
        this.display += "Here you can select you shape. Pick an option:\n";
        var i = 0;
        var products = this.model.getProducts();
        for (; i < products.length; i++) {
            this.display += "  " + (i + 1) + ". Buy a " + products[i].getName() + "!\n";
        }
        this.display += "  " + (i + 1) + ". Go back. Don't buy anything.\n";
    };
    return ShopView;
}(View));
exports.ShopView = ShopView;
/**
 * Used to represent the list of shapes in the cart that can be removed
 */
var RemoveView = /** @class */ (function (_super) {
    __extends(RemoveView, _super);
    function RemoveView() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RemoveView.prototype.buildView = function () {
        var j = 0;
        this.display += "Select an item to be removed from the cart.\n";
        var products = this.model.getProducts();
        for (var i = 0; i < products.length; i++) {
            if (this.model.getCounts()[i] > 0) {
                this.display += j + ": " + products[i].getName() + "\n";
                j++;
            }
        }
    };
    return RemoveView;
}(View));
exports.RemoveView = RemoveView;
/**
 * Used to represent the user's shopping cart and the items within
 */
var CartView = /** @class */ (function (_super) {
    __extends(CartView, _super);
    function CartView() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CartView.prototype.buildView = function () {
        var counts = this.model.getCounts();
        var products = this.model.getProducts();
        for (var i = 0; i < counts.length; i++) {
            if (counts[i] > 0) {
                this.display += "\n                \n       Name: " + products[i].getName() + "\n      Price: " + products[i].getPrice() + "\nDescription: " + products[i].getDescription() + "\n   Quantity: " + counts[i];
            }
        }
    };
    return CartView;
}(View));
exports.CartView = CartView;
/**
 * Used to represent the total price of the shopping cart
 */
var PriceView = /** @class */ (function (_super) {
    __extends(PriceView, _super);
    function PriceView() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PriceView.prototype.buildView = function () {
        var total = 0;
        var counts = this.model.getCounts();
        var products = this.model.getProducts();
        for (var i = 0; i < counts.length; i++) {
            if (counts[i] > 0) {
                total += products[i].getPrice() * counts[i];
            }
        }
        this.display += "Shopping Cart Total: $" + total.toFixed(2);
    };
    return PriceView;
}(View));
exports.PriceView = PriceView;
