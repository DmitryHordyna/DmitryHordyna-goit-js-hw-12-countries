import cardCountrieTemplates from'../templates/cardCountrie.hbs'

fetch('https://restcountries.eu/rest/v2/name/eesti')
    .then(response => response.json())
    .then(countrie => console.log(cardCountrieTemplates(countrie)))
    
// console.log(cardCountrieTemplates());