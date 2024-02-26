//auth.controller
import {Controller, Get, Req, Res, UseGuards} from '@nestjs/common';
import {AuthGuard} from '@nestjs/passport';
import {AuthService} from "./auth.service";

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {
    }

    @Get('google')
    @UseGuards(AuthGuard('google'))
    async googleAuth(@Req() req) {
    }

    @Get('google/callback')
    @UseGuards(AuthGuard('google'))
    async googleAuthRedirect(@Req() req, @Res() res) {
        const {user} = req;
        // validateUser checks if a user exists and creates one if not
        const userInfo = await this.authService.validateUser(user);
        // Set user information in session
        req.session.email = userInfo.email;
        // Redirect to a specific route after login or send a response
        res.redirect('/protected');
    }

    @Get('logout')
    logout(@Req() req, @Res() res) {
        req.session.destroy((err) => {
            console.log(err);
            res.redirect('/');
        });
    }
}
