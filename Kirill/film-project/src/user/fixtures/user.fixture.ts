export const defaultUsername = 'test username';
export const updateUsername = 'update test username';

export function createUserDto(username = defaultUsername) {
  return {
    username,
    email: 'test@gemail.com',
    roles: ['user'],
    password: '1111',
  };
}
