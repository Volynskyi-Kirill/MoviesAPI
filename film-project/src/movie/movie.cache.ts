import * as NodeCache from 'node-cache';
import { TEN_MINUTE, CACHE_KEY } from './movie.constants';

export const movieCache = new NodeCache({ stdTTL: TEN_MINUTE });

export function clearCache() {
  movieCache.del([CACHE_KEY.MOVIES_TITLE, CACHE_KEY.MOVIES]);
}
