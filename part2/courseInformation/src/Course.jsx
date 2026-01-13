import Header from './Header'
import Content from './Content'
import Total from './Total'

const Course = ({name, parts, key}) => {
    return (
        <div key={key}>
          <Header course={name} />
          <Content parts={parts} />
          <Total parts={parts} />
        </div>
    )
}

export default Course
