const Total = (props) => {
    const total_n = props.parts.reduce((acc, part) => 
        acc + part.exercises, 0
    )

    return (
        <>
            <p><b>Number of exercises {total_n}</b></p>
        </>
    )
}

export default Total
