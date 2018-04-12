/**
 *
 * Container
 *
 */

import styled from 'styled-components';

const Container = styled.div`
  padding-top: ${props => (props.pt && props.pt) || (props.pv && props.pv)};
  padding-bottom: ${props => (props.pb && props.pb) || (props.pv && props.pv)};
  margin: 0 auto;
  width: 1004px;
  height: 100%;

  @media (max-width: 991px) {
    width: auto;
    padding-right: 15px;
    padding-left: 15px;
  }
`;

export default Container;
