import { useParams, Link } from 'react-router-dom';
import { useEffect, useState, } from 'react';
import { motion } from 'framer-motion';
import ComicsBanner from '../comicsBanner/ComicsBanner';
import useMarvelServices from '../../services/MarvelServices';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';

import './singleComics.scss';

const SingleComicsPage = () => {

    const { comicId } = useParams();

    const [comic, setComic] = useState(null);

    const { loading, error, getComic, clearError } = useMarvelServices();

    useEffect(() => {
        updateComic();
    }, [comicId])

    const updateComic = () => {
        clearError();
        getComic(comicId)
            .then(onComicLoaded)
    }

    const onComicLoaded = (comic) => {
        setComic(comic);
    }

    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(loading || error || !comic) ? <View comic={comic} /> : null;

    return (
        <>
            <ComicsBanner />
            {errorMessage}
            {spinner}
            {content}
        </>
    )
}

const View = ({ comic }) => {
    const { title, thumbnail, description, price, pageCount, language } = comic;
    return (

        <motion.div
        animate={{   scale: [1, 2, 1, 1, 1],
            rotate: [ 180, 0,0 , 0, 0],}}
            transition={{ duration: 4 }}
           
            className="single-comic">
            <img src={thumbnail} alt={title} className="single-comic__img" />
            <div className="single-comic__info">
                <h2 className="single-comic__name">{title}</h2>
                <p className="single-comic__descr">{description}</p>
                <p className="single-comic__descr">{pageCount}</p>
                <p className="single-comic__descr">Language: {language}</p>
                <div className="single-comic__price">{price}</div>
            </div>
            <Link to={'/comics'} href="#" className="single-comic__back">Back to all</Link>
        </motion.div>
    )
}
export default SingleComicsPage;
