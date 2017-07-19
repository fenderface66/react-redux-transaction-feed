import styled from 'styled-components';

const Form = styled.form`

  fieldset {
    border: 0px;
    border-bottom: 1px solid #94c6f1;
    padding: 10px 0;
  }

  label {
    font-family: 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }

  input[type="submit"] {
    background: #94c6f1;
    color: #fff;
    border: 1px solid #eee;
    border-radius: 20px;
    box-shadow: 5px 5px 5px #eee;
    text-shadow: none;
    padding: 5px 15px;
    margin-top: 10px;
    margin-left: 9px;
    cursor: pointer;
    &:hover {
      background: #016ABC;

      color: #fff;

      border: 1px solid #eee;

      border-radius: 20px;

      box-shadow: 5px 5px 5px #eee;

      text-shadow:none;
    }
  }

`;

export default Form;
