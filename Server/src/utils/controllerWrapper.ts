import { NextFunction, Request, Response } from "express";

const controllerWrapper = (callback: any) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        const data: any = await callback(req, res)

        req.locals.result = data // Se utiliza en el eventHandler

        // SI es true, pasa directo hacia errorHandler
        if (data?.error) return next(data.error)

        req.locals.finished = true
        res.json(data)
        return next()
    }
}

export { controllerWrapper }