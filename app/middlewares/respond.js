'use strict';

async function respond(res, status, promise) {
    try {
        res.status(status).json(await promise)
    } catch (err) {
        res.status(err.status || 500).json(err)
    }
}

module.exports = respond;
