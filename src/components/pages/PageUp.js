import { useState, useEffect } from "react";
import Up from '../../icons/up.png';

const PageUp = () => {
    const [scrollPosition, setScrollPosition] = useState(0);

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
        console.log('вверх');
        window.scrollTo({
            top: 200,
            left: 0,
            behavior: 'smooth',
        });
    }

    let pageUpClass = 'pageup';
    if (scrollPosition > 1267) {
        pageUpClass += '-block';
    }
    return (
        <button onClick={pageUp} className={pageUpClass} >
            <img src={Up} alt="up" />
        </button>
    )
}

export default PageUp;