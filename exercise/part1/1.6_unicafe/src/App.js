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
      <div>
        <StatDisplay name='good' value={good}/>
        <StatDisplay name='neutral' value={neutral}/>
        <StatDisplay name='bad' value={bad}/>
        <StatDisplay name='all' value={getTotalFeedback()}/>
        <StatDisplay name='average' value={getAverageScore()}/>
        <StatDisplay name='positive' value={getPositivePercent()}/>
      </div>
    )  
  }

  return (<div>No feedback given</div>)
  
}

const StatDisplay = ({name, value}) => ( <div>{name + ' ' + value}</div> );

export default App