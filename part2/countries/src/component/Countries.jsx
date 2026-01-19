import Country from './Country'

const Countries = ({countries}) => {
    console.log(countries)
    if (countries.length > 10) {
        return <p>Too many matches, specify another filter</p>
    }
    return (
        <div>
            <p>Some countries will be here</p>
            {countries.map(country => {
                <Country country={country} />
            })}
        </div>
    )
}

export default Countries
