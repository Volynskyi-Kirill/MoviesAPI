export const defaultTitle = 'test';
export const updateTitle = 'update test';

export function createMovieDto(title = defaultTitle) {
  return {
    title,
    year: 2018,
    duration: 125,
    genre: [],
    director: [],
  };
}
