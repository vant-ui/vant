/**
 * Create a basic component with common options
 */
import '../../locale';
import { camelize } from '..';
import SlotsMixin from '../../mixins/slots';
import Vue, {
  VueConstructor,
  ComponentOptions,
  CreateElement,
  RenderContext
} from 'vue/types';
import { VNode, ScopedSlot } from 'vue/types/vnode';
import { InjectOptions, PropsDefinition } from 'vue/types/options';

type VantComponentOptions = ComponentOptions<Vue> & {
  functional?: boolean;
  install?: (Vue: VueConstructor) => void;
};

type DefaultProps = Record<string, any>;

type VantPureComponent<
  Props = DefaultProps,
  PropDefs = PropsDefinition<Props>
> = {
  (
    h: CreateElement,
    props: { [key: string]: any },
    slots: { [key: string]: ScopedSlot | undefined },
    context: RenderContext
  ): VNode;
  props?: PropDefs;
  model?: {
    prop?: string;
    event?: string;
  };
  inject?: InjectOptions;
};

const arrayProp = {
  type: Array,
  default: () => []
};

const numberProp = {
  type: Number,
  default: 0
};

function defaultProps(props: any) {
  Object.keys(props).forEach(key => {
    if (props[key] === Array) {
      props[key] = arrayProp;
    } else if (props[key] === Number) {
      props[key] = numberProp;
    }
  });
}

function install(this: ComponentOptions<Vue>, Vue: VueConstructor) {
  const { name } = this;
  if (name) {
    Vue.component(name, this);
    Vue.component(camelize(`-${name}`), this);
  }
}

// unify slots & scopedSlots
export function unifySlots(context: RenderContext) {
  const scopedSlots = context.scopedSlots || context.data.scopedSlots || {};
  const slots = context.slots();

  Object.keys(slots).forEach(key => {
    if (!scopedSlots[key]) {
      scopedSlots[key] = () => slots[key];
    }
  });

  return scopedSlots;
}

function transformPureComponent(pure: VantPureComponent): VantComponentOptions {
  return {
    functional: true,
    props: pure.props,
    model: pure.model,
    render: (h, context) => pure(h, context.props, unifySlots(context), context)
  };
}

export default (name: string) => (
  sfc: VantComponentOptions | VantPureComponent
) => {
  if (typeof sfc === 'function') {
    sfc = transformPureComponent(sfc);
  }

  if (!sfc.functional) {
    sfc.mixins = sfc.mixins || [];
    sfc.mixins.push(SlotsMixin);
  }

  if (sfc.props) {
    defaultProps(sfc.props);
  }

  sfc.name = name;
  sfc.install = install;

  return sfc;
};
