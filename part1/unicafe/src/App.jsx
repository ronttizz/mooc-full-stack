import { useState } from 'react'
import Button from './Button'

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const average = () => {
    if (good + neutral + bad === 0) {
      return 0
    } else {
      return (good - bad) / (good + neutral + bad)
    }
  }

  return (
  <div>
    <h1>give feedback</h1>
    <div>
      <Button onClick={() => setGood(good + 1)} text="good" />
      <Button onClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button onClick={() => setBad(bad + 1)} text="bad" />
    </div>
    <h1>statistics</h1>
    <p>good {good}</p>
    <p>neutral {neutral}</p>
    <p>bad {bad}</p>
    <p>all {good + neutral + bad}</p>
    <p>average {average()}</p>
  </div>
  )
}

export default App
