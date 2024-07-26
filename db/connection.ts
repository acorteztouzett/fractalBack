import { Sequelize } from 'sequelize';
import { envs } from '../config/envs';


const db = new Sequelize(envs.database , envs.user, envs.password, {
    host: 'localhost',
    dialect: 'mysql',
});



export default db;
