import AppHeader from "../appHeader/AppHeader";
import ComicsBanner from "../comicsBanner/ComicsBanner";
import RandomChar from "../randomChar/RandomChar";
import CharList from '../charList/CharList';
import CharInfo from "../charInfo/CharInfo";
import "../../style/style.scss";
import bgdecoration from "../../images/bg_decoration.png";
import { Component } from "react";
import ErrorBoundarie from "../errorBoundarie/ErrorBoundarie";


class App extends Component {
    state = {
        selectedChar: null
    }
    onSelectedChar = (id) => {
        this.setState({
            selectedChar: id
        })
    }
    render() {
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
                            <CharList onSelectedChar={this.onSelectedChar} />
                        </ErrorBoundarie>

                        <CharInfo charId={this.state.selectedChar} />


                    </div>
                    {/*  <ComicsList /> */}
                    {/* <SingleComics/> */}
                    <img className="bg-decoration" src={bgdecoration} alt="vision" />
                </main>
            </div>
        )
    }

}

export default App;
