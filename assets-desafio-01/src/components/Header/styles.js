import styled from "styled-components";


export const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background: var(--blue);
  height: 17vh;
  .left{
    margin-right:3vw;
  }
  .right {
    width: 33%;
    display: flex;
    justify-content: center;
    text-align: center;
  }
  a{
    color: var(--white);
    margin-left: 3vw;
  }
  h3 {
    font-size: 20px;
    font-family: 'Raleway', sans-serif;
  }

  @media (min-width: 500px) {
    height: 15vh;
  }
`;
