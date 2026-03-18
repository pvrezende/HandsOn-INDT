import { Request, Response, NextFunction } from "express";
import { z, ZodError, ZodTypeAny } from "zod"; // 💡 Importamos ZodTypeAny

// 💡 Usamos ZodTypeAny para aceitar qualquer esquema de validação (Area, Sensor, Pesquisador)
export const validate = (schema: ZodTypeAny) => 
    (req: Request, res: Response, next: NextFunction) => {
    try {
        schema.parse(req.body); // [cite: 381]
        next(); // [cite: 382]
    } catch (error) {
        if (error instanceof ZodError) {
            return res.status(400).json({
                message: "Erro de validação nos dados enviados.",
                errors: error.issues.map((issue: any) => ({ 
                    path: issue.path.join('.'),
                    message: issue.message,
                })),
            });
        }
        return res.status(500).json({ message: "Erro interno do servidor." });
    }
};