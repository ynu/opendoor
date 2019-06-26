import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { SharedModule } from './shared/shared.module';

import { DoorModule } from './door/door.module';
import { JwtStrategy } from './auth/jwt-strategy';

@Module({
    imports: [AuthModule, SharedModule, DoorModule,],
    controllers: [],
    providers: [],
})
export class AppModule { }
