import mongoose from 'mongoose';

export class CreateUserDto {
  email: string;
  username: string;
  roles: string[];
  password: string;
  playlist: mongoose.Schema.Types.ObjectId[];
}
