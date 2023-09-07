import abyss from '../../images/abyss.jpg';
import loki from '../../images/loki.png';
import adam from '../../images/adam.png';
import boom from '../../images/boom.jpg';
import calypso from '../../images/calypso.png';
import colleen from '../../images/colleen.png';
import daimon from '../../images/daimon.png';
import damage from '../../images/damage.png';
import hulk from '../../images/hulk.png';

import './charlist.scss'

const CharList = () => {
    return (
        <div className="char__list">
            <ul className="char__grid">
                <li className="char__item">
                    <img src={abyss} alt="abyss" />
                    <div className="char__name">
                        Abyss
                    </div>
                </li>
                <li className="char__item char__item_selected">
                    <img src={loki} alt="loki" />
                    <div className="char__name">
                        loki
                    </div>
                </li>
                <li className="char__item">
                    <img src={adam} alt="adam" />
                    <div className="char__name">
                        Adam
                    </div>
                </li>
                <li className="char__item">
                    <img src={boom} alt="boom" />
                    <div className="char__name">
                        Boom Boom
                    </div>
                </li>
                <li className="char__item">
                    <img src={calypso} alt="calypso" />
                    <div className="char__name">
                        Calypso
                    </div>
                </li>
                <li className="char__item">
                    <img src={colleen} alt="colleen" />
                    <div className="char__name">
                        Colleen wing
                    </div>
                </li>
                <li className="char__item">
                    <img src={daimon} alt="daimon" />
                    <div className="char__name">
                        Daimon Hellstrom
                    </div>
                </li>
                <li className="char__item">
                    <img src={damage} alt="damage" />
                    <div className="char__name">
                        Damage control
                    </div>
                </li>
                <li className="char__item">
                    <img src={hulk} alt="hulk" />
                    <div className="char__name">
                        Hulk
                    </div>
                </li>
            </ul>
            <button className="button button__main button__long">
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default CharList;