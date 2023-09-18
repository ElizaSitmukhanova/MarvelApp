import AppHeader from "../appHeader/AppHeader";
import ComicsBanner from "../comicsBanner/ComicsBanner";
import RandomChar from "../randomChar/RandomChar";
import CharList from '../charList/CharList';
import CharInfo from "../charInfo/CharInfo";
import "../../style/style.scss";
import bgdecoration from "../../images/bg_decoration.png";
import { useState, useEffect, useRef } from "react";
import ErrorBoundarie from "../errorBoundarie/ErrorBoundarie";
import Up from '../../icons/up.png';


const App = () => {
   
    const [selectedChar, setChar] = useState(null)
    const [scrollPosition, setScrollPosition] = useState(0);

    const onSelectedChar = (id) => {
        setChar(id)
    }

    useEffect(() => {
    
        window.addEventListener('scroll', changeScroll);
        return () => {
            
            window.addEventListener('scroll', changeScroll);
        }
    }, [])

    const changeScroll = () => {
        setScrollPosition(scrollPosition => window.scrollY)
    }
     
    const pageUp = () => {
        console.log('вверх')
    }

    let pageUpClass = 'pageup';
    if (scrollPosition > 1267 ) {
        pageUpClass += '-block';
    }
        return (
            <div id='up' className="app">
                <AppHeader/>
                <ComicsBanner />
                <main>
                    <ErrorBoundarie>
                        <RandomChar />
                    </ErrorBoundarie>
                    <div className="char__content">
                        <ErrorBoundarie>
                            <CharList onSelectedChar={onSelectedChar} />
                        </ErrorBoundarie>

                        <CharInfo charId={selectedChar}  />


                    </div>
                    {/*  <ComicsList /> */}
                    {/* <SingleComics/> */}
                    <img className="bg-decoration" src={bgdecoration} alt="vision" />
                </main>
                <button onClick={pageUp} className={pageUpClass} >
                    <img src={Up} alt="up" />
                </button>
            </div>
        )
    }



export default App;
