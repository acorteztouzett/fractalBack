"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const OrderDetail = connection_1.default.define('OrderDetail', {
    id: {
        type: sequelize_1.DataTypes.UUID,
        primaryKey: true,
    },
    name: {
        type: sequelize_1.DataTypes.STRING
    },
    unitPrice: {
        type: sequelize_1.DataTypes.DECIMAL
    },
    qty: {
        type: sequelize_1.DataTypes.INTEGER
    },
    totalPrice: {
        type: sequelize_1.DataTypes.DECIMAL
    },
    orderId: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
    }
});
OrderDetail.sync({
    alter: true
}).then(() => {
    console.log('OrderDetail table was created successfully');
}).catch((error) => {
    console.log(error);
});
exports.default = OrderDetail;
//# sourceMappingURL=order_detail.js.map