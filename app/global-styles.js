import { injectGlobal } from 'styled-components';

/* eslint no-unused-expressions: 0 */
injectGlobal`
  html,
  body {
    height: 100%;
    width: 100%;
  }

  body {
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }

  body.fontLoaded {
    font-family: "Open Sans", sans-serif;
    letter-spacing: .045rem;
  }

  #app {
    background-color: #EDEFF5;
    min-height: 100%;
    min-width: 100%;
  }
`;
