/**
*
* TeamMemberCard
*
*/

import React from 'react';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import colors from 'themes/colors';
import { getUserType } from 'utils/helpers';
import Card from '../Card';
import ItemWrapper from './ItemWrapper';
import CardPhoto from './CardPhoto';
import TextWrapper from './TextWrapper';
import CardPhotoContainer from './CardPhotoContainer';
import ProxyContainer from './ProxyContainer';
import messages from './messages';

function TeamMemberCard({ member, index, previewedMember, setPreviewMember }) {
  const isHighlighted = previewedMember.id === member.id;
  return (
    <ItemWrapper>
      <Card
        onClick={() => setPreviewMember(index)}
        color={isHighlighted && colors.accent}
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
