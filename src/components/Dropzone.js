import React, { useState } from 'react'
import { Droppable, Draggable } from 'react-beautiful-dnd'
import styled from 'styled-components'
import { media } from '../utils/mediaTemplate'
import PopupHero from './PopupHero'

const Dropzone = ({ isDropDisabled, heroes, id, endGame, gameState, color }) => {
  const [selectedHero, setSelectedHero] = useState("")

  return (
    <HeroContainerStyle>
      <div className="h3" style={{ marginTop: "20px", borderBottom: `${gameState === "review" ? `10px ${color} solid` : ""}` }}>{id}</div>
      <Droppable droppableId={id} isDropDisabled={isDropDisabled}>
        {(provided) => {
          return (
            <div
              className="menu hero-list"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {heroes.map(({ name, color, rank, description, comics, width }, index) => (
                <Hero key={name} name={name} description={description} index={index}
                  color={color} gameState={gameState} rank={rank}
                  selectedHero={selectedHero}
                  setSelectedHero={setSelectedHero}
                  comics={comics}
                  width={width}
                />
              ))}
              {provided.placeholder}
            </div>
          )
        }}
      </Droppable>
    </HeroContainerStyle>
  )
}
const Hero = ({ name, color, rank, description, comics, index, gameState,
  selectedHero, setSelectedHero, width }) => {
  return (
    <Draggable key={index} draggableId={name} index={index}>
      {(provided) => {
        return (
          <HeroStyle
            review={gameState === "review"}
            color={color}
            className="center-column"
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            width={width}
          >
            <img
              src={`./hero_icons/${name
                .toLowerCase()
                .replaceAll(' ', '-')}.png`}
              alt={name}
              style={{ width: width }
            }
            />
            <TextStyle onClick={() => {
              setSelectedHero(name)
            }} title={description} className="tile-content" color={gameState === "review" ? "white" : "black"} background_color={gameState === "review" ? comics === "Botnfiskur" ? "steelblue" : "olive" : ""}>
              {name}
            </TextStyle>
            {gameState === "review" &&
              <PopupHero name={name} rank={rank} description={description}
                selectedHero={selectedHero} setSelectedHero={setSelectedHero}
              />}
          </HeroStyle>
        )
      }}
    </Draggable>
  )
}

const HeroContainerStyle = styled.div`
  /* width: 261px; */
  width: 33%;
  ${media.tablet`
  width: 100%;
  `}
`
const HeroStyle = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 135px;
   ${({ review, color }) =>
    review && color &&
    `
    background-color: ${color};
    color: white;

    `}
`

const TextStyle = styled.div`
  background-color: ${props => props.background_color};
  color: ${props => props.color};
  position: absolute;
  top: -3%;
`

export default Dropzone
