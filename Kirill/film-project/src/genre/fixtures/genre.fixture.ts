export const defaultGenre = 'test genre';
export const updateGenre = 'update test genre';

export function createGenreDto(genre = defaultGenre) {
  return {
    genre,
  };
}
