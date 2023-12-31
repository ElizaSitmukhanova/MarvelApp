import './skeleton.scss';

const Skeleton = () => {
    return (
        <>
            <p className="char__select">Please select a character to see information</p>
            <div className="skeleton">
                <div className="skeleton__header">
                    <div className="skeleton__circle"></div>
                    <div className="skeleton__mini"></div>
                </div>
                <div className="skeleton__block"></div>
                <div className="skeleton__block"></div>
                <div className="skeleton__block"></div>
            </div>
        </>
    )
}

export default Skeleton;