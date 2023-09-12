class MarvelServices {
    _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    _apiKey = 'apikey=afbc522c76c53f986dbf21e44a3c45e3';
    _baseOffset = 210;
    _total = 0;

    getResource = async (url) => {
        let res = await fetch(url);
        
        if (!res.ok) {
            throw new Error (`Could not fetch ${url}, status: ${res.status}`);

        }
        return await res.json();
    }

    getAllCharacters = async (offset = this._baseOffset) => {
        const res = await this.getResource(`${this._apiBase}characters?limit=9&offset=${offset}&${this._apiKey}`);
        return res.data.results.map(this._transfomCharacter);
    }
    
    getCharacter = async (id) => {
        const res = await this.getResource(`${this._apiBase}characters/${id}?&${this._apiKey}`);
        return this._transfomCharacter(res.data.results[0]);
    }

    _transfomCharacter = (char) => {
        return { 
        id: char.id,
        name: char.name,
        description: char.description ? char.description.length > 220 ? char.description.slice(0, 219) + '...' : char.description : 'No description about this character',
        thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
        homepage: char.urls[0].url,
        wiki: char.urls[1].url,
        comics: char.comics.items,
        }
       
    }
}

export default MarvelServices;