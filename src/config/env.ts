import 'dotenv/config'
const ENV_PORT:number = process.env.port as unknown as number;

const MONGO_URI:string =  process.env.MONGO_URI  as string

export {ENV_PORT,MONGO_URI}