import { withInstall } from '../utils';
import _List, { ListProps } from './List';

export const List = withInstall(_List);
export default List;
export type { ListProps };
export type { ListInstance, ListDirection } from './types';

// define global components for volar
declare module 'vue' {
  export interface GlobalComponents {
    VanList: typeof List;
  }
}
