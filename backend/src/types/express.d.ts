// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { Express } from 'express';
type JwtPayload = {
  sub: string;
  email?: string;
  name?: string;
  picture?: null;
  iat?: number;
};

declare global {
  namespace Express {
    // eslint-disable-next-line @typescript-eslint/no-empty-object-type
    interface User extends JwtPayload {}
  }
}
