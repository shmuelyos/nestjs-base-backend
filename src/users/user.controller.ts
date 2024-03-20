import { Controller, Delete, Get, Req, UseGuards } from "@nestjs/common";
import { AuthenticatedGuard } from "../auth/auth.guard";
import { UserService } from "./user.service";

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {
  }

  @UseGuards(AuthenticatedGuard)
  @Get()
  getUser(@Req() req) {
    return this.userService.getUser(req.session.email);
  }

  @UseGuards(AuthenticatedGuard)
  @Delete()
  destroySession(@Req() req) {
    return this.userService.destroySession(req.session);
  }
}
