import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as morgan from 'morgan';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = morgan((tokens, req, res) => {
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens['response-time'](req, res),
      'ms',
      tokens['remote-addr'](req, res),
      tokens['user-agent'](req, res),
    ].join(' ');
  });

  use(req: Request, res: Response, next: NextFunction) {
    return this.logger(req, res, next);
  }
}
