import { Request, Response } from 'express';

export function test(req: Request, res: Response) {
  const { name } = req.query;

  return res.json({ message: `hello ${name}` });
}
