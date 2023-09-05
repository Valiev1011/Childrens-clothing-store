import {
  Inject,
  Injectable,
  NotFoundException,
  OnModuleDestroy,
} from '@nestjs/common';
import { CreateRediDto } from './dto/set-redis.dto';

import { RedisClient, REDIS_CLIENT } from './redis-client.type';

@Injectable()
export class RedisService implements OnModuleDestroy {
  public constructor(
    @Inject(REDIS_CLIENT) private readonly redisClient: RedisClient,
  ) {}
  onModuleDestroy() {
    this.redisClient.quit();
  }
  ping() {
    return this.redisClient.ping();
  }

  async set(key: string, value: string) {
    await this.redisClient.set(key, value, { EX: 300 });
  }

  async get(key: string): Promise<string> {
    const retrievedValue = await this.redisClient.get(key);
    return retrievedValue;
  }
}
