/*
 *
 * Settings
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import makeSelectSettings from './selectors';
import { selectUser } from '../App/selectors';
import messages from './messages';
import Container from './Container';
import Head from './Head';
import Heading from './Heading';
import HeadButton from './HeadButton';

// eslint-disable-next-line react/prefer-stateless-function
export class Settings extends React.PureComponent {
  handleCancelClick = () => {};

  handleSaveClick = () => {};

  render() {
    const fullName =
      `${this.props.user.get('firstName')  } ${  this.props.user.get('lastName')}`;
    return (
      <Container>
        <Head>
          <Heading>
            {fullName}
          </Heading>
          <HeadButton onClick={this.props.handleCancelClick}>
            <FormattedMessage {...messages.cancel} />
          </HeadButton>
          <HeadButton primary onClick={this.props.handleSaveClick}>
            <FormattedMessage {...messages.save} />
          </HeadButton>
        </Head>
      </Container>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  Settings: makeSelectSettings(),
  user: selectUser(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
