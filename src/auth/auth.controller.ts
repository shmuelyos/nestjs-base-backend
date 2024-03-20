//auth.controller
import { Controller, Get, Req, Res, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { AuthService } from "./auth.service";
import { ConfigService } from "@nestjs/config";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService, private readonly configService: ConfigService) {
  }

  @Get("google")
  @UseGuards(AuthGuard("google"))
  async googleAuth() {
  }

  @Get("google/callback")
  @UseGuards(AuthGuard("google"))
  async googleAuthRedirect(@Req() req, @Res() res) {
    const { user } = req;
    // validateUser checks if a user exists and creates one if not
    const userInfo = await this.authService.validateUser(user);
    // Set user information in session
    req.session.email = userInfo.email;
    // Redirect to a specific route after login or send a response

    res.redirect(this.configService.get("FRONTEND_URL"));
  }

  @Get("logout")
  logout(@Req() req, @Res() res) {
    req.session.destroy((err) => {
      console.log(err);
      res.redirect(this.configService.get("FRONTEND_URL"));
    });
  }
}
