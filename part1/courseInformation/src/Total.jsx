const Total = (props) => {
    let total_n = 0
    props.parts.forEach(element => total_n += element[1])

    return (
        <>
            <p>Number of exercises {total_n}</p>
        </>
    )
}

export default Total
