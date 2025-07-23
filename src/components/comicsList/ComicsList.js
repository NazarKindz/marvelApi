import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import './comicsList.scss';
import uw from '../../resources/img/UW.png';
import xMen from '../../resources/img/x-men.png';

import UseComicsService from '../../services/ComicsService';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';


const ComicsList = () => {
    const [offset, setOffset] = useState(0);
    const [comicsList, setComicsList] = useState([]);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [comicsEnded, setcomicsEnded] = useState(false);


    const {loading, error, getAllComics, clearError} = UseComicsService();


    useEffect(() =>{
            onRequest(offset, true);
        }, []);
    
    const onRequest = (offset, initial) => {
        initial ? setNewItemLoading(false) : setNewItemLoading(true);
        getAllComics(offset)
            .then(onComicsLoaded)
    }

    const onComicsLoaded = (newComicsList) => {
        let ended = false;
        if (newComicsList.length < 8) {
            ended = true;
        }

        setComicsList(comicsList => [...comicsList, ...newComicsList]);
        setNewItemLoading(false);
        setOffset(offset => offset + 9);
        setcomicsEnded(comicsEnded => ended)
    }

    const element = comicsList.map((item, i) => {
            return (
                <li className="comics__item" key={i}>
                    <Link to={`/comics/${item.id}`}>
                        <img src={uw} alt="ultimate war" className="comics__item-img" />
                        <div className="comics__item-name">{item.title}</div>
                        <div className="comics__item-price">{item.price}</div>
                    </Link>
                </li>
            )
    })

    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading && !newItemLoading ? <Spinner /> : null;

    return (
        <div className="comics__list">
            <ul className="comics__grid">
                {errorMessage}
                {spinner}
                {element}
            </ul>
            <button
                className="button button__main button__long"
                onClick={() => onRequest(offset)}
                style={{ 'display': comicsEnded ? 'none' : 'block' }}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default ComicsList;