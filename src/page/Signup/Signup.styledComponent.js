import styled from "styled-components";

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  .btn-modal-signup {
    text-decoration: none;
    color: #fff;
    width: 30%;
    height: 50px;
    background: #111;
    line-height: 50px;
    text-align: center;
    border-radius: 5px;
  }

  .modal-signup {
    height: 550px;
    width: 60%;
    background: #fff;
    position: relative;
    border-radius: 10px;
    box-shadow: 0px 3px 30px #00000029;
  }

  .modal-signup-top {
    display:flex;
    justify-content:space-between;
    align-items: center;
    padding: 10px 34px;
    border-bottom: 1px solid #00000029;
    .title-modal-signu {
      font-size: 22px;
      font-weight: bold;
    }
  }

  label {
    display: block;

    input {
      width: 100%;
      height: 35px;
      border: 1px solid #111;
      border-radius: 5px;
      padding: 0 5px;
    }
  }
  .btn-close {
    display: block;
    text-align: center;
    line-height: 20px;
    width: 20px;
    height: 20px;
    border-radius: 25px;
    color:  #899EFF;
    border: 1px solid  #899EFF;
  }
  h1 {
    margin: 20px 0;
    font-size: 22px;
    text-align: center;
  }

  .btn-next {
    background: #111;
    border: none;
    color: #fff;
    min-width: 120px;
    height: 30px;
    margin: 30px 0px 10px 0px;
    border-radius: 26px;
    cursor: pointer;
    text-align: center;
  }

  .btn-next:disabled{
    background:gray;
    cursor: not-allowed
  }

  .btn-back {
    border: 1px solid #111;
    color: #111;
    min-width: 120px;
    height: 30px;
    border-radius: 26px;
    cursor: pointer;
    text-align: center;
  }
`;

export default Wrapper;