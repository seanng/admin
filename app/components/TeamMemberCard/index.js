/**
*
* TeamMemberCard
*
*/

import React from 'react';
import { FormattedMessage } from 'react-intl';
import messages from 'containers/TeamManagement/messages';
import colors from 'themes/colors';
import { getUserType } from 'utils/helpers';
import Card from '../Card';
import ItemWrapper from './ItemWrapper';
import CardPhoto from './CardPhoto';
import TextWrapper from './TextWrapper';
import CardPhotoContainer from './CardPhotoContainer';
import ProxyContainer from './ProxyContainer';

function TeamMemberCard({
  member,
  index,
  previewedMember,
  setPreviewMember,
  promptAddMemberModal,
}) {
  if (promptAddMemberModal) {
    return (
      <ItemWrapper>
        <Card onClick={promptAddMemberModal} cursor>
          <CardPhotoContainer>
            <CardPhoto src="https://cdn2.iconfinder.com/data/icons/business-209/512/Add_Person-512.png" />
            <ProxyContainer />
          </CardPhotoContainer>
          <TextWrapper>
            <FormattedMessage {...messages.addMember} />
          </TextWrapper>
        </Card>
      </ItemWrapper>
    );
  }

  const isHighlighted = previewedMember && previewedMember.id === member.id;
  return (
    <ItemWrapper>
      <Card
        onClick={() => setPreviewMember(index)}
        color={isHighlighted && colors.accent}
        cursor
      >
        <CardPhotoContainer>
          <CardPhoto src={member.photoUrl} />
          <ProxyContainer />
        </CardPhotoContainer>
        <TextWrapper>
          {member.firstName}&nbsp;{member.lastName}
        </TextWrapper>
        <TextWrapper>
          <FormattedMessage {...messages[getUserType(member.adminLevel)]} />
        </TextWrapper>
      </Card>
    </ItemWrapper>
  );
}

export default TeamMemberCard;
