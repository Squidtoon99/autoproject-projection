import { createClient } from 'redis';

let redis = null;

const create = async () => {
    if (!redis) {
        redis = createClient({ url: process.env.REDIS_URL });
        redis.on('error', (err) => console.log('Redis Client Error', err));
        await redis.connect();
    }
    return redis;
};

export default create;