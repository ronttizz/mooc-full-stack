import Part from "./Part"

const Content = (props) => {
    const parts = props.parts
    
    return(
        <div>
            {parts.map(part => 
                <Part part={part.name} exercises={part.exercises} key={part.id} />
            )}
        </div>
    )
}

export default Content
