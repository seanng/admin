/*
 *
 * TeamManagement
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectHotelId } from 'containers/App/selectors';
import Card from 'components/Card';
import { getEmployees } from './actions';
import { selectHasLoaded, selectMembersList } from './selectors';
import Container from './Container';
import ItemsContainer from './ItemsContainer';
import PreviewContainer from './PreviewContainer';
import ItemWrapper from './ItemWrapper';

// eslint-disable-next-line react/prefer-stateless-function
export class TeamManagement extends React.PureComponent {
  componentDidMount() {
    const { fetchEmployees, hotelId } = this.props;
    fetchEmployees(hotelId);
  }

  renderItem(member) {
    return (
      <ItemWrapper key={member.id}>
        <Card key={member.id}>
          {member.firstName}
        </Card>
      </ItemWrapper>
    );
  }

  render() {
    const { hasLoaded, membersList } = this.props;
    const members = membersList.toJS();
    if (!hasLoaded) {
      return <div>loading...</div>;
    }
    return (
      <Container>
        <ItemsContainer>
          {members.map(member => this.renderItem(member))}
        </ItemsContainer>
        <PreviewContainer />
      </Container>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  hotelId: selectHotelId(),
  hasLoaded: selectHasLoaded(),
  membersList: selectMembersList(),
});

const mapDispatchToProps = dispatch => ({
  fetchEmployees: hotelId => dispatch(getEmployees(hotelId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TeamManagement);
