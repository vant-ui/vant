import Uploader from 'packages/uploader';
import { mount } from 'avoriaz';
window.File = function() {
  this.name = 'test';
};
window.FileReader = function() {
  this.readAsDataURL = this.readAsText = function() {
    this.onload && this.onload({
      target: {
        result: 'test'
      }
    });
  };
};
describe('Uploader', () => {
  let wrapper;
  afterEach(() => {
    wrapper && wrapper.destroy();
  });

  it('enabled', () => {
    wrapper = mount(Uploader, {
      propsData: {
        disabled: false
      }
    });

    expect(wrapper.contains('input')).to.equal(true);
    expect(wrapper.vm.onValueChange({ target: { files: [] }})).to.equal(undefined);
  });
});
describe('Uploader', () => {
  let wrapper;
  afterEach(() => {
    wrapper && wrapper.destroy();
  });

  it('disabled', () => {
    wrapper = mount(Uploader, {
      propsData: {
        disabled: true
      }
    });

    expect(wrapper.contains('input')).to.equal(true);
    expect(wrapper.vm.onValueChange({ target: { files: [] }})).to.equal(undefined);
  });
});
describe('Uploader', () => {
  let wrapper;
  afterEach(() => {
    wrapper && wrapper.destroy();
  });

  it('before read', () => {
    wrapper = mount(Uploader, {
      propsData: {
        disabled: false,
        beforeRead: () => {
          return false;
        }
      }
    });

    expect(wrapper.contains('input')).to.equal(true);
    expect(wrapper.vm.onValueChange({ target: { files: [new File([], '')] }})).to.equal(undefined);
  });
});
describe('Uploader', () => {
  let wrapper;
  afterEach(() => {
    wrapper && wrapper.destroy();
  });

  it('read text', () => {
    wrapper = mount(Uploader, {
      propsData: {
        disabled: false,
        afterRead: (file) => {
        }
      }
    });

    expect(wrapper.contains('input')).to.equal(true);
    expect(wrapper.vm.onValueChange({ target: { files: [new File([], '/Users')] }})).to.equal(undefined);
  });
});
describe('Uploader', () => {
  let wrapper;
  afterEach(() => {
    wrapper && wrapper.destroy();
  });

  it('read text no after hook', () => {
    wrapper = mount(Uploader, {
      propsData: {
        disabled: false,
        afterRead: (file) => {
        }
      }
    });

    expect(wrapper.contains('input')).to.equal(true);
    expect(wrapper.vm.onValueChange({ target: { files: [new File([], '/Users')] }})).to.equal(undefined);
  });
});
