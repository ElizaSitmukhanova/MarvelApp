import { Link } from "react-router-dom";
import { motion } from 'framer-motion';
import { Helmet } from "react-helmet";

import './singleComicLayout.scss';

const SingleComicLayout = ({ data }) => {
    const { title, thumbnail, description, price, pageCount, language } = data;
    return (

        <motion.div
            animate={{
                scale: [1, 2, 1, 1, 1],
                rotate: [180, 0, 0, 0, 0],
            }}
            transition={{ duration: 4 }}

            className="single-comic">
            <Helmet>
                <meta
                    name="Description"
                    content="Page with our comics"
                />
                <title>{title}</title>
            </Helmet>
            <img src={thumbnail} alt={title} className="single-comic__img" />
            <div className="single-comic__info">
                <h2 className="single-comic__name">{title}</h2>
                <p className="single-comic__descr">{description}</p>
                <p className="single-comic__descr">{pageCount}</p>
                <p className="single-comic__descr">Language: {language}</p>
                <div className="single-comic__price">{price}</div>
            </div>
            <Link to={'/comics'} href="#" className="single-comic__back">Back to all</Link>
        </motion.div>
    )
}

export default SingleComicLayout;