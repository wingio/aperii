import { config } from 'dotenv';
config();
export default class Config {
    public static MONGO_URI: string = "mongodb://localhost:27017/";
    public static DB_NAME: string = "aperii";
    public static JWT_SECRET: string = process.env.JWT_TOKEN || "this is a secret";
}