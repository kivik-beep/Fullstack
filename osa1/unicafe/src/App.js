import React, { useState } from 'react'

const Statistics = ({good, neutral, bad, total}) => {
  if (total>0) {
    return (
    <div>
      <table>
        <StatisticLine text="good" value ={good} />
        <StatisticLine text="neutral" value ={neutral} />
        <StatisticLine text="bad" value ={bad} />
        <StatisticLine text="total" value ={total} />
        <StatisticLine text="average" value ={(good-bad)/total} />
        <StatisticLine text="positive" value ={good/total *100 +' %'} />
      </table>
    </div>
    )
  } else {
    return(
      <div>
         <p>No feedback given</p>
       </div>
    )
  }
}

const StatisticLine = ({text, value}) => {
  return ( 
    <tr>
      <td>{text} </td>
      <td>{value} </td>
    </tr>
    
  )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  
  const total = good + neutral + bad


  return (
    <div>
      <h1>give feedback</h1>
      <Button
          onClick={() => setGood(good => good + 1)}
          text='good'
        />
      <Button
        onClick={() => setNeutral(neutral => neutral + 1)}
        text='neutral'
      />
      <Button
        onClick={() => setBad(bad => bad + 1)}
        text='bad'
      />
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} total={total}/>
    </div>
  )
}

const Button = ({ text, onClick }) => (
  <button onClick={onClick}>
    {text}
  </button>
);




export default App