# CS 493 Cloud Computing

# Course Overview
- Rating Limiting
- Token Buckets

## Rate Limiting
- How can we do this?

- What's the algorithm?

- Time and date stamp when you create something (i.e. make a comment)
    - Check the UID and see when the last comment was made
    - Return error if too soon

- Some kind of counter

## Token Buckets

```
// Max 5 requests in 60 seconds
rateLimitWindowsMS = 60000;         // 60k milliseconds = 60 seconds
rateLimitWindowsMaxRequests = 5;    // 5 requests per minute

// Requests per millisecond
refreshRate = rateLimitWindowsMaxRequests / rateLimitWindowsMS;
```

1. Compute the number of tokens gained since the last request
2. Add them on to the token count
3. If we have at least 1 token:
    - Subtract it off
    - Do the work!
   Else:
    - Respond with an error

```
bucket = {
    tokens:    // token count
    last:      // last time used
}

timestamp = Date.now();     // Time in milliseconds (since 1970)
elapsedMS = timestamp - bucket.last;

newTokens = elapsedMS * refreshRate;   // could be fractional

bucket.tokens += newTokens;

if (bucket.tokens > rateLimitWindowsMaxRequests) {
    bucket.tokens = rateLimitWindowsMaxRequests;
}

bucket.last = timestamp;

if (bucket.tokens >= 1) {
    bucket.tokens--;
    // Do the work!
    // Respond with success
} else {
    // Respond with an error
}
```

## Redis

- Key/Value store
- Replication: pub/sub mechanism
    - One main system
    - Changes get replicated to the other system
- In terms of rate limiting:
    - Rate limit bucket (tokens, last), stored in redis
        - Key: IP address
        - Value: the bucket


 