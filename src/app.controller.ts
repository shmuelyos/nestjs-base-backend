import { Controller, Get, Req, UseGuards } from "@nestjs/common";
import { AuthenticatedGuard } from "./auth/auth.guard";

@Controller()
export class AppController {

  @UseGuards(AuthenticatedGuard)
  @Get()
  getHello(@Req() req) {
    return `user: ${req.session.email} is authenticated`;
  }

}
