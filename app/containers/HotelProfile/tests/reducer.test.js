import { fromJS } from 'immutable';
import hotelProfileReducer from '../reducer';

describe('hotelProfileReducer', () => {
  it('returns the initial state', () => {
    expect(hotelProfileReducer(undefined, {})).toEqual(fromJS({}));
  });
});
