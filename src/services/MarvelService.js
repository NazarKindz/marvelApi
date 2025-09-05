import {useHttp} from '../hooks/http.hook'

const useMarvelService = () => {
    const {request, clearError, process, setProcess} = useHttp();
    const _apiBase = 'https://marvel-server-zeta.vercel.app/';
    const _apiKey = 'apikey=d4eecb0c66dedbfae4eab45d312fc1df';
    const _baseOffset = 0;

    const getAllCharacters = async (offset =_baseOffset) => {
        const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`);
        return res.data.results.map(_transformCharacter)
    }

    const getCharacter = async (id) => {
        const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);
        return _transformCharacter(res.data.results[0]);
    }

    const getCharacterByName = async (name) => {
        const res = await request('https://marvel-server-zeta.vercel.app/characters?apikey=d4eecb0c66dedbfae4eab45d312fc1df');
        const arr = res.data.results;
        return arr.find(character => character.name.toLowerCase() === name.toLowerCase());
    }

    const getAllComics = async (offset = 0, limit = 8) => {
        const res = await request('/json/comics.json');
        return res.slice(offset, offset + limit);
    }

    const getComics = async (id) => {
        const res = await request('/json/comics.json');
        const comics = res.find(item => item.id === +id);
        return comics;
    }

    const _transformCharacter = (char) => {
        return {
            id: char.id,
            name: char.name,
            description: char.description,
            thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            comics: char.comics.items
        }
    }

    return {clearError ,getAllCharacters, getCharacterByName, getCharacter, getAllComics, getComics, process, setProcess}
}

export default useMarvelService;