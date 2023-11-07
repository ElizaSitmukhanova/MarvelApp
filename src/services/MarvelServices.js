import { useHttp } from "../hooks/http.hook";

const useMarvelServices = () => {
    const { loading, request, error, clearError } = useHttp();

    const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
   /*   const _apiKey = 'apikey=afbc522c76c53f986dbf21e44a3c45e3'; */
    const _apiKey = 'apikey=dfd98d302cdf53cf24e2eaf0e60725fd';

    const _baseOffset = 210;
    const _comicOffset = 400;
    /*  const _total = 0; */


    const getAllCharacters = async (offset = _baseOffset) => {
        const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`);
        return res.data.results.map(_transfomCharacter);
    }

    const getAllComics = async (offset = _comicOffset) => {
        const res = await request(`${_apiBase}comics?limit=8&offset=${offset}&${_apiKey}`);
        return res.data.results.map(_transfomComic);
    }


    const getCharacter = async (id) => {
        const res = await request(`${_apiBase}characters/${id}?&${_apiKey}`);
        return _transfomCharacter(res.data.results[0]);
    }

    const getComic = async (id) => {
        const res = await request(`${_apiBase}comics/${id}?&${_apiKey}`);
        return _transfomComic(res.data.results[0]);
    }

    const getCharacterByName = async (name) => {
        const res = await request(`${_apiBase}characters?name=${name}&${_apiKey}`);
        return res.data.results.map(_transfomCharacter);
    }
    const _transfomCharacter = (char) => {
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

    const _transfomComic = (comics) => {
        return {
            id: comics.id,
            title: comics.title,
            description: comics.description ? comics.description.length > 220 ? comics.description.slice(0, 219) + '...' : comics.description : 'No description about this comics',
            thumbnail: comics.thumbnail.path + '.' + comics.thumbnail.extension,
            pageCount: comics.pageCount
                ? `${comics.pageCount} p.`
                : "No information about the number of pages",
            price: comics.prices[0].price ? `${comics.prices[0].price} $` : 'NOT AVAILABLE',
            language: comics.textObjects[0]?.language || "en-us",
        }

    }
  
    return { loading, error, getAllCharacters, getAllComics, getCharacter, clearError, getComic, getCharacterByName }
}

export default useMarvelServices;