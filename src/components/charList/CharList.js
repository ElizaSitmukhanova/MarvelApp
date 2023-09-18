import { useState, useEffect, forwardRef } from 'react';
import PropTypes from 'prop-types';

import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';
import MarvelServices from '../../services/MarvelServices';

import './charlist.scss'

const CharList = (props) => {

    const [charList, setCharList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [offset, setOffset] = useState(210);
    const [charEnded, setCharEnded] = useState(false);
    const [selectedChar, setChar] = useState(null);

    const marvelServices = new MarvelServices;

    useEffect(() => {
    
        window.addEventListener('scroll', showCharListByScroll);
        return () => {
            
            window.addEventListener('scroll', showCharListByScroll);
        }
    }, [])

    useEffect(() => {
        if (newItemLoading && !charEnded) {
            
            onRequest();
            
        }
    }, [newItemLoading])
    
    const showCharListByScroll = () => {
        if ((document.documentElement.clientHeight + window.scrollY) >= document.documentElement.scrollHeight - 1 && !newItemLoading) {
                setNewItemLoading(true);
                
        }
    }

    /* componentDidMount = () => {
       this.onRequest(); //first render with baseOffset=210
       window.addEventListener('scroll', showCharListByScroll);
       console.log('mount')
    } 
   componentWillUnmount = () => {
        window.removeEventListener('scroll', showCharListByScroll);
        console.log('unmount')
    } 

   showCharListByScroll = () => {
        if(window.pageXOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight){
            if(charEnded){
                window.removeEventListener('scroll', showCharListByScroll);
            } else {
               onRequest(offset)
            }
        
    }  */

    const onRequest = () => {
        
        onCharListLoading();
        marvelServices.getAllCharacters(offset)
            .then(onCharListLoaded)
            .catch(onError)
            .finally(
                () => setNewItemLoading(false));
          
    }

    const onCharListLoading = () => {
        setNewItemLoading(true)
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
        setLoading(loading => false);
        setNewItemLoading(newItemLoading => false);
        setOffset(offset => offset + 9);
        setCharEnded(charEnded => ended)
    }

    const onError = () => {
        setLoading(loading => false);
        setError(true)
    }


    // Этот метод создан для оптимизации, 
    // чтобы не помещать такую конструкцию в метод render
    function renderItems(arr) {
        const items = arr.map((item) => {
            let imgStyle = { 'objectFit': 'cover' };
            if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                imgStyle = { 'objectFit': 'unset' };
            }

            const active = selectedChar === item.id,
                clazz = active ? 'char__item char__item_selected' : 'char__item';

            return (
                <li
                    className={clazz}
                    key={item.id}
                    onClick={() => {
                        onSelectedCharLocal(item.id)
                        props.onSelectedChar(item.id);
                    }}>

                    <img src={item.thumbnail} alt={item.name} style={imgStyle} />
                    <div className="char__name">{item.name}</div>
                </li>
            )
        });
        // А эта конструкция вынесена для центровки спиннера/ошибки
        return (
            <ul className="char__grid">
                {items}
            </ul>
        )
    }

    const items = renderItems(charList);

    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(loading || error) ? items : null;

    return (
        <div className="char__list" >
            {errorMessage}
            {spinner}
            {content}
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