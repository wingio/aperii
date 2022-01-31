import { config } from 'dotenv';
config();
export default class Config {
    public static MONGO_URI: string = "mongodb://localhost:27017/";
    public static DB_NAME: string = "aperii";
    public static JWT_SECRET: string = process.env.JWT_TOKEN || "this is a secret";
    public static CF_API_KEY: string = process.env.CF_API_KEY || "cloudflare-api-key";
    public static CF_ACCOUNT_ID: string = process.env.CF_ACCOUNT_ID || "cloudflare-account-id";
    public static CF_IMAGE_DELIVERY: string = process.env.CF_IMAGE_DELIVERY || "imagedelivery.net";
}