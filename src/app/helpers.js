// @flow
import { defaultFormat } from 'react-day-picker/DayPickerInput';
import { Record } from './models';
import { DEFAULT_TOAST_TIMEOUT } from './constants';
import Noty from 'noty';

export function actionCreator<T>(type: string) {
  return function (payload: T) {
    return { type, payload };
  };
}

export function reducer<T>(initialState: T, handlers: { [key: string]: (state: T, action: any) => T }) {
  return function reducer(state: T = initialState, action: any) {
    if (handlers.hasOwnProperty(action.type)) {
      return handlers[action.type](state, action);
    } else {
      return state;
    }
  };
}

export function formatDate(date: Date | string) {
  if (typeof date === 'string') {
    date = new Date(date);
  }

  return defaultFormat(date);
}

export function getRidAsId(record: Record): string {
  if (!record) {
    return '';
  }

  const rid = record['@rid'];
  return rid.substr(1, rid.length);
}

export function showError(text: string) {
  new Noty({
    theme: 'metroui',
    type: 'error',
    timeout: DEFAULT_TOAST_TIMEOUT,
    layout: 'bottomRight',
    text
  }).show();
}

export function showSuccess(text: string) {
  new Noty({
    theme: 'metroui',
    type: 'success',
    timeout: DEFAULT_TOAST_TIMEOUT,
    layout: 'bottomRight',
    text
  }).show();
}