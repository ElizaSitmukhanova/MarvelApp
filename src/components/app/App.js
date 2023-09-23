import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ComicsPage, MainPage, PageUp, Page404, SingleComicsPage } from "../pages";
import AppHeader from "../appHeader/AppHeader";

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
                    <Route path="/comics/:comicId" element={<SingleComicsPage />} />
                    <Route path="*" element={<Page404/>} />

                </Routes>
            </main>
            <PageUp/>
        </div>
        </BrowserRouter>
    )
}

export default App;
