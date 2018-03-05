/*
 *
 * PastStays
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import format from 'date-fns/format';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { getFormattedDate, getFormattedDuration } from 'utils/helpers';
import { selectHotelId } from 'containers/App/selectors';
import colors from 'themes/colors';
import TableContainer from 'components/Table/Container';
import HeaderRow from 'components/Table/HeaderRow';
import HeaderCol from 'components/Table/HeaderCol';
import BodyRow from 'components/Table/BodyRow';
import BodyCol from 'components/Table/BodyCol';
import ChargesModal from 'components/ChargesModal';
import {
  fetchStays,
  fetchCharges,
  closeModal,
  handleInputChange,
  addCharge,
  saveCharges,
} from './actions';
import {
  selectHasLoaded,
  selectStays,
  selectStay,
  selectIsModalOpen,
  selectCharges,
  selectServiceInput,
  selectPriceInput,
} from './selectors';
import messages from './messages';
import Container from './Container';
import SearchContainer from './SearchContainer';

// eslint-disable-next-line react/prefer-stateless-function
export class PastStays extends React.PureComponent {
  componentDidMount() {
    console.log('the hotel id?? ', this.props.hotelId);
    this.props.fetchStays(this.props.hotelId);
  }

  onModalClose = () => {
    // perform some kind of check prior to closing?
    this.props.closeModal();
  };

  handleInputChange = event => {
    const key = event.target.name;
    const value = event.target.value;
    this.props.handleInputChange(key, value);
  };

  handleAddCharge = () => {
    const { selectedStay, serviceInput, priceInput } = this.props;
    const charge = {
      stayId: selectedStay.get('id'),
      service: serviceInput,
      charge: (priceInput * 1).toFixed(2),
      status: 'Unsettled',
      updated: false,
    };
    this.props.addCharge(charge);
    this.props.handleInputChange('serviceInput', '');
    this.props.handleInputChange('priceInput', '');
  };

  handleUpdateCharges = () => {
    const newCharges = this.props.charges
      .toJS()
      .filter(charge => charge.updated === false);
    const newTotal = newCharges.reduce(
      (prev, current) => (prev * 1 + current.charge * 1).toFixed(2),
      this.props.selectedStay.get('totalCharge') * 1
    );
    const stayId = this.props.selectedStay.get('id');
    this.props.saveCharges(newCharges, newTotal, stayId);
  };

  render() {
    const {
      hasLoaded,
      stays,
      selectedStay,
      isModalOpen,
      charges,
      serviceInput,
      priceInput,
    } = this.props;
    if (!hasLoaded) {
      return <Container />;
    }
    return (
      <Container>
        <SearchContainer />
        <TableContainer>
          <HeaderRow mb="10px">
            <HeaderCol>
              <FormattedMessage {...messages.dates} />
            </HeaderCol>
            <HeaderCol width="204px">
              <FormattedMessage {...messages.guest} />
            </HeaderCol>
            <HeaderCol>
              <FormattedMessage {...messages.roomNumber} />
            </HeaderCol>
            <HeaderCol>
              <FormattedMessage {...messages.checkIn} />
            </HeaderCol>
            <HeaderCol>
              <FormattedMessage {...messages.checkOut} />
            </HeaderCol>
            <HeaderCol>
              <FormattedMessage {...messages.duration} />
            </HeaderCol>
            <HeaderCol>
              <FormattedMessage {...messages.roomRate} />
            </HeaderCol>
            <HeaderCol>
              <FormattedMessage {...messages.surcharges} />
            </HeaderCol>
            <HeaderCol>
              <FormattedMessage {...messages.totalAmount} />
            </HeaderCol>
          </HeaderRow>
          {stays.toJS().map(stay =>
            <BodyRow
              key={stay.id}
              onClick={() => this.props.fetchCharges(stay.id)}
            >
              <BodyCol>
                {getFormattedDate(
                  new Date(stay.checkInTime),
                  new Date(stay.checkOutTime)
                )}
              </BodyCol>
              <BodyCol width="204px">
                {stay.customerName}
              </BodyCol>
              <BodyCol>
                {stay.roomNumber}
              </BodyCol>
              <BodyCol>
                {format(new Date(stay.checkInTime), 'h:mm a')}
              </BodyCol>
              <BodyCol>
                {format(new Date(stay.checkOutTime), 'h:mm a')}
              </BodyCol>
              <BodyCol>
                {getFormattedDuration(
                  new Date(stay.checkInTime),
                  new Date(stay.checkOutTime)
                )}
              </BodyCol>
              <BodyCol>
                $ {(stay.roomCharge ? stay.roomCharge * 1 : 0).toFixed(2)}
              </BodyCol>
              <BodyCol color={colors.primary}>
                $ {(stay.totalCharge * 1 - stay.roomCharge * 1).toFixed(2)}
              </BodyCol>
              <BodyCol>
                $ {(stay.totalCharge ? stay.totalCharge * 1 : 0).toFixed(2)}
              </BodyCol>
            </BodyRow>
          )}
        </TableContainer>
        <ChargesModal
          isOpen={isModalOpen}
          handleInputChange={this.handleInputChange}
          closeModal={this.onModalClose}
          charges={charges.toJS()}
          stay={selectedStay.toJS()}
          serviceInput={serviceInput}
          priceInput={priceInput}
          updateCharges={this.handleUpdateCharges}
          addCharge={this.handleAddCharge}
        />
      </Container>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  hotelId: selectHotelId(),
  hasLoaded: selectHasLoaded(),
  isModalOpen: selectIsModalOpen(),
  selectedStay: selectStay(),
  stays: selectStays(),
  charges: selectCharges(),
  serviceInput: selectServiceInput(),
  priceInput: selectPriceInput(),
});

const mapDispatchToProps = {
  fetchStays,
  closeModal,
  handleInputChange,
  fetchCharges,
  addCharge,
  saveCharges,
};

export default connect(mapStateToProps, mapDispatchToProps)(PastStays);
