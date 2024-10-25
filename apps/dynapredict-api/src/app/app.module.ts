import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AuthModule } from '../auth/auth.module';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { MachinesModule } from '../machines/machines.module';
import { UserModule } from '../user/user.module';
import { AppController } from './app.controller';

@Module({
  controllers: [AppController],
  imports: [AuthModule, UserModule, MachinesModule],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}