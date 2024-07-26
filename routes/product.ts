import { Router } from 'express';
import { deleteProduct, editProduct, getProducts } from '../controllers/products';


const router= Router();

router.get('/', getProducts);
router.delete('/:id', deleteProduct);
router.put('/:id', editProduct);

export default router;