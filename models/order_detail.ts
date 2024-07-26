import { DataTypes } from 'sequelize';
import db from '../db/connection';

const OrderDetail= db.define('OrderDetail', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING
    },
    unitPrice: {
        type: DataTypes.DECIMAL
    },
    qty:{
        type: DataTypes.INTEGER
    },
    totalPrice:{
        type: DataTypes.DECIMAL
    },
    orderId:{
        type: DataTypes.UUID,
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

export default OrderDetail;