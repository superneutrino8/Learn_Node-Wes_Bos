const axios = require("axios");

function searchResultHTML(stores) {
    return stores
        .map((store) => {
            return `
        <a href="/store/${store.slug}" class="search__result">
            <strong>${store.name}</strong>
        </a>
        `;
        })
        .join("");
}

function typeAhead(search) {
    const searchInput = search.querySelector(".search__input");
    const searchResult = search.querySelector(".search__results");

    searchInput.on("input", function() {
        if (!this.value) {
            searchResult.style.display = "none";
            return;
        }
        searchResult.style.display = "block";
        axios.get(`/api/search/?q=${this.value}`).then((res) => {
            if (res.data.length) {
                searchResult.innerHTML = searchResultHTML(res.data);
                return;
            }
            searchResult.innerHTML = `<div class="search__result">No results for ${this.value}</div>`;
        });
    });
}

export default typeAhead;
