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
import { getEmployees, setMemberToPreview } from './actions';
import {
  selectHasLoaded,
  selectMembersList,
  selectPreviewedMember,
} from './selectors';
import Container from './Container';
import ItemsContainer from './ItemsContainer';
import PreviewContainer from './PreviewContainer';
import ItemWrapper from './ItemWrapper';
import NameWrapper from './NameWrapper';
import CardPhoto from './CardPhoto';

// eslint-disable-next-line react/prefer-stateless-function
export class TeamManagement extends React.PureComponent {
  componentDidMount() {
    const { fetchEmployees, hotelId } = this.props;
    fetchEmployees(hotelId);
  }

  renderItem(member, index) {
    return (
      <ItemWrapper key={member.id}>
        <Card
          key={member.id}
          onClick={() => this.props.setMemberToPreview(index)}
        >
          <CardPhoto src={member.photoUrl} />
          <NameWrapper>
            {member.firstName}&nbsp; {member.lastName}
          </NameWrapper>
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
          {members.map((member, index) => this.renderItem(member, index))}
        </ItemsContainer>
        <PreviewContainer>
          {this.props.previewedMember}
        </PreviewContainer>
      </Container>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  hotelId: selectHotelId(),
  hasLoaded: selectHasLoaded(),
  membersList: selectMembersList(),
  previewedMember: selectPreviewedMember(),
});

const mapDispatchToProps = dispatch => ({
  fetchEmployees: hotelId => dispatch(getEmployees(hotelId)),
  setMemberToPreview: memberIndex => dispatch(setMemberToPreview(memberIndex)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TeamManagement);
