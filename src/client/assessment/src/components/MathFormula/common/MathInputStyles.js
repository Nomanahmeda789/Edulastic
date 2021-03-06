import styled from 'styled-components';
import { grey, darkGrey, lightRed, lightGreen, white } from '@edulastic/colors';

const MathInputStyles = styled.div`
  .input {
    position: relative;
  }

  .input__math {
    min-height: 66px;
    display: inline-block;
    width: 100%;
    padding-right: 40px;
    position: relative;
    border-radius: 5px;
    border: 1px solid ${grey};
    padding: 15px 25px;

    &.clear {
      background: ${white};
    }
    &.wrong {
      background: ${lightRed};
    }
    &.success {
      background: ${lightGreen};
    }
  }

  .input__math__field {
    width: 100%;
    border: 0;
    display: flex;
    align-items: center;

    &.mq-focused {
      box-shadow: none;
    }
  }

  .input__math__icon {
    position: absolute;
    right: 10px;
    top: 0;
    bottom: 0;
    margin: auto;
    height: 16px;
  }

  .input__keyboard {
    position: absolute;
    top: 70px;
    left: 0px;
    right: 0px;
    z-index: 999;
    width: 545px;
  }

  .response-embed {
    display: inline-flex;
    align-items: center;
    justify-content: space-between;
    font-size: 10px;
    width: 100px;
    height: 25px;
    line-height: 25px;

    .response-embed__char {
      width: 30%;
      background: ${darkGrey};
      font-weight: 700;
      color: ${white};
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 1px solid ${grey};
      border-right: none;
      border-radius: 5px;
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
    }

    .response-embed__text {
      width: 70%;
      background: ${white};
      text-transform: uppercase;
      font-weight: 900;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 1px solid ${grey};
      border-left: none;
      border-radius: 5px;
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    }
  }
`;

export default MathInputStyles;
