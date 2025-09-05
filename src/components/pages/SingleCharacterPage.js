import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';

import useMarvelService from '../../services/MarvelService';
import AppBanner from '../appBanner/AppBanner';
import setContent from '../../utils/setContent';

import "./SingleCharacterPage.scss"

const SingleCharacterPage = () => {
    const { characterId } = useParams();
    const [char, setChar] = useState(null);

    const {getCharacter, process, setProcess} = useMarvelService();

    useEffect(() => {
        getCharacter(characterId)
        .then(data => setChar(data))
        .then(() => setProcess('confirmed'))
    }, [characterId])

    return (
        <>
            {setContent(process, View, char)}
        </>
    )
}

const View = ({data}) => {

    const {name, thumbnail, description} = data;
    
    return (
        <>
        <Helmet>
            <meta
                name="description"
                content={`${name} character`}
            />
            <title>{name}</title>
        </Helmet>
        <AppBanner/>
            <div className="single-comic">
                <img src={thumbnail} alt={name} className="single-comic__char-img" />
                <div className="single-comic__info">
                    <h2 className="single-comic__name">{name}</h2>
                    <p className="single-comic__descr">{description}</p>
                </div>
            </div>     
        </>
    )
}

export default SingleCharacterPage;