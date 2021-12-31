import { withInstall } from '../utils';
import _Search, { SearchProps } from './Search';

export const Search = withInstall(_Search);
export default Search;
export type { SearchProps };
export type { SearchShape, SearchInstance } from './types';

// define global components for volar
declare module 'vue' {
  export interface GlobalComponents {
    VanSearch: typeof Search;
  }
}
