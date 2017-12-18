// @flow
import { Observable } from 'rxjs/Observable';
import { ofType } from 'redux-observable';
import { map } from 'rxjs/operators';

export function navigationEpic(action$: Observable) {
  return action$.pipe(
    ofType('PING'),
    map(() => ({ type: 'PONG' }))
  );
}
