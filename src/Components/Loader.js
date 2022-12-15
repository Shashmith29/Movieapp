import React from "react";
import styled from "styled-components";

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  font-size: 48px;
`;

export default () => (
  <Container>
    <span role="img" aria-label="loadeing">
      ♾
    </span>
  </Container>
);
