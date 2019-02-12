import { use } from '../utils';
import { emit, inherit } from '../utils/functional';
import Loading from '../loading';

const [sfc, bem] = use('button');

export default sfc({
  functional: true,

  props: {
    text: String,
    block: Boolean,
    plain: Boolean,
    round: Boolean,
    square: Boolean,
    loading: Boolean,
    disabled: Boolean,
    nativeType: String,
    bottomAction: Boolean,
    tag: {
      type: String,
      default: 'button'
    },
    type: {
      type: String,
      default: 'default'
    },
    size: {
      type: String,
      default: 'normal'
    }
  },

  render(h, context) {
    const { props } = context;
    const { type, disabled, loading } = props;

    const onClick = event => {
      if (!loading && !disabled) {
        emit(context, 'click', event);
      }
    };

    return (
      <props.tag
        type={props.nativeType}
        disabled={disabled}
        class={bem([
          type,
          props.size,
          {
            loading,
            disabled,
            block: props.block,
            plain: props.plain,
            round: props.round,
            square: props.square,
            'bottom-action': props.bottomAction
          }
        ])}
        onClick={onClick}
        {...inherit(context)}
      >
        {loading ? (
          <Loading size="20px" color={type === 'default' ? undefined : ''} />
        ) : (
          <span class={bem('text')}>{context.children || props.text}</span>
        )}
      </props.tag>
    );
  }
});
