import { createNamespace, isObj } from '../utils';
import { raf, cancelRaf } from '../utils/dom/raf';
import { BLUE, WHITE } from '../utils/constant';

const [createComponent, bem] = createNamespace('circle');

const PERIMETER = 3140;

let uid = 0;

function format(rate) {
  return Math.min(Math.max(rate, 0), 100);
}

function getPath(clockwise) {
  const sweepFlag = clockwise ? 1 : 0;
  return `M 530 530 m 0, -500 a 500, 500 0 1, ${sweepFlag} 0, 1000 a 500, 500 0 1, ${sweepFlag} 0, -1000`;
}

export default createComponent({
  props: {
    text: String,
    value: {
      type: Number,
      default: 0
    },
    speed: {
      type: Number,
      default: 0
    },
    size: {
      type: String,
      default: '100px'
    },
    fill: {
      type: String,
      default: 'none'
    },
    rate: {
      type: Number,
      default: 100
    },
    layerColor: {
      type: String,
      default: WHITE
    },
    color: {
      type: [String, Object],
      default: BLUE
    },
    strokeWidth: {
      type: Number,
      default: 40
    },
    clockwise: {
      type: Boolean,
      default: true
    }
  },

  beforeCreate() {
    this.uid = `van-circle-gradient-${uid++}`;
  },

  computed: {
    style() {
      return {
        width: this.size,
        height: this.size
      };
    },

    path() {
      return getPath(this.clockwise);
    },

    layerStyle() {
      const offset = (PERIMETER * this.value) / 100;

      return {
        stroke: `${this.color}`,
        strokeWidth: `${this.strokeWidth + 1}px`,
        strokeDasharray: `${offset}px ${PERIMETER}px`
      };
    },

    hoverStyle() {
      return {
        fill: `${this.fill}`,
        stroke: `${this.layerColor}`,
        strokeWidth: `${this.strokeWidth}px`
      };
    },

    gradient() {
      return isObj(this.color);
    },

    LinearGradient() {
      if (!this.gradient) {
        return;
      }

      const Stops = Object.keys(this.color)
        .sort((a, b) => parseFloat(a) - parseFloat(b))
        .map((key, index) => (
          <stop key={index} offset={key} stop-color={this.color[key]} />
        ));

      return (
        <defs>
          <linearGradient id={this.uid} x1="100%" y1="0%" x2="0%" y2="0%">
            {Stops}
          </linearGradient>
        </defs>
      );
    }
  },

  watch: {
    rate: {
      handler() {
        this.startTime = Date.now();
        this.startRate = this.value;
        this.endRate = format(this.rate);
        this.increase = this.endRate > this.startRate;
        this.duration = Math.abs(((this.startRate - this.endRate) * 1000) / this.speed);

        if (this.speed) {
          cancelRaf(this.rafId);
          this.rafId = raf(this.animate);
        } else {
          this.$emit('input', this.endRate);
        }
      },
      immediate: true
    }
  },

  methods: {
    animate() {
      const now = Date.now();
      const progress = Math.min((now - this.startTime) / this.duration, 1);
      const rate = progress * (this.endRate - this.startRate) + this.startRate;
      this.$emit('input', format(parseFloat(rate.toFixed(1))));

      if (this.increase ? rate < this.endRate : rate > this.endRate) {
        this.rafId = raf(this.animate);
      }
    }
  },

  render() {
    return (
      <div class={bem()} style={this.style}>
        <svg viewBox="0 0 1060 1060">
          {this.LinearGradient}
          <path class={bem('hover')} style={this.hoverStyle} d={this.path} />
          <path
            d={this.path}
            class={bem('layer')}
            style={this.layerStyle}
            stroke={this.gradient ? `url(#${this.uid})` : this.color}
          />
        </svg>
        {this.slots() || (this.text && <div class={bem('text')}>{this.text}</div>)}
      </div>
    );
  }
});
