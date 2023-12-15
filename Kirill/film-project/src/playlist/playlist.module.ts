import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { APP_GUARD } from '@nestjs/core';
import { Playlist, PlaylistSchema } from './schemas/playlist.schema';
import { PlaylistService } from './playlist.service';
import { UserService } from '../user/user.service';
import { User, UserSchema } from '../user/schemas/user.schema';
import { PlaylistController } from './playlist.controller';
import { OwnerGuard } from '../authorization/guards/owner.guard';

const ownerGuard = {
  provide: APP_GUARD,
  useClass: OwnerGuard,
};

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Playlist.name, schema: PlaylistSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  controllers: [PlaylistController],
  providers: [PlaylistService, UserService, ownerGuard],
})
export class PlaylistModule {}
