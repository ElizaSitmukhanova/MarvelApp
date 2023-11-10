import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useMarvelServices from "../../services/MarvelServices";
import ComicsBanner from "../comicsBanner/ComicsBanner";
import setContent from "../../utils/setContent";

const SinglePage = ({Component, dataType}) => {
    const {id} = useParams();
    const [data, setData] = useState(null);
    const {process, setProcess, getComic, getCharacter, clearError} = useMarvelServices();

    useEffect(() => {
        updateData()
    }, [id])

    const updateData = () => {
        clearError();

        switch (dataType) {
            case 'comic':
                getComic(id).then(onDataLoaded)
                .then(() => setProcess('confirmed'));
                break;
            case 'character':
                getCharacter(id).then(onDataLoaded)
                .then(() => setProcess('confirmed'));
        }
    }

    const onDataLoaded = (data) => {
        setData(data);
    }

    return (
        <>
            <ComicsBanner/>
             {setContent(process, Component, data )}
        </>
    )
}

export default SinglePage;