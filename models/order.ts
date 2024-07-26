import { DataTypes } from 'sequelize';
import db from '../db/connection';
import OrderDetail from './order_detail';

const Order= db.define('Order', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
    },
    products_number: {
        type: DataTypes.INTEGER
    },
    final_price: {
        type: DataTypes.DECIMAL
    },
    date: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    status: {
        type: DataTypes.ENUM('Pending', 'In Progress', 'Completed'),
    }
});

Order.hasMany(OrderDetail,{
    foreignKey: 'orderId'
});

Order.sync({
    alter: true
}).then(() => {
    console.log('OrderDetail table was created successfully');
}).catch((error) => {
    console.log(error);
});

export default Order;