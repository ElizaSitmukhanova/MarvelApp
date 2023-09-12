import { Component } from 'react'; 
import MarvelServices from '../../services/MarvelServices';
import Spinner from '../spinner/Spinner';
import weapon from '../../images/Decoration.png';
import './randomChar.scss';
import ErrorMessage from '../errorMessage/ErrorMessage';

class RandomChar extends Component {
    state = {
        char: {}, 
        loading: true,
        error: false
    }

    marvelServices = new MarvelServices;

    componentDidMount = () => {
        this.updateChar();
      /*   this.timerId = setInterval(this.updateChar, 7000) */
    }

    componentWillUnmount = () => {
        clearInterval(this.timerId);
    }
    onCharLoaded = (char) => {
        this.setState({char: char,
        loading: false})    
    }

    updateChar = () => {
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
        this.charLoading();
        this.marvelServices.getCharacter(id).then(this.onCharLoaded).catch(this.onError);
        
    }

    onError = () => {
        this.setState({
            loading: false,
            error: true,
        })
    }

    charLoading = () => {
        this.setState({
            loading: true,
        })
    }

    render() {
        const {char, loading, error } = this.state;
        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading || error) ? <View char={char}/> : null;

        return (
            <div className="randomchar">
                 {errorMessage}
                 {spinner}
                 {content}
                <div className="randomchar__static">
                    <p className="randomchar__title">
                        Random character for today!<br />
                        Do you want to get to know him better?
                    </p>
                    <p className="randomchar__title">
                        Or choose another one
                    </p>
                    <button onClick={this.updateChar} className="button button__main">
                        <div className="inner">try it</div>
                    </button>
                    <img src={weapon} alt="mjolnir" className="randomchar__decoration" />
                </div>
            </div>

        )
    }
}

const View = ({ char }) => {
    let imgStyle = {'objectFit' : 'cover'};
    const { name, description, thumbnail, homepage, wiki } = char;
    if (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
        imgStyle = {'objectFit' : 'contain'};
    }
    return (
        <div className="randomchar__block">
            <img src={thumbnail} alt="Random Character" className="randomchar__img" style={imgStyle} />
            
            <div className='randomchar__info'>
                <p className='randomchar__name'>
                    {name}
                </p>
                <p className='randomchar__descr'>
                    {description}                        </p>
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