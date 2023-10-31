import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';
import { motion } from 'framer-motion';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';
import useMarvelServices from '../../services/MarvelServices';

import './charlist.scss'

const CharList = (props) => {

    const [charList, setCharList] = useState([]);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [offset, setOffset] = useState(210);
    const [charEnded, setCharEnded] = useState(false);
    const [selectedChar, setChar] = useState(null);

    const { loading, error, getAllCharacters } = useMarvelServices();

    useEffect(() => {
        onRequest(offset, true);

        /*  window.addEventListener('scroll', showCharListByScroll);
 
         return () => {
             
             window.addEventListener('scroll', showCharListByScroll);
         } */
    }, [])

    /*     useEffect(() => {
            if (newItemLoading && !charEnded) {
                
                onRequest(offset, true);
                
            }
        }, [newItemLoading])
        
        const showCharListByScroll = () => {
            if (!newItemLoading && !charEnded && (document.documentElement.clientHeight + window.scrollY) >= document.documentElement.scrollHeight - 1 ) {
                    setNewItemLoading(true); 
                    onRequest(offsetRef.current);
            }
            if(charEnded) {
                window.removeEventListener('scroll', showCharListByScroll);
            }
        } */

    const onRequest = (offset, initial) => {
        initial ? setNewItemLoading(false) : setNewItemLoading(true)
        getAllCharacters(offset)
            .then(onCharListLoaded)
            .finally(
                () => setNewItemLoading(false));

    }

    const onSelectedCharLocal = (id) => {
        setChar(id)
    }

    const onCharListLoaded = (newCharList) => { // first loading of 9 cards

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
    // Этот метод создан для оптимизации, 
    // чтобы не помещать такую конструкцию в метод render
    function renderItems(arr) {
        const items = arr.map((item, i) => {
            let imgStyle = { 'objectFit': 'cover' };
            if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                imgStyle = { 'objectFit': 'unset' };
            }
            return (
                <CSSTransition
                    key={item.id} timeout={500} classNames="char__item" >
                    <motion.li
                        animate={{ y: [200, 0] }}
                        transition={{ duration: 1 }}
                        className="char__item"
                        ref={el => itemRefs.current[i] = el}
                        onClick={() => {
                            onSelectedCharLocal(item.id)
                            props.onSelectedChar(item.id);
                            focusOnItem(i);
                        }}>
                        <img src={item.thumbnail}
                            alt={item.name}
                            style={imgStyle} />
                        <div className="char__name">{item.name}</div>
                    </motion.li>
                </CSSTransition>
            )
        });
        return (
            <ul className="char__grid">
                {items}
            </ul>
        )
    }

    const items = renderItems(charList);

    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading && !newItemLoading ? <Spinner /> : null;

    return (
        <div className="char__list" >
            {errorMessage}
            {spinner}
            {items}
            <button className="button button__main button__long"
                disabled={newItemLoading}
                onClick={() => onRequest(offset)}
                style={{ 'display': charEnded ? 'none' : 'block' }}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

CharList.propTypes = {
    onSelectedChar: PropTypes.func.isRequired
}

export default CharList;