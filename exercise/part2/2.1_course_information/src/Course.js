const Header = ({ course }) => <h1>{course}</h1>

const Part = ({ part }) => <p>{part.name} {part.exercises}</p>

const Content = ({ parts }) => parts.map(part => <Part key={part.id} part={part} />);

const Total = ({ parts }) => {
  let sum = parts.reduce((accumulator, part) => accumulator + part.exercises, 0);
  return <p>total of {sum} exercises</p>
}

const Course = ({ course }) => (
  <>
    <Header course={course.name} />
    <Content parts={course.parts} />
    <Total parts={course.parts} />
  </>
)

export default Course