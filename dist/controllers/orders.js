"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateOrder = exports.findOrder = exports.createOrder = exports.deleteOrder = exports.getOrders = void 0;
const order_1 = __importDefault(require("../models/order"));
const order_detail_1 = __importDefault(require("../models/order_detail"));
const getOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const orders = yield order_1.default.findAll();
    res.json(orders);
});
exports.getOrders = getOrders;
const deleteOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const order = yield order_1.default.findOne({
            where: {
                id: id
            }
        });
        if (!order) {
            return res.status(404).json({
                msg: 'No existe un usuario con el id ' + id
            });
        }
        yield order_1.default.destroy({
            where: {
                id: id
            }
        });
        res.json({ message: 'Order deleted' });
    }
    catch (error) {
        throw new Error(error);
    }
});
exports.deleteOrder = deleteOrder;
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, products_number, final_price, status, products } = req.body;
    yield order_detail_1.default.bulkCreate(products);
    const order = yield order_1.default.create({
        id,
        products_number,
        final_price,
        status
    });
    res.json(order);
});
exports.createOrder = createOrder;
const findOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const order = yield order_1.default.findOne({
            where: {
                id: req.params.id
            }
        });
        const products = yield order_detail_1.default.findAll({
            where: {
                orderId: req.params.id
            }
        });
        if (!order) {
            return res.status(404).json({
                msg: 'No order found with id ' + req.params.id
            });
        }
        order.setDataValue('products', products);
        res.json(order);
    }
    catch (error) {
        throw new Error(error);
    }
});
exports.findOrder = findOrder;
const updateOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { products_number, final_price, status, products } = req.body;
        const order = yield order_1.default.findOne({
            where: {
                id: id
            }
        });
        if (!order) {
            return res.status(404).json({
                msg: 'No order found with id ' + id
            });
        }
        yield order_1.default.update({
            products_number,
            final_price,
            status,
        }, {
            where: {
                id: id
            }
        });
        for (const product of products) {
            yield order_detail_1.default.upsert({
                id: product.id,
                name: product.name,
                unitPrice: product.unitPrice,
                qty: product.qty,
                totalPrice: product.totalPrice,
                orderId: id,
            });
        }
        res.json({ message: 'Order updated' });
    }
    catch (error) {
        throw new Error(error);
    }
});
exports.updateOrder = updateOrder;
//# sourceMappingURL=orders.js.map