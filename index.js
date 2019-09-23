const searchBar = document.querySelector('#brewery-search');
const info = document.querySelector('#info');


const findBrewery = (e) => {
    e.preventDefault();
    info.innerHTML = ""


    const text = (document.querySelector('[id=search-bar]').value);
    const stateText = (document.querySelector('[id=state-bar]').value);
    const cityText = (document.querySelector('[id=city-bar]').value);

    if(cityText != "") {
        info.innerHTML += `<h2 class="centre-text result-header">Showing results for ${cityText}</h2>`
        const theUrl = `https://api.openbrewerydb.org/breweries?by_city=${cityText}`;
        const beerUrl = fetch(theUrl);
        console.log(theUrl)
        beerUrl
            .then(response => response.json())
            .then(data => {
                if(data.length > 0) {
                    data.forEach(brewery => {
                        info.innerHTML += `
                        <div class="brewery-section">
                        <h2>${brewery.name}</h2>
                        <p><strong>website:</strong> <a href="${brewery.website_url}" target="_blank">${brewery.website_url}</a></p>
                        <p><strong>Type:</strong> ${brewery.brewery_type}</p>
                        <p><strong>Address:</strong> ${brewery.street}, ${brewery.city}, ${brewery.state}, ${brewery.country} </p>
                        </div>
                        `
                    });
                } else {
                    info.innerHTML += "<h2 class='centre-text result-header'>No results found</h2>";
                };
            });

    } else {
        if (text && !stateText) {
            info.innerHTML += `<h2 class="centre-text result-header">Showing results for ${text}.</h2>`
        } else if (stateText && !text) {
            info.innerHTML += `<h2 class="centre-text result-header">Showing results for ${stateText}.</h2>`
        } else {
            info.innerHTML += `<h2 class="centre-text result-header">Showing results for ${text}, ${stateText}.</h2>`
        }
        const theUrl = `https://api.openbrewerydb.org/breweries?by_name=${text}&by_state=${stateText}`;
        const beerUrl = fetch(theUrl);
        console.log(theUrl)
        beerUrl
            .then(response => response.json())
            .then(data => {
                if(data.length > 0) {
                    data.forEach(brewery => {
                        info.innerHTML += `
                        <div class="brewery-section">
                        <h2>${brewery.name}</h2>
                        <p><strong>website:</strong> <a href="${brewery.website_url}" target="_blank">${brewery.website_url}</a></p>
                        <p><strong>Type:</strong> ${brewery.brewery_type}</p>
                        <p><strong>Address:</strong> ${brewery.street}, ${brewery.city}, ${brewery.state}, ${brewery.country} </p>
                        </div>
                        `
                    });
                } else {
                    info.innerHTML += "<h2 class='centre-text result-header'>No results found</h2>";
                };
            });
        };
        searchBar.reset()
};




searchBar.addEventListener('submit', findBrewery); 