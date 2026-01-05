const Total = (props) => {
    let total_n = 0
    props.parts.forEach(element => total_n += element.exercises)

    return (
        <>
            <p>Number of exercises {total_n}</p>
        </>
    )
}

export default Total
