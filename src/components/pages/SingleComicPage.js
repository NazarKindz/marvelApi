import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';

import useMarvelService from '../../services/MarvelService';
import xMen from '../../resources/img/x-men.png';
import setContent from '../../utils/setContent';

import './singleComicPage.scss';

const SingleComicPage = () => {
    const {comicId} = useParams();
    const [comic, setComic] = useState(null);

    const {getComics, clearError, process, setProcess} = useMarvelService();

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
            .then(() => setProcess('confirmed'))

    }

    return (
        <>
          {setContent(process, View, comic)}  
        </>
    )
}

const View = ({data}) => {
    const {title, price, description, languages, pages} = data;

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