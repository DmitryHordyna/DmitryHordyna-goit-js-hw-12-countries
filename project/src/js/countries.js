import API from'./api'
import cardCountrieTemplates from '../templates/countrie.hbs'
import listCountriesTempletes from '../templates/countries-list.hbs'
import refs from './refs'

const debounce = require('lodash.debounce')
let querySelector = "ukraine"

refs.input.addEventListener('input',debounce(onInputTypeCountrie,600))
refs.btnClean.addEventListener('click', toCleanAllPageBtn)


function onInputTypeCountrie() {
  querySelector= refs.input.value
    if (querySelector === '') {
        return cleanAll()
    };
      API.feacthCountries(querySelector)
        .then((countrie) => {
            if (countrie.length > 10) {
                return markupMessageManyCountries('Too many matches found. Please enter a more specific query!')
            } else if (countrie.length > 1) {
                return markupFewCountries(countrie)
            } else {
                return markupCardCountrie(countrie)
            }
        })
        .catch(error => markupMessageManyCountries('Sorry, not found. Try again!!!'));

}

function toCleanAllPageBtn(e) {
 refs.input.value=''
cleanAll()
}

function markupCardCountrie(countrie) {
    cleanAll();
    refs.cardSection.insertAdjacentHTML('beforeend', cardCountrieTemplates(countrie));
}

function markupMessageManyCountries(message) {
    cleanAll();
    refs.errorText.textContent = message;
}

function markupFewCountries(countrie) {
    cleanAll();
    refs.listCountries.insertAdjacentHTML('beforeend',listCountriesTempletes(countrie))
}

function cleanAll() {
    refs.cardSection.textContent = '';
    refs.errorText.textContent = '';
    refs.listCountries.textContent = '';
}
    
