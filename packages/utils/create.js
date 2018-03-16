/**
 * Create a component with common options
 */
import '../locale';
import i18n from '../mixins/i18n';
import install from './install';
import Icon from '../icon';
import Loading from '../loading';
import Cell from '../cell';
import CellGroup from '../cell-group';

export default function(sfc) {
  sfc.name = 'van-' + sfc.name;
  sfc.install = sfc.install || install;
  sfc.mixins = sfc.mixins || [];
  sfc.mixins.push(i18n);
  sfc.components = Object.assign(sfc.components || {}, {
    Icon,
    Loading,
    Cell,
    CellGroup
  });

  return sfc;
};
