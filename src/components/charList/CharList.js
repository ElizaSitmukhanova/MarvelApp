import { Component } from 'react';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';
import MarvelServices from '../../services/MarvelServices';

import './charlist.scss'

class CharList extends Component {
    state = {
        charList: [], 
        loading: true,
        error: false,
        newItemLoading: false,
        offset: 210,
        charEnded: false
    }

    marvelServices = new MarvelServices;

    componentDidMount = () => {
       this.onRequest(); //first render with baseOffset=210
       window.addEventListener('scroll', this.showCharListByScroll);
       console.log('mount')
    }
    componentWillUnmount = () => {
        window.removeEventListener('scroll', this.showCharListByScroll);
        console.log('unmount')
    }

    showCharListByScroll = () => {
        if(window.pageXOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight){
            if(this.state.charEnded){
                window.removeEventListener('scroll', this.showCharListByScroll);
            } else {
                this.onRequest(this.state.offset)
            }
        }
    }
    onRequest = (offset) => {
        this.onCharListLoading();
        this.marvelServices.getAllCharacters(offset)
        .then(this.onCharListLoaded).catch(this.onError)
    }

    onCharListLoading = () => {
        this.setState({
            newItemLoading: true
        })
    }

    onCharListLoaded = (newCharList) => { // first loading of 9 cards

        let ended = false;
        if (newCharList.length < 9) {
            ended = true;
        }
        
        this.setState(({offset, charList}) => ({
            charList: [...charList, ...newCharList],
            loading: false,
            newItemLoading: false,
            offset: offset + 9,
            charEnded: ended
        }))    
    }

    onError = () => {
        this.setState({
            loading: false,
            error: true
        })
    }

    
  // Этот метод создан для оптимизации, 
    // чтобы не помещать такую конструкцию в метод render
    renderItems(arr) {
        const items =  arr.map((item) => {
            let imgStyle = {'objectFit' : 'cover'};
            if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                imgStyle = {'objectFit' : 'unset'};
            }
            
            return (
                <li 
                    className="char__item"
                    key={item.id}
                    onClick={() => this.props.onSelectedChar(item.id)}>
                        <img src={item.thumbnail} alt={item.name} style={imgStyle}/>
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
   render() {
    const {charList, loading, error, offset, newItemLoading, charEnded} = this.state;
        
    const items = this.renderItems(charList);

    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(loading || error) ? items : null;

    return (
        <div className="char__list">
            {errorMessage}
            {spinner}
            {content}
            <button className="button button__main button__long"
            disabled={newItemLoading}
            onClick={() => this.onRequest(offset)}
            style={{'display' : charEnded ? 'none' : 'block'}}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
}
}

export default CharList;