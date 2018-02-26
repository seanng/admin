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
  DELETE_PHOTO,
  ADD_PHOTO,
  SAVE_HOTEL_PROFILE_SUCCESS,
  EDIT_HOTEL_INFO,
  OPEN_AMENITIES_MODAL,
  CLOSE_AMENITIES_MODAL,
  REMOVE_AMENITY,
  SAVE_SELECTED_AMENITIES,
  SELECT_AMENITY,
  SET_LAT_LNG,
} from './constants';

const initialState = fromJS({
  hasLoaded: false,
  isEditingMode: false,
  hotelInfo: {},
  editedHotelInfo: {},
  selectedAmenities: [],
  isAmenitiesModalOpen: false,
});

function hotelProfileReducer(state = initialState, action) {
  switch (action.type) {
    case GET_HOTEL_INFO_SUCCESS: {
      const hotelInfo = { ...action.info };
      Object.keys(hotelInfo).forEach(key => {
        if (hotelInfo[key] === null) {
          hotelInfo[key] = '';
        }
      });
      return state.merge({
        isEditingMode: false,
        hotelInfo,
        hasLoaded: true,
      });
    }
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

    case ADD_PHOTO: {
      return state.updateIn(['editedHotelInfo', 'photos'], photos => {
        photos = photos.push(action.imagePreviewUrl);
        return photos;
      });
    }

    case DELETE_PHOTO: {
      return state.updateIn(['editedHotelInfo', 'photos'], photos => {
        photos = photos.splice(action.index, 1);
        return photos;
      });
    }

    case SAVE_HOTEL_PROFILE_SUCCESS:
      return state.merge({
        isEditingMode: false,
        hotelInfo: action.hotelInfo,
        hasLoaded: true,
      });

    case EDIT_HOTEL_INFO:
      return state.setIn(['editedHotelInfo', action.key], action.value);

    case SELECT_AMENITY:
      return state.update('selectedAmenities', selectedAmenities => {
        const amenityIndex = selectedAmenities.indexOf(action.amenity);
        if (amenityIndex === -1) {
          selectedAmenities = selectedAmenities.push(action.amenity);
          return selectedAmenities;
        }
        selectedAmenities = selectedAmenities.splice(amenityIndex, 1);
        return selectedAmenities;
      });

    case REMOVE_AMENITY:
      return state.updateIn(['editedHotelInfo', 'amenities'], amenities => {
        amenities = amenities.splice(action.index, 1);
        return amenities;
      });

    case OPEN_AMENITIES_MODAL:
      return state.merge({
        selectedAmenities: state.getIn(['editedHotelInfo', 'amenities']),
        isAmenitiesModalOpen: true,
      });

    case CLOSE_AMENITIES_MODAL:
      return state.set('isAmenitiesModalOpen', false);

    case SAVE_SELECTED_AMENITIES:
      return state
        .merge({
          isAmenitiesModalOpen: false,
        })
        .mergeIn(
          ['editedHotelInfo', 'amenities'],
          state.get('selectedAmenities')
        );

    case SET_LAT_LNG:
      return state
        .setIn(['editedHotelInfo', 'lat'], action.lat)
        .setIn(['editedHotelInfo', 'lng'], action.lng);

    default:
      return state;
  }
}

export default hotelProfileReducer;
