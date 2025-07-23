import { useHttp } from "../hooks/http.hook";

const UseComicsService = () => {
    const {loading, error, request, clearError} = useHttp();

    const getAllComics = async (offset = 0, limit = 8) => {
        const res = await request('/json/comics.json');
        return res.slice(offset, offset + limit);
    }

    const getComics = async (id) => {
        const res = await request('/json/comics.json');
        const comics =  res.find(item => item.id === +id);
        return comics;
    }

    return { loading, error, getAllComics, getComics, clearError };
};

export default UseComicsService;