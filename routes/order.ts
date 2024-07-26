import { Router } from 'express';
import { createOrder, deleteOrder, findOrder, getOrders, updateOrder } from '../controllers/orders';


const router= Router();

router.get('/', getOrders);
router.get('/:id', findOrder);
router.delete('/:id', deleteOrder);
router.post('/', createOrder);
router.put('/:id', updateOrder);

export default router;