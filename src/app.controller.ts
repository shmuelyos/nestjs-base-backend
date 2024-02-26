import {Controller, Get, Res} from '@nestjs/common';
import {AppService} from './app.service';
import { Response } from 'express'; // This should be imported from 'express'

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {
    }

    @Get()
    getHello(): string {
        return this.appService.getHello();
    }

    @Get('test-cookies')
    testCookies(@Res() res: Response) {
        res.cookie('TestCookie', 'delicious cookies 123...', {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
        });
        res.send('Cookie has been set');
    }
}
