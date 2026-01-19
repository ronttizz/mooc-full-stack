const Country = ({country}) => {
    return (
        <div>
            <h1>{country.name.common}</h1>
            <p>
                Capital: {country.capital[0]} <br />
                Area: {country.area}
            </p>
            <h2>Languages</h2>
            <ul>
                {Object.values(country.languages).map(lang => <li key={lang}>{lang}</li>)}
            </ul>
            <img src={country.flags.svg} alt={country.name.official} />
        </div>
    )
}

export default Country
