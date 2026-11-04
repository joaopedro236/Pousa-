import os
import redis

redis_client = redis.Redis.from_url(
    os.getenv("REDIS_URL", "redis://localhost:6379"),
        decode_responses=True,
            socket_connect_timeout=2,
                socket_timeout=2
        )