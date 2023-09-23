import { useState } from "react";
import RandomChar from "../randomChar/RandomChar";
import CharList from '../charList/CharList';
import CharInfo from "../charInfo/CharInfo";
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
                <CharInfo charId={selectedChar} />

                <img className="bg-decoration"
                    src={bgdecoration} alt="vision" />
            </div>
        </>
    )
}

export default MainPage;