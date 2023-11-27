export const defaultName = 'test name';
export const updateName = 'update test name';

export function createDirectorDto(name = defaultName) {
  return {
    name,
    dateOfBirth: new Date('2000-10-25'),
  };
}
