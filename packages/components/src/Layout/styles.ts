import styled from 'styled-components';

export const Page = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: grid;
  grid-template-columns: auto;
  grid-template-rows: auto;

  > * {
    grid-column-start: 1;
    grid-column-end: 2;
    grid-row-start: 1;
    grid-row-end: 2;
  }
`;

export const Flex = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
