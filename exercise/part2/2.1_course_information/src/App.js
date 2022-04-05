const Header = ({ course }) => <h1>{course}</h1>

const Part = ({ part }) => <p>{part.name} {part.exercises}</p>

const Content = ({ parts }) => parts.map(part => <Part key={part.id} part={part} />);

const Total = ({ parts }) => {
  let sum = parts.reduce((accumulator, part) => accumulator + part.exercises, 0);
  return <p>total of {sum} exercises</p>
}

const getSum = (arr) => {
  const reducer = (acc, item) => {
    console.log(acc);
    console.log('item: ', item)
    console.log('exercises: ', item.exercises)
    return acc + item.exercises;
  }
  return arr.reduce(reducer, 0)
}

const Course = ({ course }) => (
  <>
    <Header course={course.name} />
    <Content parts={course.parts} />
    <Total parts={course.parts} />
  </>
)

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }

  return <Course course={course} />

}

export default App

