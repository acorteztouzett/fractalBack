import { DataTypes } from 'sequelize';
import db from '../db/connection';

const Product= db.define('Product', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING
    },
    unitPrice: {
        type: DataTypes.DECIMAL
    }
});

Product.sync({
    alter: true
}).then(() => {
    console.log('Product table was created successfully');
}).catch((error) => {
    console.log(error);
});

export default Product;