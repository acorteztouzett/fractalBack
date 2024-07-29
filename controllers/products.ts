import { Request, Response } from 'express';
import Product from '../models/product';
import OrderDetail from '../models/order_detail';

export const getProducts= async (req: Request, res: Response) => {
    const orders= await Product.findAll();
    res.json( orders );
}

export const deleteProductDetail= async (req: Request, res: Response) => {
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

export const editProductDetail= async (req: Request, res: Response) => {
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

export const deleteProduct= async (req: Request, res: Response) => {
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

        await Product.destroy({
            where: {
                id: id
            }
        });

        res.json({ message: 'Product deleted' });

    }
    catch (error:any) {
        throw new Error(error);
    }
        
}

export const editProduct= async (req: Request, res: Response) => {
    try {
        const { id }= req.params;
        const { name, unitPrice}= req.body;
        const product = await Product.findOne({
            where: {
                id: id
            }
        });

        if ( !product ) {
            return res.status(404).json({
                msg: 'No product found with id ' + id
            });
        }

        await Product.update({
            name,
            unitPrice
        }, {
            where: {
                id: id
            }
        });

        res.json({ message: 'Product updated' });
    }
    catch (error:any) {
        throw new Error(error);
    }
}

export const addProduct= async (req: Request, res: Response) => {
    try {
        const { id, name, unitPrice }= req.body;
        const product= await Product.create({
            id,
            name,
            unitPrice
        });

        res.json(product);
    }
    catch (error:any) {
        throw new Error(error);
    }
}