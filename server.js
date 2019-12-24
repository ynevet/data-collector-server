const express = require('express');
const app = express();
const bluebird = require('bluebird');
const cookieParser = require('cookie-parser');
const handleSessionStateAsync = require('./middlewares/handleSessionState').handleSessionStateAsync;
const redis = require('redis');
const redisClient = redis.createClient({
    host: 'redis-server',
    port: 6379
});

bluebird.promisifyAll(redis.RedisClient.prototype);

redisClient.on("error", function (err) {
    throw err;
});

app.use(express.static('public'))
app.use(cookieParser());
app.get('/collect', handleSessionStateAsync(redisClient), function (req, res) {
    res.send(res.userSession);
  })
 
app.listen(8081)
console.log('Go to:',`http://localhost:4001/`);