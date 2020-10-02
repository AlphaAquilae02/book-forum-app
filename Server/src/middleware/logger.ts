import express from 'express'
export class Logger {
    loggerMiddleware(req: express.Request, res: express.Response, next: express.NextFunction) {
        console.log(`${req.method} ${req.protocol}://${req.get('host')}${req.originalUrl}`)
        next();
    }

    
}