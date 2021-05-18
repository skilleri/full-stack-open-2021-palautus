import React, { useState } from 'react'

const Button = ({handleClick, text}) => (
  <button onClick={handleClick}>{text}</button>
)

const Anecdote = ({anecdote, points}) => (
  <div>
    <p>{anecdote}</p>
    <p>has {points} votes</p>
  </div>
)

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
  ]
   
  const [selected, setSelected] = useState(0)

  const [points, setPoints] = useState(new Array(anecdotes.length).fill(0))

  const new_anecdote = () => {
    const min = Math.ceil(0)
    const max = Math.floor(anecdotes.length - 1)
    setSelected(Math.floor(Math.random() * (max - min + 1) + min))
  }

  const vote = () => {
    const copy = [...points]
    copy[selected] += 1
    setPoints(copy)
  }

  var biggest_index = points.indexOf(Math.max(...points))

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <Anecdote anecdote={anecdotes[selected]} points={points[selected]} />
      <Button handleClick={vote} text="vote" />
      <Button handleClick={new_anecdote} text="next anecdote" />
      <h1>Anecdote with most votes</h1>
      <Anecdote anecdote={anecdotes[biggest_index]} 
      points={points[biggest_index]} />
    </div>
  )
}

export default App
