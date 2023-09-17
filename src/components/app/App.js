import AppHeader from "../appHeader/AppHeader";
import ComicsBanner from "../comicsBanner/ComicsBanner";
import RandomChar from "../randomChar/RandomChar";
import CharList from '../charList/CharList';
import CharInfo from "../charInfo/CharInfo";
import "../../style/style.scss";
import bgdecoration from "../../images/bg_decoration.png";
import { useState } from "react";
import ErrorBoundarie from "../errorBoundarie/ErrorBoundarie";


const App = () => {
   
    const [selectedChar, setChar] = useState(null)

    const onSelectedChar = (id) => {
        setChar(id)
    }
    
        return (
            <div className="app">
                <AppHeader />
                <ComicsBanner />
                <main>
                    <ErrorBoundarie>

                        <RandomChar />
                    </ErrorBoundarie>
                    <div className="char__content">
                        <ErrorBoundarie>
                            <CharList onSelectedChar={onSelectedChar} />
                        </ErrorBoundarie>

                        <CharInfo charId={selectedChar} />


                    </div>
                    {/*  <ComicsList /> */}
                    {/* <SingleComics/> */}
                    <img className="bg-decoration" src={bgdecoration} alt="vision" />
                </main>
            </div>
        )
    }



export default App;
