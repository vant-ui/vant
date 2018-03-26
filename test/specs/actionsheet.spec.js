import ActionSheet from 'packages/actionsheet';
import { mount } from 'avoriaz';
import { DOMChecker } from '../utils';

describe('ActionSheet', () => {
  let wrapper;
  afterEach(() => {
    wrapper && wrapper.destroy();
  });

  it('create a actionsheet', () => {
    wrapper = mount(ActionSheet, {
      propsData: {}
    });

    expect(wrapper.hasClass('van-actionsheet')).to.be.true;
    expect(wrapper.instance().actions.length).to.equal(0);
    expect(wrapper.instance().overlay).to.be.true;
    expect(wrapper.instance().closeOnClickOverlay).to.be.true;
  });

  it('create displayed actionsheet', () => {
    wrapper = mount(ActionSheet, {
      propsData: {
        value: true
      }
    });

    DOMChecker(wrapper, {
      noStyle: {
        '.van-actionsheet': {
          display: 'none'
        }
      }
    });
  });

  it('create title type actionsheet', () => {
    wrapper = mount(ActionSheet, {
      propsData: {
        title: 'test'
      }
    });

    expect(wrapper.hasClass('van-actionsheet--withtitle')).to.be.true;
    expect(wrapper.contains('.van-actionsheet__header')).to.be.true;
    expect(wrapper.contains('.van-actionsheet__content')).to.be.true;
  });

  it('create actions actionsheet', () => {
    wrapper = mount(ActionSheet, {
      propsData: {
        actions: [
          {
            name: '有赞E卡',
            subname: '（剩余260.50元）'
          },
          {
            name: '信用卡支付',
            loading: true
          }
        ]
      }
    });

    const actionItems = wrapper.find('.van-actionsheet__item');

    expect(actionItems.length).to.equal(2);
    expect(actionItems[0].contains('.van-actionsheet__name')).to.be.true;
    expect(actionItems[0].contains('.van-actionsheet__subname')).to.be.true;
    expect(actionItems[1].contains('.van-actionsheet__loading')).to.be.true;
  });

  it('handle actionsheet item click with callback', () => {
    let called = false;
    wrapper = mount(ActionSheet, {
      propsData: {
        actions: [
          {
            name: '有赞E卡',
            callback: () => {
              called = true;
            }
          },
          {
            name: '微信'
          }
        ]
      }
    });

    const actionItem = wrapper.find('.van-actionsheet__item')[0];
    actionItem.trigger('click');
    expect(called).to.be.true;

    const secondActionItem = wrapper.find('.van-actionsheet__item')[1];
    secondActionItem.trigger('click');
  });

  it('create actionsheet with cancel button', () => {
    wrapper = mount(ActionSheet, {
      propsData: {
        cancelText: 'cancel'
      }
    });

    const cancelButton = wrapper.find('.van-actionsheet__cancel')[0];
    expect(wrapper.contains('.van-actionsheet__cancel')).to.be.true;
    expect(cancelButton.text()).to.equal('cancel');
  });

  it('toggle actionsheet value from v-model', (done) => {
    wrapper = mount(ActionSheet, {
      propsData: {
        value: false
      }
    });

    const eventStub = sinon.stub(wrapper.vm, '$emit');
    DOMChecker(wrapper, {
      style: {
        '.van-actionsheet': {
          display: 'none'
        }
      }
    });

    wrapper.vm.value = true;
    wrapper.update();
    wrapper.vm.$nextTick(() => {
      DOMChecker(wrapper, {
        noStyle: {
          '.van-actionsheet': {
            display: 'none'
          }
        }
      });
      expect(eventStub.calledWith('input'));
      done();
    });
  });
});
