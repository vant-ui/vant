import { use, noop } from '../utils';
import { inherit } from '../utils/functional';
import Button from '../button';

const [sfc, bem, t] = use('submit-bar');

function SubmitBar(h, props, slots, ctx) {
  const { tip, price } = props;
  const hasPrice = typeof price === 'number';

  return (
    <div class={bem()} {...inherit(ctx)}>
      {slots.top && slots.top()}
      {(slots.tip || tip) && (
        <div class={bem('tip')}>
          {tip}
          {slots.tip && slots.tip()}
        </div>
      )}
      <div class={bem('bar')}>
        {slots.default && slots.default()}
        <div class={bem('text')}>
          {hasPrice && [
            <span>{props.label || t('label')}</span>,
            <span class={bem('price')}>{`${props.currency} ${(
              price / 100
            ).toFixed(2)}`}</span>
          ]}
        </div>
        <Button
          square
          size="large"
          type={props.buttonType}
          loading={props.loading}
          disabled={props.disabled}
          text={props.loading ? '' : props.buttonText}
          onClick={ctx.listeners.submit || noop}
        />
      </div>
    </div>
  );
}

SubmitBar.props = {
  tip: String,
  label: String,
  loading: Boolean,
  disabled: Boolean,
  buttonText: String,
  price: {
    type: Number,
    default: null
  },
  currency: {
    type: String,
    default: '¥'
  },
  buttonType: {
    type: String,
    default: 'danger'
  }
};

export default sfc(SubmitBar);
