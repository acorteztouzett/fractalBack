"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const Product = connection_1.default.define('Product', {
    id: {
        type: sequelize_1.DataTypes.UUID,
        primaryKey: true,
    },
    name: {
        type: sequelize_1.DataTypes.STRING
    },
    unitPrice: {
        type: sequelize_1.DataTypes.DECIMAL
    }
});
Product.sync({
    alter: true
}).then(() => {
    console.log('Product table was created successfully');
}).catch((error) => {
    console.log(error);
});
exports.default = Product;
//# sourceMappingURL=product.js.map