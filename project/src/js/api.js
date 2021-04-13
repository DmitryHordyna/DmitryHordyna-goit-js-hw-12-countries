const BASE_URL="https://restcountries.eu/rest/v2"

export default {
    feacthCountries(querySelector) {
     return   fetch(`${BASE_URL}/name/${querySelector}`)
            .then(response => {
                if (!response.ok) {
                    throw response
                }
                return response.json()
            })
    }
}

