const Total = (props) => {
    const total_n = props.parts.reduce((acc, part) => 
        acc + part.exercises, 0
    )

    return (
        <>
            <p>Number of exercises {total_n}</p>
        </>
    )
}

export default Total
