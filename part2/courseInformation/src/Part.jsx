const Part = (props) => {
    return (
        <p key={props.id}>
            {props.part} {props.exercises}
        </p>
    )
}

export default Part
