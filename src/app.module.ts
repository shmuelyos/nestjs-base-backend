import {Module} from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';
import {MongooseModule} from '@nestjs/mongoose';
import {AuthModule} from './auth/auth.module';
import {AppService} from "./app.service";
import {AppController} from "./app.controller";
import {ProtectedModule} from "./protected/protected.module";

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        MongooseModule.forRoot(process.env.MONGODB_URI),
        AuthModule,
        ProtectedModule
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}
