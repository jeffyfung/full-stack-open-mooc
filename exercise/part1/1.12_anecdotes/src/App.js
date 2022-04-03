import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]
   
  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0));

  const getRandomIdx = (range) => Math.floor(Math.random() * range);
  const getIndexOfMax = (arr) => arr.indexOf(Math.max(...arr));
  const increaseVote = (idx) => {
    const newVotes = [...votes];
    newVotes[idx] += 1;
    setVotes(newVotes);
  }

  return (
    <div>
      <h2>Anecdote of the day</h2>
      <AnecdoteDisplay anecdote={anecdotes[selected]} />
      <VoteDisplay numVote={votes[selected]}/>
      <Button text="vote" handleClick={() => increaseVote(selected)}/>
      <Button text="next anecdote" handleClick={() => setSelected(getRandomIdx(anecdotes.length))}/>

      <h2>Anecdote with most votes</h2>
      <AnecdoteDisplay anecdote={anecdotes[getIndexOfMax(votes)]} />
      <VoteDisplay numVote={votes[getIndexOfMax(votes)]} />
    </div>
  )
}

const AnecdoteDisplay = ({anecdote}) => (<div>{anecdote}</div>);

const VoteDisplay = ({numVote}) => (<div>has {numVote} votes</div>)

const Button = ({text, handleClick}) => (<button name={text} onClick={handleClick}>{text}</button>);

export default App