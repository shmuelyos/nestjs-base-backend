import {Module} from "@nestjs/common";
import {ProtectedController} from "./protected.controller";
import {AuthenticatedGuard} from "../auth/auth.guard";


@Module({
    controllers: [ProtectedController],
    providers: [AuthenticatedGuard],
})
export class ProtectedModule {
}
