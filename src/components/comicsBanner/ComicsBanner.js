import './comicsBanner.scss';
import avengers from '../../images/Avengers.png';
import avengersLogo from '../../images/Avengers logo.png';

const ComicsBanner = () => {
    return (
        <div className="comics__banner">
            <img src={avengers} alt="avengers" />
            <div className="comics__banner-text">
                New comics every week!
                <br />
                Stay tuned!
            </div>
            <img src={avengersLogo} alt="avengersLogo" />
        </div>
    )
}

export default ComicsBanner;
