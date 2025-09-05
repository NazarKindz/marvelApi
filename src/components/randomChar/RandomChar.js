import { useState, useEffect } from 'react';

import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';
import useMarvelService from '../../services/MarvelService';
import setContent from '../../utils/setContent';

const RandomChar = () => {

    const [char, setChar] = useState({});
    const {getCharacter, clearError, process, setProcess} = useMarvelService();

    const onCharLoaded = (char) => {
        setChar(char);
    }

    const updateChar = () => {
        clearError();
        const id = Math.floor(Math.random() * 20) + 1;

        getCharacter(id)
            .then(onCharLoaded)
            .then(() => setProcess('confirmed'))
    }

    useEffect(() => {
        updateChar();
    }, []);

    // marvelService.getAllCharacters().then(res => res.data.results.forEach(item => console.log(item.name)));

    return (
        <div className="randomchar">
            {setContent(process, View, char)}
            <div className="randomchar__static">
                <p className="randomchar__title">
                    Random character for today!<br />
                    Do you want to get to know him better?
                </p>
                <p className="randomchar__title">
                    Or choose another one
                </p>
                <button className="button button__main" onClick={updateChar}>
                    <div className="inner">try it</div>
                </button>
                <img src={mjolnir} alt="mjolnir" className="randomchar__decoration" />
            </div>
        </div>
    )
}

const View = ({data}) => {

    const { name, description, thumbnail, homepage, wiki } = data;

    const truncateText = (text, maxLength) => {
        if (!text) return 'Description will appear later...';
        if (text.length <= maxLength) return text;

        const truncated = text.slice(0, maxLength);
        const lastSpace = truncated.lastIndexOf(' ');
        return truncated.slice(0, lastSpace) + '...';
    }

    const validDescription = truncateText(description, 200);

    return (
        <div className="randomchar__block">
            <img src={thumbnail} alt="Random character" className="randomchar__img" />
            <div className="randomchar__info">
                <p className="randomchar__name">{name}</p>
                <p className="randomchar__descr">
                    {validDescription}
                </p>
                <div className="randomchar__btns">
                    <a href={homepage} className="button button__main">
                        <div className="inner">homepage</div>
                    </a>
                    <a href={wiki} className="button button__secondary">
                        <div className="inner">Wiki</div>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default RandomChar;