import {Controller, Get, UseGuards} from "@nestjs/common";
import {AuthenticatedGuard} from "../auth/auth.guard";


@Controller('protected')
export class ProtectedController {
    @UseGuards(AuthenticatedGuard)
    @Get()
    getHello(): string {
        return "/protected";
    }

    // @Get()
    // getProtectedResource() {
    //     return { message: "This is a protected resource" };
    // }
}
