import { useState } from 'react'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <h2>give feedback</h2>
      <Button name={'good'} handleClick={() => setGood(good + 1)}/>
      <Button name={'neutral'} handleClick={() => setNeutral(neutral + 1)}/>
      <Button name={'bad'} handleClick={() => setBad(bad + 1)}/>

      <h2>statistics</h2>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

const Button = ({name, handleClick}) => ( <button name={name} onClick={handleClick}>{name}</button> );

const Statistics = ({good, neutral, bad}) => {

  const getTotalFeedback = () => good + neutral + bad;
  const getAverageScore = () => (good * 1 + neutral * 0 + bad * -1) / getTotalFeedback();
  const getPositivePercent = () => {
    let percentage = good * 100 / getTotalFeedback();
    return percentage + ' %';
  }

  if (getTotalFeedback() > 0) {
    return (
      <table>
        <tbody>
          <tr><StatisticLine name='good' value={good}/></tr>
          <tr><StatisticLine name='neutral' value={neutral}/></tr>
          <tr><StatisticLine name='bad' value={bad}/></tr>
          <tr><StatisticLine name='all' value={getTotalFeedback()}/></tr>
          <tr><StatisticLine name='average' value={getAverageScore()}/></tr>
          <tr><StatisticLine name='positive' value={getPositivePercent()}/></tr>
        </tbody>
      </table>
    )  
  }

  return (<div>No feedback given</div>)
  
}

const StatisticLine = ({name, value}) => {
  return (
    <>
      <td>{name}</td>
      <td>{value}</td>
    </>
  )
}

export default App