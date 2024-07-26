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
exports.editProduct = exports.deleteProduct = exports.getProducts = void 0;
const product_1 = __importDefault(require("../models/product"));
const order_detail_1 = __importDefault(require("../models/order_detail"));
const getProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const orders = yield product_1.default.findAll();
    res.json(orders);
});
exports.getProducts = getProducts;
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const product = yield order_detail_1.default.findOne({
            where: {
                id: id
            }
        });
        if (!product) {
            return res.status(404).json({
                msg: 'No product found with id ' + id
            });
        }
        yield order_detail_1.default.destroy({
            where: {
                id: id
            }
        });
        res.json({ message: 'Product deleted' });
    }
    catch (error) {
        throw new Error(error);
    }
});
exports.deleteProduct = deleteProduct;
const editProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const product = yield product_1.default.findOne({
            where: {
                id: id
            }
        });
        if (!product) {
            return res.status(404).json({
                msg: 'No product found with id ' + id
            });
        }
        yield order_detail_1.default.update(req.body, {
            where: {
                id: id
            }
        });
        res.json({ message: 'Product updated' });
    }
    catch (error) {
        throw new Error(error);
    }
});
exports.editProduct = editProduct;
//# sourceMappingURL=products.js.map