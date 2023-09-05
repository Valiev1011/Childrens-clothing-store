import { FactoryProvider } from '@nestjs/common';
import { createClient } from 'redis';
import { RedisClient, REDIS_CLIENT } from './redis-client.type';

export const redisClientFactory: FactoryProvider<Promise<RedisClient>> = {
  provide: REDIS_CLIENT,
  useFactory: async () => {
    const client = createClient({
      url: 'redis://default:ys8H09faHtfgq3gqEtBffGNeRlQQMZu4@redis-19285.c14.us-east-1-3.ec2.cloud.redislabs.com:19285',
    });
    // const client = createClient({ url: 'redis://redis:6379/0' });
    await client.connect();
    return client;
  },
};
