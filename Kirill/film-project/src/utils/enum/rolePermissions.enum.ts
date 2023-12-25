import { Role } from './roles.enum';
import { Permissions } from './permissions.enum';

interface RolePermissions {
  [key: string]: Permissions[];
}

export const RolePermissions: RolePermissions = {
  [Role.User]: [Permissions.VIEW_MOVIES],
  [Role.Admin]: [Permissions.MANAGE_REVIEWS, Permissions.EXPORT_DATA],
};
