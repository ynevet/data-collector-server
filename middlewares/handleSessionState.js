const uuid = require('uuid');
const SESSION_COOKIE = 'sessionID';

module.exports.handleSessionStateAsync = (redisClient) => {
    return async (req, res, next) => {
        let sessionId;
        if (req.cookies[SESSION_COOKIE] === undefined) {
            sessionId = uuid.v1();
            res.cookie(SESSION_COOKIE, sessionId, { httpOnly: true });
        }
        else {
            sessionId = req.cookies[SESSION_COOKIE];
        }

        try {
            await redisClient.setAsync(sessionId, JSON.stringify(req.query), 'EX', 5 * 60);
            const sessionData = await redisClient.getAsync(sessionId);

            if (sessionData) {
                res.userSession = { sessionId: sessionId, state: JSON.parse(sessionData) };
            }

        } catch (error) {
            throw error;
        }
        next();
    }
}