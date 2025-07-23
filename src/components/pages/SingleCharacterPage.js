import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';

import useMarvelService from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';
import AppBanner from '../appBanner/AppBanner';

import "./SingleCharacterPage.scss"

const SingleCharacterPage = () => {
    const { characterId } = useParams();
    const [char, setChar] = useState(null);

    const {error, loading, getCharacter} = useMarvelService();

    useEffect(() => {
        getCharacter(characterId)
        .then(data => setChar(data))
        console.log(char)
    }, [characterId])

    if (loading) return <Spinner />;
    if (error) return <ErrorMessage />;
    if (!char) return null;

    return (
        <>
        <Helmet>
            <meta
                name="description"
                content={`${char.name} character`}
            />
            <title>{char.name}</title>
        </Helmet>
        <AppBanner/>
            <div className="single-comic">
                <img src={char.thumbnail} alt={char.name} className="single-comic__char-img" />
                <div className="single-comic__info">
                    <h2 className="single-comic__name">{char.name}</h2>
                    <p className="single-comic__descr">{char.description}</p>
                </div>
            </div>     
        </>
        
    )
}

export default SingleCharacterPage;