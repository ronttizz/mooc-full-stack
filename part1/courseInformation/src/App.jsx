import Header from './Header'
import Content from './Content'
import Total from './Total'

const App = () => {
  const course = 'Half Stack application development'
  // const part1 = 'Fundamentals of React'
  // const exercises1 = 10
  // const part2 = 'Using props to pass data'
  // const exercises2 = 7
  // const part3 = 'State of a component'
  // const exercises3 = 14
  const parts = [
    ['Fundamentals of React', 10],
    ['Using props to pass data', 7],
    ['State of a component',14],
  ]

  return (
    <div>
      <Header course={course} />
      <Content parts={parts} />
      <Total parts={parts} />
    </div>
  )
}

export default App
