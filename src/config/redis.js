const Redis= require("ioredis");

class RedisCache {
  constructor() {
    this.redis = new Redis(6379); 
  }
  
  save(key, value, time = 10) {
    this.redis.set(key, value, 'ex', time);
  }

  async getCache(key) {
    try {
      return this.redis.get(key);
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = new RedisCache();