import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class RestrictDomainMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const hostnames = ['screwmycode.in'];
    const host = req.get('host');
    const origin = req.get('origin');
    const referer = req.get('referer');
    console.log({ host, origin, referer });

    if (hostnames.includes(host)) {
      next();
      return;
    }

    res.status(403).send('Access denied.');
  }
}
