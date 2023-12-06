import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../../decorators/roles.decorator';
import { Role } from '../../utils/roles.enum';
import { ERROR_MESSAGE } from '../../utils/constants';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();
    const userHasRequiredRoles = requiredRoles.some((role) =>
      user.roles.includes(role),
    );

    if (!userHasRequiredRoles) {
      throw new ForbiddenException(
        ERROR_MESSAGE.ACCESS_DENIED + ` need ${requiredRoles} role`,
      );
    }
    return true;
  }
}
