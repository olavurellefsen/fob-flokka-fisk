
import React from 'react';
import styled from 'styled-components';
const PopupHero = ({ name, rank, description, selectedHero, setSelectedHero }) => {
  return (
    <ContainerStyle show={selectedHero === name}>
      <FlexStyle>
        <RowStyle>
          <h1>{`${rank}. ${name}`}</h1>
          <ButtonStyle onClick={() => { setSelectedHero("") }}>X</ButtonStyle>
        </RowStyle>
        <p>{description}</p>
      </FlexStyle>
    </ContainerStyle>
  );
};
const ContainerStyle = styled.div`
  display: none;
  position: absolute;
  ${({ show }) =>
    show &&
    `
    top: 35px;
    display: block;
    width: 300px;
    height: 300px;
    background-color: white;
    border: solid black 2px;
    z-index: 500;
  `}
`

const FlexStyle = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
  margin: 20px;
  color: black;
`

const RowStyle = styled.div`
  display: flex;
  flex-direction: row;
  align-self: stretch;
  justify-content: space-between;
`

const ButtonStyle = styled.button`
  border: none;
  background: none;
  width: 30px;
  height: 30px;
  cursor: pointer;
`
export default PopupHero;
