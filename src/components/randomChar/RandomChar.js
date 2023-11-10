import { useState, useEffect } from 'react';
import useMarvelServices from '../../services/MarvelServices';
import setContent from '../../utils/setContent';
import weapon from '../../images/Decoration.png';

import './randomChar.scss';

const RandomChar = () => {

    const [char, setChar] = useState({});

    const { process, setProcess, getCharacter, clearError } = useMarvelServices();

    useEffect(() => {
        updateChar();
        /* const timerId = setInterval(updateChar, 1000)
        return () => {
            clearInterval(timerId);
        } */
    }, [])

    const onCharLoaded = (char) => {
        setChar(char);
    }

    const updateChar = () => {
        clearError();
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
        getCharacter(id)
            .then(onCharLoaded)
            .then(() => setProcess('confirmed'));
    }

    return (
        <div className='randomchar'>
            {setContent(process, View, char)}
            <div className="randomchar__static">
                <p className="randomchar__title">
                    Random character for today!<br />
                    Do you want to get to know him better?
                </p>
                <p className="randomchar__title">
                    Or choose another one
                </p>
                <button onClick={updateChar} className="button button__main">
                    <div className="inner">try it</div>
                </button>
                <img src={weapon} alt="mjolnir" className="randomchar__decoration" />
            </div>
        </div>
    )
}

const View = ({ data }) => {
    let imgStyle = { 'objectFit': 'cover' };
    const { name, description, thumbnail, homepage, wiki } = data;
    if (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
        imgStyle = { 'objectFit': 'contain' };
    }
    return (
        <div className="randomchar__block">
            <img src={thumbnail} alt="Random Character" className="randomchar__img" style={imgStyle} />

            <div className='randomchar__info'>
                <p className='randomchar__name'>
                    {name}
                </p>
                <p className='randomchar__descr'>
                    {description}
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