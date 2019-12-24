const uuid = require('uuid');
const SESSION_COOKIE = 'sessionID';
const SESSION_TTL_IN_SECONDS = 5*60;

module.exports.handleSessionStateAsync = (redisClient) => {
    return async (req, res, next) => {
        let sessionId;
        if (req.cookies[SESSION_COOKIE] === undefined) {
            sessionId = uuid.v1();
            res.cookie(SESSION_COOKIE, sessionId, { httpOnly: true });
        }
        else {
            sessionId = req.cookies[SESSION_COOKIE];
            const sessionData = await redisClient.getAsync(sessionId);
            if (!sessionData) {
                sessionId = uuid.v1();
                res.cookie(SESSION_COOKIE, sessionId, { httpOnly: true });
            }
        }

        try {
            await redisClient.setAsync(sessionId, JSON.stringify(req.query), 'EX', SESSION_TTL_IN_SECONDS);
            res.userSession = { sessionId: sessionId, state: req.query };

        } catch (error) {
            console.log("Redis error: ", error);
        }
        next();
    }
}