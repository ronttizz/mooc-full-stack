import Part from "./Part"

const Content = (props) => {
    const parts = props.parts
    
    return(
        <div>
            <Part part={parts[0].name} exercises={parts[0].exercises} />
            <Part part={parts[1].name} exercises={parts[1].exercises} />
            <Part part={parts[1].name} exercises={parts[1].exercises} />
        </div>
    )
}

export default Content
