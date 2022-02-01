import React, { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.'
  ]
  const len = anecdotes.length
  const [points, setPoints] = useState(new Uint8Array(len))
   
  const [selected, setSelected] = useState(0)
  const increaseByOne = () => {
    const copy = [...points]
    copy[selected] += 1
    setPoints(copy)
  }

  return (
    <div>
      <h1>Welcome!</h1>
      <h2>Anecdote of the day</h2>
      <p>{anecdotes[selected]}</p>
      <p>has {points[selected]} votes</p>
      <Button
          onClick={() => setSelected(Math.floor(Math.random() * len))}
          text='next anecdote'
        />
        <Button
          onClick={increaseByOne}
          text='vote'
        />
        <h2>Anecdote with most votes</h2>
        <p>{anecdotes[points.indexOf(Math.max(...points))]}</p>
        <p>has {Math.max(...points)} votes</p>
    </div>
  )
}

const Button = ({ text, onClick }) => (
  <button onClick={onClick}>
    {text}
  </button>
);

export default App