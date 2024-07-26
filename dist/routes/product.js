"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const products_1 = require("../controllers/products");
const router = (0, express_1.Router)();
router.get('/', products_1.getProducts);
router.delete('/:id', products_1.deleteProduct);
router.put('/:id', products_1.editProduct);
exports.default = router;
//# sourceMappingURL=product.js.map