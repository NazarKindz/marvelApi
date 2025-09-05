import { useState } from "react";
import { useForm } from "react-hook-form"
import { Link } from "react-router-dom";

import useMarvelService from "../../services/MarvelService";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";

import "./charSearchForm.scss";

const setContent = (process, Component, data) => {
    switch (process) {
        case 'waiting':
            return <Component data={data} />;
            break;
        case 'loading':
            return <Spinner />;
            break;
        case 'error':
            return <ErrorMessage />;
            break;
        case 'confirmed':
            return <Component data={data} />;
            break;
        default:
            throw new Error('Unexpected process state')
    }
};

const CharSearchForm = () => {
    const [char, setChar] = useState();
    const [charNotFound, setCharNotFound] = useState(false);
    const {getCharacterByName, clearError, process, setProcess } = useMarvelService();

    const onCharLoaded = (char) => {
        setChar(char);
    };

    const updateChar = async (name) => {
        clearError();

        const result = await getCharacterByName(name);
        onCharLoaded(result);
        setProcess('confirmed')
        return result;
    };

    const View = ({ data }) => {

        const {
            register,
            handleSubmit,
            formState: { errors },
        } = useForm();

        const onSubmit = async (data) => {
            setProcess('loading')
            setCharNotFound(false);

            const res = await updateChar(data.character);


            if (!res || res.length === 0) {
                setCharNotFound(true);
            }
        }

        return (
            <div className="char__search-form">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <input type="text" placeholder="Enter character" {...register("character", { required: 'This field is required' })} />
                    {errors.character && <p className="char__search-error">{errors.character.message}</p>}
                    {charNotFound ? (
                        <div className="char__search-error">
                            The character was not found. Check the name and try again
                        </div>
                    ) : null}
                    {data ? (
                        <div className="char__search-wrapper">
                            <div className="char__search-success">There is! Visit {data.name} page?</div>
                            <Link to={`/characters/${data.id}`} className="button button__secondary">
                                <div className="inner">To page</div>
                            </Link>
                        </div>
                    ) : null}
                    <button
                        type='submit'
                        className="button button__main"
                        disabled={process === 'loading'}>
                        <div className="inner">find</div>
                    </button>
                </form>
            </div>
        )
    }

    return (
        <>
        {setContent(process, View, char)}
        </>
    )
}



export default CharSearchForm;