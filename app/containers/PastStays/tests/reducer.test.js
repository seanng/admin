import { fromJS } from 'immutable';
import pastStaysReducer from '../reducer';

describe('pastStaysReducer', () => {
  it('returns the initial state', () => {
    expect(pastStaysReducer(undefined, {})).toEqual(fromJS({}));
  });
});
