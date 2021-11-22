import React from 'react'
import { useDrag } from 'react-dnd'


export const ItemTypes = {
  KNIGHT: 'knight'
}
function Knight() {
  const [{isDragging}, drag] = useDrag(() => ({
    type: "picture",
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),
    }),
  }))

  return (
    <div
      ref={drag}
      style={{
        opacity: isDragging ? 0.5 : 1,
        fontSize: 25,
        fontWeight: 'bold',
        cursor: 'move',
      }}
    >
      ♘
    </div>
  )
}

export default Knight