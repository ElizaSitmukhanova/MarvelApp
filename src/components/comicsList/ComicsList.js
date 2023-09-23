import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import ErrorMessage from '../errorMessage/ErrorMessage';
import useMarvelServices from '../../services/MarvelServices';
import Spinner from '../spinner/Spinner';

import './comicsList.scss';
import '../../style/buttons.scss';

const ComicsList = (props) => {

    const [comicsList, setComicsList] = useState([]);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [offset, setOffset] = useState(210);
    const [comicsEnded, setComicsEnded] = useState(false);

    const { loading, error, getAllComics } = useMarvelServices();


    useEffect(() => {
        onRequest(offset, true);

    }, [])

    const onRequest = (offset, initial) => {
        initial ? setNewItemLoading(false) : setNewItemLoading(true)
        getAllComics(offset)
            .then(onComicsListLoaded)
            .finally(
                () => setNewItemLoading(false));

    }

    const onComicsListLoaded = (newComicsList) => { // first loading of 9 cards

        let ended = false;
        if (newComicsList.length < 8) {
            ended = true;
        }

        setComicsList(charList => [...charList, ...newComicsList]);
        setNewItemLoading(newItemLoading => false);
        setOffset(offset => offset + 9);
        setComicsEnded(comicsEnded => ended)
    }
    function renderItems(arr) {
        const items = arr.map((item, i) => {
            return (
                <li
                    className="comics__item"
                    key={i}>
                    <Link to={`/comics/${item.id}`}>
                        <img src={item.thumbnail} alt={item.name} className='comics__item-img' />
                        <div className="comics__item-name">
                            {item.name}
                        </div>
                        <div className="comics__item-price">{item.price}</div>
                    </Link>
                </li>
            )
        })
        return (
            <ul className="comics__grid">
                {items}

            </ul>
        )
    }

    const items = renderItems(comicsList);
    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading && !newItemLoading ? <Spinner /> : null;

    return (
        <div className="comics__list">
            {errorMessage}
            {spinner}
            {items}
            <button className="button button__main button__long"
                disabled={newItemLoading}
                onClick={() => onRequest(offset)}
                style={{ 'display': comicsEnded ? 'none' : 'block' }}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default ComicsList;