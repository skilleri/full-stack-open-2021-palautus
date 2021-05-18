import React, {useState} from 'react';

const Header = ({text}) => (
  <h1>{text}</h1>
)

const Button = ({handleClick, text}) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const StatisticLine = ({text, value}) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
)

const Statistics = ({good, bad, neutral, all}) => {
  return (
    <table>
      <StatisticLine text="good" value={good} />
      <StatisticLine text="neutral" value={neutral} />
      <StatisticLine text="bad" value={bad} />
      <StatisticLine text="all" value={all} />
      <StatisticLine text="average" value={(good - bad) / (all) } />
      <StatisticLine text="positive" 
      value={String((good / all) * 100) + " %"} />
    </table>
  )
}

const History = ({good, bad, neutral, all}) => {
  if (all) {
    return (
      <div>
        <Statistics good={good} bad={bad} neutral={neutral} all={all} />
      </div>
    )
  }

  return (
    <div>
      No feedback given
    </div>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  
  let all = good + neutral + bad

  return (
    <div>
      <Header text="give feedback" />
      <Button handleClick={() => setGood(good + 1)} text="good" />
      <Button handleClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button handleClick={() => setBad(bad + 1)} text="bad" />
      <Header text="statistics" />
      <History good={good} bad={bad} neutral={neutral} all={all} />
    </div>
  )
}

export default App;
