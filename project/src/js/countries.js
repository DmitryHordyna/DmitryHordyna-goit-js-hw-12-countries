import API from'./api'
import cardCountrieTemplates from '../templates/countrie.hbs'
import listCountriesTempletes from '../templates/countries-list.hbs'

const refs = {
    cardSection: document.querySelector('.js-countrie-section'),
    formSearch: document.querySelector('.js-search-form'),
    errorText: document.querySelector('.box-error_message'),
    listCountries: document.querySelector('.list-countries'),
    btnClean: document.querySelector('.js-button'),
    input:document.querySelector('.form-control')
    
    
}
let querySelector = "ukraine"

refs.formSearch.addEventListener('input',onInputTypeCountrie)
refs.btnClean.addEventListener('click', toCleanAllPageBtn)


function onInputTypeCountrie(e) {
    querySelector = e.currentTarget.elements.query.value;
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
    
