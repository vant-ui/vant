import { HTMLAttributes, InputHTMLAttributes } from 'vue';
import {
  isObject,
  isPromise,
  isFunction,
  getRootScrollTop,
  setRootScrollTop,
} from '../utils';
import type { FieldRule, FieldType, FieldAutosizeConfig } from './types';

export function isEmptyValue(value: unknown) {
  if (Array.isArray(value)) {
    return !value.length;
  }
  if (value === 0 || typeof value === 'boolean') {
    return false;
  }
  return !value;
}

export function runSyncRule(value: unknown, rule: FieldRule) {
  if (isEmptyValue(value)) {
    if (rule.required) {
      return false;
    }
    if (rule.validateEmpty === false) {
      return true;
    }
  }
  if (rule.pattern && !rule.pattern.test(String(value))) {
    return false;
  }
  return true;
}

export function runRuleValidator(value: unknown, rule: FieldRule) {
  return new Promise((resolve) => {
    const returnVal = rule.validator!(value, rule);

    if (isPromise(returnVal)) {
      returnVal.then(resolve);
      return;
    }

    resolve(returnVal);
  });
}

export function getRuleMessage(value: unknown, rule: FieldRule) {
  const { message } = rule;

  if (isFunction(message)) {
    return message(value, rule);
  }
  return message || '';
}

export function startComposing({ target }: Event) {
  target!.composing = true;
}

export function endComposing({ target }: Event) {
  if (target!.composing) {
    target!.composing = false;
    target!.dispatchEvent(new Event('input'));
  }
}

export function resizeTextarea(
  input: HTMLInputElement,
  autosize: true | FieldAutosizeConfig,
) {
  const scrollTop = getRootScrollTop();
  input.style.height = 'auto';

  let height = input.scrollHeight;
  if (isObject(autosize)) {
    const { maxHeight, minHeight } = autosize;
    if (maxHeight !== undefined) {
      height = Math.min(height, maxHeight);
    }
    if (minHeight !== undefined) {
      height = Math.max(height, minHeight);
    }
  }

  if (height) {
    input.style.height = `${height}px`;
    // https://github.com/vant-ui/vant/issues/9178
    setRootScrollTop(scrollTop);
  }
}

export function mapInputType(
  type: FieldType,
  inputmode?: HTMLAttributes['inputmode'],
): {
  type: InputHTMLAttributes['type'];
  inputmode?: HTMLAttributes['inputmode'];
} {
  // type="number" is weird in iOS, and can't prevent dot in Android
  // so use inputmode to set keyboard in modern browsers
  if (type === 'number') {
    type = 'text';
    inputmode ??= 'decimal';
  }

  if (type === 'digit') {
    type = 'tel';
    inputmode ??= 'numeric';
  }

  return { type, inputmode };
}

// get correct length of emoji
// https://github.com/vant-ui/vant/issues/10032
export function getStringLength(str: string) {
  return [...str].length;
}

// cut string with emoji
export function cutString(str: string, maxlength: number) {
  return [...str].slice(0, maxlength).join('');
}
