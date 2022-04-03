import { useState } from 'react'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const getTotalFeedback = () => good + neutral + bad;
  const getAverageScore = () => (good * 1 + neutral * 0 + bad * -1) / getTotalFeedback();
  const getPositivePercent = () => {
    let percentage = good * 100 / getTotalFeedback();
    return percentage + ' %';
  }

  return (
    <div>
      <h2>give feedback</h2>
      <Button name={'good'} handleClick={() => setGood(good + 1)}/>
      <Button name={'neutral'} handleClick={() => setNeutral(neutral + 1)}/>
      <Button name={'bad'} handleClick={() => setBad(bad + 1)}/>

      <h2>statistics</h2>
      <Statistic name='good' value={good}/>
      <Statistic name='neutral' value={neutral}/>
      <Statistic name='bad' value={bad}/>
      <Statistic name='all' value={getTotalFeedback()}/>
      <Statistic name='average' value={getAverageScore()}/>
      <Statistic name='positive' value={getPositivePercent()}/>
    </div>
  )
}

const Button = ({name, handleClick}) => ( <button name={name} onClick={handleClick}>{name}</button> );

const Statistic = ({name, value}) => ( <div>{name + ' ' + value}</div> );

export default App