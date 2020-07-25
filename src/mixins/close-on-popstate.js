import { on, off } from '../utils/dom/event';
import { BindEventMixin } from './bind-event';

export const CloseOnPopstateMixin = {
  mixins: [
    BindEventMixin(function (bind, isBind) {
      this.handlePopstate(isBind && this.closeOnPopstate);
    }),
  ],

  props: {
    closeOnPopstate: {
      type: Boolean,
      default: true,
    },
  },

  data() {
    return {
      bindStatus: false,
    };
  },

  watch: {
    closeOnPopstate(val) {
      this.handlePopstate(val);
    },
  },

  methods: {
    handlePopstate(bind) {
      /* istanbul ignore if */
      if (this.$isServer) {
        return;
      }

      if (this.bindStatus !== bind) {
        this.bindStatus = bind;
        const action = bind ? on : off;
        action(window, 'popstate', () => {
          this.close();
          this.shouldReopen = false;
        });
      }
    },
  },
};
