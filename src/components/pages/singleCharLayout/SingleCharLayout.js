import { Link } from "react-router-dom";
import { motion } from 'framer-motion';
import { Helmet } from "react-helmet";

import '../singleComicLayout/singleComicLayout.scss';

const SingleCharLayout = ({ data }) => {
    const { title, thumbnail, description } = data;
    <Helmet>
        <meta
            name="Description"
            content="Page is about char"
        />
        <title>{title}</title>
    </Helmet>
    return (
        <motion.div
            animate={{
                scale: [1, 2, 1, 1, 1],
                rotate: [180, 0, 0, 0, 0],
            }}
            transition={{ duration: 4 }}
            className="single-comic">
            <img src={thumbnail} alt={title} className="single-comic__img" />
            <div className="single-comic__info">
                <h2 className="single-comic__name">{title}</h2>
                <p className="single-comic__descr">{description}</p>
            </div>
            <Link to={'/'} href="#" className="single-comic__back">Back to all</Link>
        </motion.div>
    )
}

export default SingleCharLayout;

