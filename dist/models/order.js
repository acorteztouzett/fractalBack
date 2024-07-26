"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const order_detail_1 = __importDefault(require("./order_detail"));
const Order = connection_1.default.define('Order', {
    id: {
        type: sequelize_1.DataTypes.UUID,
        primaryKey: true,
    },
    products_number: {
        type: sequelize_1.DataTypes.INTEGER
    },
    final_price: {
        type: sequelize_1.DataTypes.DECIMAL
    },
    date: {
        type: sequelize_1.DataTypes.DATE,
        defaultValue: sequelize_1.DataTypes.NOW
    },
    status: {
        type: sequelize_1.DataTypes.ENUM('Pending', 'In Progress', 'Completed'),
    }
});
Order.hasMany(order_detail_1.default, {
    foreignKey: 'orderId'
});
Order.sync({
    alter: true
}).then(() => {
    console.log('OrderDetail table was created successfully');
}).catch((error) => {
    console.log(error);
});
exports.default = Order;
//# sourceMappingURL=order.js.map