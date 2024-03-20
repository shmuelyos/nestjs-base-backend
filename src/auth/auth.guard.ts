// auth.guard.ts
import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";

@Injectable()
export class AuthenticatedGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    return request.session.email != null;
  }
}

@Injectable()
export class AuthenticatedGuard_EmptyArray implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const isAuthenticated = request.session.email != null;

    // Directly manipulate the response in the guard if authentication fails
    if (!isAuthenticated) {
      const response = context.switchToHttp().getResponse();
      response.status(200).json([]).send();
      return false; // Prevent the controller handler from being called after this
    }

    return true; // Proceed as normal if authenticated
  }
}