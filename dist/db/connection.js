"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const envs_1 = require("../config/envs");
const db = new sequelize_1.Sequelize(envs_1.envs.database, envs_1.envs.user, envs_1.envs.password, {
    host: 'localhost',
    dialect: 'mysql',
});
exports.default = db;
//# sourceMappingURL=connection.js.map