import { MongoClient, Db } from "mongodb";
import { Logger } from "./logger";

export class MongoDBService {

    private static instance: MongoDBService;
    private db!: Db;
    private client!: MongoClient;
    private logger: Logger;

    private constructor() {
        this.logger = new Logger();
    }

    static getInstance(): MongoDBService {
        if (!MongoDBService.instance) {
            MongoDBService.instance = new MongoDBService();
        }
        return MongoDBService.instance;
    }

    async connect(dbName: string): Promise<void> {
        const uri = process.env.MONGODB_URI;
        if (!uri) {
            this.logger.error("MongoDB URI not found in environment variable");
            return;
        }

        try {
            this.client = await MongoClient.connect(uri);
            this.db = this.client.db(dbName);
            this.logger.info(`Successfully connected to MongoDB: ${uri}`);
        }
        catch (err) {
            this.logger.error(`Failed to connect to MongoDB: ${err}`);
        }
    }

    async insertData(collectionName: string, data: any): Promise<void> {
        const collection = this.db.collection(collectionName);
        try {
            await collection.insertOne(data);
            this.logger.info(`Successfully inserted data into collection '${collectionName}'`);
        } catch (err) {
            this.logger.error(`Failed to insert data into collection '${collectionName}': ${err}`);
        }
    }

    async getData(collectionName: string, query: any): Promise<any> {
        const collection = this.db.collection(collectionName);
        try {
            const result = await collection.find(query).toArray();
            this.logger.info(`Successfully retrieved data from collection '${collectionName}'`);
            return result;
        } catch (err) {
            this.logger.error(`Failed to retrieve data from collection '${collectionName}': ${err}`);
            return [];
        }
    }

    getDb(): Db {
        return this.db;
    }

    async closeConnection(): Promise<void> {
        await this.client?.close();
    }
}