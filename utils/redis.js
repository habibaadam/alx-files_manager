const redis = require('redis');
const { promisify } = require('util');

class RedisClient {
    constructor() {
        this.client = redis.createClient();
        this.client.on('error', (error) => {
            console.error(`Redis client not connected to the server: ${error.message}`);
        });
    }
    

    isAlive() {
        return this.client.connected;
    }
    
    async get(key) {
        const getAsync = promisify(this.client.get).bind(this.client);
        const value = await getAsync(key);
        return value;
    }
    
    async set(key, value, duration) {
        this.client.set(key, value);
        this.client.expire(key, duration);
    }
    
    async del(key) {
        this.client.del(key);
    }
}