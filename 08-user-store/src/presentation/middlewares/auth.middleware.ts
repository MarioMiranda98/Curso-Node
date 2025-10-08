import { NextFunction, Request, Response } from "express";
import { JwtAdapter } from "../../config/jwt.adapter";
import { UserEntity } from "../../domain";
import { JwtPayload } from "jsonwebtoken";
import { UserModel } from "../../data";

export class AuthMiddleware {
  static async validateJWT(req: Request, res: Response, next: NextFunction) {
    const authorization = req.headers['authorization'];

    if (!authorization) return res.status(401).json({ error: 'No token provided' });
    if (!authorization.startsWith('Bearer ')) return res.status(401).json({ error: 'Bad Request' });

    const token = authorization.replace('Bearer ', '');

    try {
      const payload = JwtAdapter.validate(token);

      if (!payload) return res.status(401).json({ error: 'Invalid Token' });

      const decodedToken = JwtAdapter.decode(token) as JwtPayload;
      const userId = decodedToken['data'].id;

      const user = await UserModel.findById(userId as string);

      if (!user) return res.status(404).json({ error: 'User not found' });

      const ue = UserEntity.fromObject(user);

      req.body.user = { ...ue };

      next();
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}