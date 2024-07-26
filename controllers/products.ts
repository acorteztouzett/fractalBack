import { Request, Response } from 'express';
import Product from '../models/product';
import OrderDetail from '../models/order_detail';

export const getProducts= async (req: Request, res: Response) => {
    const orders= await Product.findAll();
    res.json( orders );
}

export const deleteProduct= async (req: Request, res: Response) => {
    try {

        const { id }= req.params;
        const product= await OrderDetail.findOne({
            where: {
                id: id
            }
        })

        if ( !product ) {
            return res.status(404).json({
                msg: 'No product found with id ' + id
            });
        }

        await OrderDetail.destroy({
            where: {
                id: id
            }
        });
        res.json({ message: 'Product deleted' });

    } catch (error:any) {
        throw new Error(error);
    }
}

export const editProduct= async (req: Request, res: Response) => {
    try {
        const { id }= req.params;
        const product= await Product.findOne({
            where: {
                id: id
            }
        });

        if ( !product ) {
            return res.status(404).json({
                msg: 'No product found with id ' + id
            });
        }

        await OrderDetail.update(req.body, {
            where: {
                id: id
            }
        });
        
        res.json({ message: 'Product updated' });
    } catch (error:any) {
        throw new Error(error);
    }
}