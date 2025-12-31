import Part from "./Part"

const Content = (props) => {
    const parts = props.parts
    
    return(
        <>
            {parts.map(element => <Part part={element[0]} exercises={element[1]} key={element[0]} />)}
        </>
    )
}

export default Content
