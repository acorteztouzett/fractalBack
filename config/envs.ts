import 'dotenv/config'
import * as joi from 'joi'

interface EnvVars{
    PORT:number;
    DATABASE:string;
    USER:string;
    PASSWORD:string;
    HOST:string;
}

const envsSchema = joi.object({
    PORT: joi.number().required(),
    DATABASE: joi.string().required(),
    USER: joi.string().required(),
    PASSWORD: joi.string().required(),
    HOST: joi.string().required()
}).unknown(true);

const {error,value} = envsSchema.validate(process.env)

if(error){
    throw new Error(`Config validation error: ${error.message}`)
}

const envVars: EnvVars = value;

export const envs={
    serverPort: envVars.PORT,
    database: envVars.DATABASE,
    user: envVars.USER,
    password: envVars.PASSWORD,
    host: envVars.HOST
}