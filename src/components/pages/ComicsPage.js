import ComicsBanner from "../comicsBanner/ComicsBanner";
import ComicsList from "../comicsList/ComicsList";
import { Helmet } from "react-helmet";

const ComicsPage = () => {
    return (
        <>
            <Helmet>
                <meta
                    name="Description"
                    content="Page with our comics"
                />
                <title>Page with our comics</title>
            </Helmet>
            <ComicsBanner />
            <ComicsList />
        </>
    )
}

export default ComicsPage;
