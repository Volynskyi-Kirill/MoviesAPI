export const defaultUsername = 'test username';
export const updateUsername = 'update test username';

export function createUserDto(username = defaultUsername) {
  return {
    username,
    mail: 'test@gmail.com',
  };
}
