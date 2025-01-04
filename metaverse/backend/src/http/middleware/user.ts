import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'

const JWT_PASSWORD = process.env.JWT_PASSWORD || 'metaverse'

export const userMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const header = req.headers["authorization"];
    const token = header?.split(" ")[1];
    console.log(req.route.path)
    console.log(token)

    if (!token) {
        res.status(403).json({ message: "Unauthorized" })
        return
    }

    try {
        const decoded = jwt.verify(token, JWT_PASSWORD) as { role: string, userId: string }
        req.userId = decoded.userId
        next()
    } catch (e) {
        res.status(401).json({ message: "Unauthorized" })
        return
    }
}