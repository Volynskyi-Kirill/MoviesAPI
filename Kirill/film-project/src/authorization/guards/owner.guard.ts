import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { IS_OWNER_KEY } from '../../decorators/owner.decorator';
import { ERROR_MESSAGE } from '../../utils/constants';

@Injectable()
export class OwnerGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const isOwnerRequired = this.reflector.get<boolean>(
      IS_OWNER_KEY,
      context.getHandler(),
    );

    if (!isOwnerRequired) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();
    const { params } = context.getArgByIndex(0);
    const playlistId = params.id;

    const isUserOwner = user.playlist.includes(playlistId);

    if (!isUserOwner) {
      throw new ForbiddenException(ERROR_MESSAGE.ACCESS_DENIED);
    }
    return true;
  }
}
