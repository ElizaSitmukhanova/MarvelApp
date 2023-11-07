import { useState } from "react";
import RandomChar from "../randomChar/RandomChar";
import CharList from '../charList/CharList';
import CharInfo from "../charInfo/CharInfo";
import Search from "../search/Search";
import bgdecoration from "../../images/bg_decoration.png";
import ErrorBoundarie from "../errorBoundarie/ErrorBoundarie";

const MainPage = () => {

    const [selectedChar, setChar] = useState(null)

    const onSelectedChar = (id) => {
        setChar(id)
    }

    return (
        <>
            <ErrorBoundarie>
                <RandomChar />
            </ErrorBoundarie>

            <div className="char__content">
                <ErrorBoundarie>
                    <CharList
                        onSelectedChar={onSelectedChar} />
                </ErrorBoundarie>
                <div className="char__right">
                    <CharInfo charId={selectedChar} />
                    <Search/>
                    <img className="bg-decoration"
                        src={bgdecoration} alt="vision" />
                </div>

            </div>
        </>
    )
}

export default MainPage;