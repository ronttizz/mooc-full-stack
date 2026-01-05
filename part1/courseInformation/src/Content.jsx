import Part from "./Part"

const Content = (props) => {
    const parts = props.parts
    
    return(
        <>
            {parts.map(element => <Part part={element.name} exercises={element.exercises} key={element.name} />)}
        </>
    )
}

export default Content
