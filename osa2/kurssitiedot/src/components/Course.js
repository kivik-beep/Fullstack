import React from 'react'

const Course = ({course}) => {
    return (
      <div>
        <Header name={course.name} />
        <Content parts={course.parts}/>
        <Total parts={course.parts}/>
      </div>
    )
  }
  
  
  const Header = ({name}) => {
    return (
      <div>
        <h2>{name}</h2>
      </div>  
    )
  }
  
  const Content = ({parts}) => {
    return (
      <div>
        {parts.map(part =>
          <Part key={part.id} part={part} />
        )}  
      </div>
    )
  }
  
  const Part = ({part}) => {
    return (
      <p>{part.name} {part.exercises}</p>
    )
  }
  
  const Total = ({parts}) => {
    const ex = parts.map(part => part.exercises)
    const total = 
      ex.reduce( (prev, curr) => prev+curr)
    
    return (
      <div>
        <b>total of {total} exercises</b>
      </div>
    )
  }
  
  export default Course