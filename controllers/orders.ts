import { Request, Response } from 'express';
import Order from '../models/order';
import OrderDetail from '../models/order_detail';

export const getOrders= async (req: Request, res: Response) => {
    const orders= await Order.findAll();
    res.json( orders );
}

export const deleteOrder= async (req: Request, res: Response) => {
    try {
        const { id }= req.params;
        const order= await Order.findOne({
            where: {
                id: id
            }
        })

        if ( !order ) {
            return res.status(404).json({
                msg: 'No existe un usuario con el id ' + id
            });
        }

        await Order.destroy({
            where: {
                id: id
            }
        });
        res.json({ message: 'Order deleted' });
    } catch (error:any) {
        throw new Error(error)
    }
}

export const createOrder= async (req: Request, res: Response) => {
    const {id, products_number, final_price, status,products }= req.body;

    
    // const order= await Order.create({
    //     id,
    //     products_number,
    //     final_price,
    //     status
    // });
    
    // await OrderDetail.bulkCreate(products);
    // res.json( order );
    console.log(req.body.id);
}


export const findOrder= async (req: Request, res: Response) => {
    try {
        const order= await Order.findOne({
            where: {
                id: req.params.id
            }
        });
        const products= await OrderDetail.findAll({
            where: {
                orderId: req.params.id
            }
        });
        if( !order ) {
            return res.status(404).json({
                msg: 'No order found with id ' + req.params.id
            });
        }

        order.setDataValue('products', products);
        res.json(order);

    } catch (error:any) {
        throw new Error(error) 
    }
}

export const updateOrder= async (req: Request, res: Response) => {
    try {
        const { id }= req.params;
        const { products_number, final_price, status , products}= req.body;

        const order= await Order.findOne({
            where: {
                id: id
            }
        });

        if( !order ) {
            return res.status(404).json({
                msg: 'No order found with id ' + id
            });
        }

        await Order.update({
            products_number,
            final_price,
            status,
        }, {
            where: {
                id: id
            }
        });

        for (const product of products) {
            await OrderDetail.upsert({
                id: product.id,
                name: product.name,
                unitPrice: product.unitPrice,
                qty: product.qty,
                totalPrice: product.totalPrice,
                orderId: id,
            });
        }

        res.json({ message: 'Order updated' });

    } catch (error:any) {
        throw new Error(error);
    }
}