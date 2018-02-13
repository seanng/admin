/*
 *
 * HotelProfile reducer
 *
 */

import { fromJS } from 'immutable';
import {
  GET_HOTEL_INFO_SUCCESS,
  GET_HOTEL_INFO_FAIL,
  SET_EDITING_MODE,
  CANCEL_EDITING_MODE,
  REARRANGE_PHOTOS,
} from './constants';

const initialState = fromJS({
  hasLoaded: false,
  isEditingMode: false,
  hotelInfo: {},
  editedHotelInfo: {},
});

function hotelProfileReducer(state = initialState, action) {
  switch (action.type) {
    case GET_HOTEL_INFO_SUCCESS:
      return state.merge({
        isEditingMode: false,
        hotelInfo: action.info,
        hasLoaded: true,
      });
    case GET_HOTEL_INFO_FAIL:
      console.error('error getting hotel info.');
      return state;

    case SET_EDITING_MODE:
      return state.merge({
        isEditingMode: true,
        editedHotelInfo: state.get('hotelInfo').toJS(),
      });

    case CANCEL_EDITING_MODE:
      return state.merge({
        isEditingMode: false,
      });

    case REARRANGE_PHOTOS: {
      const { dragIndex, hoverIndex, dragPhoto } = action;
      /* eslint-disable no-param-reassign */
      return state.updateIn(['editedHotelInfo', 'photos'], photos => {
        photos = photos.splice(dragIndex, 1);
        photos = photos.splice(hoverIndex, 0, dragPhoto);
        return photos;
      });
    }

    default:
      return state;
  }
}

export default hotelProfileReducer;
