import './charList.scss';

import { useState, useEffect, useRef } from 'react';

import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

const CharList = (props) => {
    const [charList, setCharList] = useState([]);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [offset, setOffset] = useState(0);
    const [charEnded, setCharEnded] = useState(false);



    const {loading, error, getAllCharacters} = useMarvelService();

    useEffect(() =>{
        onRequest(offset, true);
    }, []);

    const onRequest = (offset, initial) => {
        initial ? setNewItemLoading(false) : setNewItemLoading(true);
        getAllCharacters(offset)
            .then(onCharLoaded)
    }

    const onCharLoaded = (newCharList) => {
        let ended = false;
        if (newCharList.length < 9) {
            ended = true;
        }

        setCharList(charList => [...charList, ...newCharList]);
        setNewItemLoading(newItemLoading => false);
        setOffset(offset => offset + 9);
        setCharEnded(charEnded => ended)
    }


    const itemRefs = useRef([]);

    const focusOnItem = (id) => {
        itemRefs.current.forEach(item => item.classList.remove('char__item_selected'));
        itemRefs.current[id].classList.add('char__item_selected');
        itemRefs.current[id].focus();
    }

    const element = charList.map((item, i) => {
        return (
            <li
                className="char__item"
                tabIndex={0}
                ref={el => itemRefs.current[i] = el}
                key={item.id}
                onClick={() => {
                    props.onCharSelected(item.id);
                    focusOnItem(i);
                }}
                onKeyDown={(e) => {
                    if (e.key === ' ' || e.key === "Enter") {
                        props.onCharSelected(item.id);
                        focusOnItem(i);
                    }
                }}>
                <img src={item.thumbnail} alt={item.name}/>
                <div className="char__name">{item.name}</div>
            </li>
        )
    })

    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading && !newItemLoading ? <Spinner /> : null;

    return (
        <div className="char__list">
            <ul className="char__grid">
                {errorMessage}
                {spinner}
                {element}
            </ul>
            <button
            className="button button__main button__long"
            onClick={() => onRequest(offset)}
            disabled={newItemLoading}
            style={{'display': charEnded ? 'none' : 'block'}}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default CharList;