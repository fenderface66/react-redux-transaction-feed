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
    font-family: 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }

  #app {
    background-color: #fafafa;
    min-height: 100%;
    min-width: 100%;
  }

  p,
  label {
    font-family: Georgia, Times, 'Times New Roman', serif;
    line-height: 1.5em;
  }

  .price {
        
    &.negative {
      color: #FF4136;
    }
    &.positive {
      color: #2ECC40;
    }
  }

  .tooltip-top {
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 0 15px 15px 15px;
    border-color: transparent transparent #f4f4f4 transparent;
    position: absolute;
    top: -15px;
    left: 50%;
    transform: translateX(-50%);    
  }

  .no-list {
    list-style: none;
    padding-left: 0;
    padding:6px;
  }

`;
