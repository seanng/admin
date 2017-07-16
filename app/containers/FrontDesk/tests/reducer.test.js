import { fromJS } from 'immutable';
import frontDeskReducer from '../reducer';

describe('frontDeskReducer', () => {
  it('returns the initial state', () => {
    expect(frontDeskReducer(undefined, {})).toEqual(fromJS({}));
  });
});
