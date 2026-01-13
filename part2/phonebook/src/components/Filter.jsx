const Filter = ({onChange, searchTerm}) => {
    return (
        <div>filter shown with <input onChange={onChange} value={searchTerm} /></div>
    )
}

export default Filter
