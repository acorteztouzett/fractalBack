import { Router } from 'express';
import { deleteProduct, deleteProductDetail, editProduct, editProductDetail, getProducts } from '../controllers/products';


const router= Router();

router.get('/', getProducts);
router.delete('/:id', deleteProductDetail);
router.put('/:id', editProductDetail);

router.put('/change/:id', editProduct);
router.delete('delete/:id', deleteProduct);


export default router;