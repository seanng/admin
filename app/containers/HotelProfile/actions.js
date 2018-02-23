/*
 *
 * HotelProfile actions
 *
 */

import {
  GET_HOTEL_INFO,
  SET_EDITING_MODE,
  REARRANGE_PHOTOS,
  CANCEL_EDITING_MODE,
  SAVE_HOTEL_PROFILE,
  DELETE_PHOTO,
  EDIT_HOTEL_INFO,
  SELECT_AMENITY,
  REMOVE_AMENITY,
  OPEN_AMENITIES_MODAL,
  CLOSE_AMENITIES_MODAL,
  SAVE_SELECTED_AMENITIES,
  SET_LAT_LNG,
} from './constants';

export function getHotelInfo(id) {
  return {
    type: GET_HOTEL_INFO,
    id,
  };
}

export function setEditingMode() {
  return {
    type: SET_EDITING_MODE,
  };
}

export function cancelEditingMode() {
  return {
    type: CANCEL_EDITING_MODE,
  };
}

export function saveHotelProfile(hotelInfo) {
  return {
    type: SAVE_HOTEL_PROFILE,
    hotelInfo,
  };
}

export function rearrangePhotos(dragIndex, hoverIndex, dragPhoto) {
  return {
    type: REARRANGE_PHOTOS,
    dragIndex,
    hoverIndex,
    dragPhoto,
  };
}

export function deletePhoto(index) {
  return {
    type: DELETE_PHOTO,
    index,
  };
}

export function editHotelInfo(key, value) {
  return {
    type: EDIT_HOTEL_INFO,
    key,
    value,
  };
}

export function removeAmenity(index) {
  return {
    type: REMOVE_AMENITY,
    index,
  };
}

export function selectAmenity(amenity) {
  return {
    type: SELECT_AMENITY,
    amenity,
  };
}

export function openAmenitiesModal() {
  return {
    type: OPEN_AMENITIES_MODAL,
  };
}

export function closeAmenitiesModal() {
  return {
    type: CLOSE_AMENITIES_MODAL,
  };
}

export function saveSelectedAmenities() {
  return {
    type: SAVE_SELECTED_AMENITIES,
  };
}

export function setLatLng(lat, lng) {
  return {
    type: SET_LAT_LNG,
    lat,
    lng,
  };
}
