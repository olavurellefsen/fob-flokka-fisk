import React from 'react'
import { Droppable, Draggable } from 'react-beautiful-dnd'

const Dropzone = ({ isDropDisabled, heroes, id, endGame }) => (
  <div>
    <div className="h3">{id}</div>
    {endGame && heroes.length === 0 && (
      <button className="btn btn-default" onClick={endGame}>
        Enda spælið
      </button>
    )}
    <Droppable droppableId={id} isDropDisabled={isDropDisabled}>
      {(provided) => {
        return (
          <div
            className="menu hero-list background"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {heroes.map(({ name }, index) => (
              <Hero key={name} name={name} index={index} />
            ))}
            {provided.placeholder}
          </div>
        )
      }}
    </Droppable>
  </div>
)

const Hero = ({ name, index }) => (
  <Draggable key={index} draggableId={name} index={index}>
    {(provided) => {
      return (
        <div
          className="menu-item tile tile-centered"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <figure
            style={{ backgroundColor: 'transparent' }}
            // className="avatar tile-icon"
          >
            <img
               className="img-hero"
              src={`./hero_icons/${name
                .toLowerCase()
                .replaceAll(' ', '-')}.png`}
              alt={name}
            />
          </figure>
          <div className="tile-content">{name}</div>
        </div>
      )
    }}
  </Draggable>
)

export default Dropzone
