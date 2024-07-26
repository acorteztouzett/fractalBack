"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const orders_1 = require("../controllers/orders");
const router = (0, express_1.Router)();
router.get('/', orders_1.getOrders);
router.get('/:id', orders_1.findOrder);
router.delete('/:id', orders_1.deleteOrder);
router.post('/', orders_1.createOrder);
router.put('/:id', orders_1.updateOrder);
exports.default = router;
//# sourceMappingURL=order.js.map