import AppHeader from "../appHeader/AppHeader";
import ComicsBanner from "../comicsBanner/ComicsBanner";
import RandomChar from "../randomChar/RandomChar";
import CharList from '../charList/CharList';
import CharInfo from "../charInfo/CharInfo";
import "../../style/style.scss";
import bgdecoration from "../../images/bg_decoration.png"
import ComicsList from "../comicsList/ComicsList";
import SingleComics from "../singleComics/SingleComics";

const App = () => {
  return (
    <div className="app">
      <AppHeader />
      <ComicsBanner />
      <main>
        <RandomChar />
        <div className="char__content">
          <CharList />
          <CharInfo />
        </div>
        {/*  <ComicsList /> */}
        {/* <SingleComics/> */}
        <img className="bg-decoration" src={bgdecoration} alt="vision" />
      </main>
    </div>
  )
}

export default App;
