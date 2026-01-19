import Country from './Country'

const Countries = ({countries, onClickShow}) => {
    console.log(countries)
    if (countries.length > 10) {
        return <p>Too many matches, specify another filter</p>
    }
    return (
        <div>
            {countries.length > 1 
                ? countries.map(country => <p key={country.cca3}>{country.name.common} <button onClick={() => onClickShow(country.name.common)} >Show</button></p>)
                : countries.map(country => <Country country={country} key={country.cca3} />)
            }
        </div>
    )
}

export default Countries
