import { useState, useEffect } from 'react';

import setContent from '../../utils/setContent';
import useMarvelService from '../../services/MarvelService';

import './charInfo.scss';

const CharInfo = (props) => {
    const [char, setChar] = useState(null);
    

    const {getCharacter, clearError, process, setProcess} = useMarvelService();

    useEffect(() => {
        updateChar();
    }, [props.charId]);

    const updateChar = () => {
        clearError();
        const { charId } = props;
        if (!charId) {
            return;
        }

        getCharacter(charId)
            .then(onCharLoaded)
            .then(() => setProcess('confirmed'))

    }

    const onCharLoaded = (char) => {
        setChar(char);
    }

    return (
        <div className="char__info">
            {setContent(process, View, char)}
        </div>
    )
}

const View = ({data}) => {
    const {name, description, thumbnail, homepage, wiki, comics} = data;

    const elements = comics.map((item, i) => {

        if (i > 9) return;
        return (
            <li key={i} className="char__comics-item">
                {item}
            </li>
        )
    })

    return (
        <>
            <div className="char__basics">
                <img src={thumbnail} alt={name} />
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">
                {description}
            </div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
                {elements.length > 0 ? null : 'There is no comics with this character'}
                {elements}
            </ul>
        </>
    )
}


export default CharInfo;