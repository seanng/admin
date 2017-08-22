import { fromJS } from 'immutable';
import teamManagementReducer from '../reducer';

describe('teamManagementReducer', () => {
  it('returns the initial state', () => {
    expect(teamManagementReducer(undefined, {})).toEqual(fromJS({}));
  });
});
