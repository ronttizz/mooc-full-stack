import StatisticLine from "./StatisticLine"

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
        const positive = () => (good/(total))*100 + " %"

        return (
            <p>
                <StatisticLine text="good" value={good} />
                <StatisticLine text="neutral" value={neutral} />
                <StatisticLine text="bad" value={bad} />
                <StatisticLine text="all" value={total} />
                <StatisticLine text="average" value={average()} />
                <StatisticLine text="positive" value={positive()} />
            </p>
        )
    }
}

export default Statistics
