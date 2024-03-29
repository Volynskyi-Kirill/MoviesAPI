export const DELIMITER = ' ';

export const MOVIE_FIELDS = {
  ID: '_id',
  TITLE: 'title',
  YEAR: 'year',
  DURATION: 'duration',
  GENRE: 'genre',
  DIRECTOR: 'director',
};

export const USER_FIELDS = {
  ID: '_id',
  EMAIL: 'email',
  USERNAME: 'username',
  Role: 'roles',
  PASSWORD: 'password',
  PLAYLIST: 'playlist',
};

export const PLAYLIST_FIELDS = {
  TITLE: 'title',
  MOVIES: 'movies',
  CREATED_BY: 'createdBy',
  VISIBILITY: 'visibility',
};

export const VISIBILITY_OPTIONS = {
  PUBLIC: 'public',
  PRIVATE: 'private',
};

export const ERROR_MESSAGE = {
  LOGIN_FAILED: 'check your login or password',
  USER_NOT_FOUND: 'such user does not exist',
  CHECK_TOKEN: 'check token and permissions',
  ACCESS_DENIED: 'Access is denied.',
};

export const HEADERS = {
  AUTHORIZATION: 'Authorization',
};

export const ROLES = {
  USER: 'user',
  ADMIN: 'admin',
};