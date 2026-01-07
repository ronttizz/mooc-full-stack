import { useState } from 'react'
import Display from './Display'
import Button from './Button'

const App = () => {
  const [ counter, setCounter ] = useState(0)

  const setToValue = (newValue) => {
    console.log('value now', newValue)
    setCounter(newValue)
  }

  return (
    <div>
      <Display counter={counter} />
      <Button 
        onClick={() => setToValue(counter + 1)}
        text='plus'
        />
      <Button 
        onClick={() => setToValue(0)}
        text='zero'
        />
      <Button
        onClick={() => setToValue(counter - 1)}
        text='minus'
        />
    </div>
  )
}

export default App
