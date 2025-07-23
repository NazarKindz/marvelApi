import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';

import UseComicsService from '../../services/ComicsService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import './singleComicPage.scss';
import xMen from '../../resources/img/x-men.png';

const SingleComicPage = () => {
    const {comicId} = useParams();
    const [comic, setComic] = useState(null);

    const { loading, error, getComics, clearError } = UseComicsService();

    useEffect(() => {
        updateComic();
    }, [comicId]);

    const onComicLoaded = (comic) => {
        setComic(comic);
    }

    const updateComic = () => {
        clearError();

        getComics(comicId)
            .then(onComicLoaded)

    }

    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(error || loading || !comic) ? <View comic={comic}/> : null;

    return (
        <>
            {errorMessage}
            {spinner}
            {content}
        </>
    )
}

const View = ({comic}) => {
    const {title, price, description, languages, pages} = comic;

    return (
        <div className="single-comic">
            <Helmet>
                <meta
                    name="description"
                    content={`${title} comics book`}
                />
                <title>{title}</title>
            </Helmet>
            <img src={xMen} alt={title} className="single-comic__img" />
            <div className="single-comic__info">
                <h2 className="single-comic__name">{title}</h2>
                <p className="single-comic__descr">{description}</p>
                <p className="single-comic__descr">{pages} pages</p>
                <p className="single-comic__descr">Language: {languages}</p>
                <div className="single-comic__price">{price}</div>
            </div>
            <Link to="/comics" className="single-comic__back">Back to all</Link>
        </div>
    )
}

export default SingleComicPage;