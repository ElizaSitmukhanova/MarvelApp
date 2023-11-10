import { Formik, Form, Field, ErrorMessage as FormikErrorMessage } from 'formik';
import * as Yup from 'yup';
import useMarvelServices from '../../services/MarvelServices';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import ErrorMessage from '../errorMessage/ErrorMessage';

import './search.scss';

const Search = (props) => {

    const [char, setChar] = useState(null);
    const { process, setProcess, getCharacterByName, clearError } = useMarvelServices();

    const updateChar = (name) => {
        clearError();
        getCharacterByName(name)
            .then(onCharLoaded)
            .then(() => setProcess('confirmed'))
    }

    const onCharLoaded = (char) => {
        setChar(char);
    }

    const errorMessage = process === 'error' ? <div className="char__search-critical-error"><ErrorMessage /></div> : null;
    const results = !char ? null : char.length > 0 ? <div className='search__wrapper'>

        <div className='search__success'>
            There is! Visit {char[0].name} page?
        </div>
        <Link to={`/characters/${char[0].id}`} className="button button__secondary">
            <div className="inner">To page</div>
        </Link>
    </div> : <div className='search__error'>
        The character was not found. Check the name and try again
    </div>;

    return (
        <Formik
            initialValues={{
                name: ''
            }}
            validationSchema={
                Yup.object({
                    name: Yup.string().required('This field is required'),
                })}
            onSubmit={({ name }) => {
                updateChar(name);
            }}
        >
            <Form className='search__form'>
                <p className="search__title">Or find a character by name:</p>
                <div className="search__block">

                    <Field
                        name='name'
                        type="text"
                        placeholder='Enter name'
                        className='search__input'
                    />

                    <button className="button button__main" type='submit'
                        disabled={process === 'loading'}>
                        <div className="inner">Find</div>
                    </button>

                </div>
                <FormikErrorMessage name="name" component="div" className="search__error" />
                {results}
                {errorMessage}
            </Form>
        </Formik>
    )
}

export default Search;