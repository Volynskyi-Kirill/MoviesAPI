import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { IS_OWNER_KEY } from '../../decorators/owner.decorator';
import { ERROR_MESSAGE } from '../../utils/constants';
import { PlaylistService } from '../../playlist/playlist.service';

@Injectable()
export class OwnerGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private playlistService: PlaylistService,
  ) {}

  async canActivate(context: ExecutionContext) {
    const isOwnerRequired = this.reflector.get<boolean>(
      IS_OWNER_KEY,
      context.getHandler(),
    );

    if (!isOwnerRequired) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();
    const { params } = context.getArgByIndex(0);

    const userId = user._id.toString();
    const playlistId = params.id;
    const playlist = await this.playlistService.findById(playlistId);
    const playlistOwnerId = playlist?.createdBy.toString();

    const isUserOwner = playlistOwnerId === userId;

    if (!isUserOwner) {
      throw new ForbiddenException(ERROR_MESSAGE.ACCESS_DENIED);
    }
    return true;
  }
}
