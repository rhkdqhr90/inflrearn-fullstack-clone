import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AccessTokenStrategy } from './strategies/access-token.strategy';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt-access-token' }),
    JwtModule.register({}),
  ],
  providers: [AccessTokenStrategy],
  exports: [],
})
export class AuthModule {}
