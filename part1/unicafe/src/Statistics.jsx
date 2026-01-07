const Statistics = ({good, neutral, bad}) => {
    let total = good + neutral + bad

    if (total === 0) {
        return (
            <p>
                No feedback given
            </p>
        )
    } else {
        const average = () => (good - bad) / (total)
        const positive = () => (good/(total))*100

        return (
            <p>
                good {good}<br />
                neutral {neutral}<br />
                bad {bad}<br />
                all {total}<br />
                average {average()}<br />
                positive {positive()} %<br />
            </p>
        )
    }
}

export default Statistics
