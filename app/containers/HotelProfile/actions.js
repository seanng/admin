/*
 *
 * HotelProfile actions
 *
 */

import {
  GET_HOTEL_INFO,
  TOGGLE_EDITING_MODE,
  SAVE_HOTEL_PROFILE,
  SELECT_AMENITY,
  TOGGLE_AMENITIES_MODAL,
  ADD_REMOVED_PHOTO,
  RESTORE_REMOVED_PHOTOS,
  ERASE_HOTEL_PHOTOS,
} from './constants';

export function getHotelInfo(id) {
  return {
    type: GET_HOTEL_INFO,
    id,
  };
}

export function toggleEditingMode(isEditingMode) {
  return {
    type: TOGGLE_EDITING_MODE,
    isEditingMode,
  };
}

export function saveHotelProfile(hotelInfo, shouldHandleImageBlobs) {
  return {
    type: SAVE_HOTEL_PROFILE,
    hotelInfo,
    shouldHandleImageBlobs,
  };
}

export function selectAmenity(amenity) {
  return {
    type: SELECT_AMENITY,
    amenity,
  };
}

export function toggleAmenitiesModal(shouldDisplay, amenities) {
  return {
    type: TOGGLE_AMENITIES_MODAL,
    shouldDisplay,
    amenities,
  };
}

export function addRemovedPhoto(photoUrl) {
  return {
    type: ADD_REMOVED_PHOTO,
    photoUrl,
  };
}

export function restoreRemovedPhotos() {
  return {
    type: RESTORE_REMOVED_PHOTOS,
  };
}

export function eraseHotelPhotos(photos) {
  return {
    type: ERASE_HOTEL_PHOTOS,
    photos,
  };
}
