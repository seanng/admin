/*
 *
 * TeamManagement
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectHotelId } from 'containers/App/selectors';
// import Card from 'components/Card';
import TeamMemberCard from 'components/TeamMemberCard';
import { getEmployees, setMemberToPreview } from './actions';
import {
  selectHasLoaded,
  selectMembersList,
  selectPreviewedMember,
} from './selectors';
import Container from './Container';
import ItemsContainer from './ItemsContainer';
import PreviewContainer from './PreviewContainer';

// eslint-disable-next-line react/prefer-stateless-function
export class TeamManagement extends React.PureComponent {
  componentDidMount() {
    const { fetchEmployees, hotelId } = this.props;
    fetchEmployees(hotelId);
  }

  render() {
    const {
      hasLoaded,
      membersList,
      previewedMember,
      setPreviewMember,
    } = this.props;
    const members = membersList.toJS();
    const previewedMemberJS = previewedMember.toJS();
    if (!hasLoaded) {
      return <div>loading...</div>;
    }
    return (
      <Container>
        <ItemsContainer>
          {members.map((member, index) =>
            <TeamMemberCard
              member={member}
              index={index}
              previewedMember={previewedMemberJS}
              setPreviewMember={setPreviewMember}
              key={member.id}
            />
          )}
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
  previewedMember: selectPreviewedMember(),
});

const mapDispatchToProps = dispatch => ({
  fetchEmployees: hotelId => dispatch(getEmployees(hotelId)),
  setPreviewMember: memberIndex => dispatch(setMemberToPreview(memberIndex)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TeamManagement);
