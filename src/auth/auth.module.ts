import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { Env } from 'src/env'

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      global: true,
      useFactory(config: ConfigService<Env, true>) {
        return {
          signOptions: { algorithm: 'HS256' },
          secret: config.get('JWT_SECRET', { infer: true }),
        }
      },
    }),
  ],
})
export class AuthModule {}
