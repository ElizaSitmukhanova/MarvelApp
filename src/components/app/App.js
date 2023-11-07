import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ComicsPage, MainPage, PageUp, Page404} from "../pages";
import AppHeader from "../appHeader/AppHeader";
import SingleComicLayout from "../pages/singleComicLayout/SingleComicLayout";
import SingleCharLayout from "../pages/singleCharLayout/SingleCharLayout";
import SinglePage from "../pages/SinglePage";
import "../../style/style.scss";

const App = () => {
    
    return (
        <BrowserRouter>
        <div id ='up' className="app">
            <AppHeader />
            <main>
                <Routes>
                    <Route path="/" element={<MainPage />} />
                    <Route path="/comics" element={<ComicsPage />} />
                    <Route path="/comics/:id" element={<SinglePage Component={SingleComicLayout} />} dataType='comic'/>
                    <Route path="/characters/:id" element={<SinglePage Component={SingleCharLayout} />} dataType='comic'/>
                    <Route path="*" element={<Page404/>} />
                </Routes>
            </main>
            <PageUp/>
        </div>
        </BrowserRouter>
    )
}

export default App;
