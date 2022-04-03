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
      <Feedback name={'good'} value={good}/>
      <Feedback name={'neutral'} value={neutral}/>
      <Feedback name={'bad'} value={bad}/>
    </div>
  )
}

const Button = ({name, handleClick}) => ( <button name={name} onClick={handleClick}>{name}</button> );

const Feedback = ({name, value}) => ( <div>{name + ' ' + value}</div> );

export default App