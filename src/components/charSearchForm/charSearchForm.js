import { useState } from "react";
import { useForm } from "react-hook-form"
import { Link } from "react-router-dom";

import useMarvelService from "../../services/MarvelService";
import ErrorMessage from "../errorMessage/ErrorMessage";

import "./charSearchForm.scss"

const CharSearchForm = () => {
    const [char, setChar] = useState();
    const [charNotFound, setCharNotFound] = useState(false);
    const { loading, error, getCharacterByName, clearError } = useMarvelService();

    const onCharLoaded = (char) => {
        setChar(char);
    };

    const updateChar = async (name) => {
        clearError();

        const result = await getCharacterByName(name);
        onCharLoaded(result);
        return result;
    };

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        setCharNotFound(false);

        const res = await updateChar(data.character);

        if (!res || res.length === 0) {
            setCharNotFound(true);
        }
    }

    return (
        <div className="char__search-form">
            <form onSubmit={handleSubmit(onSubmit)}>
                <input type="text" placeholder="Enter character" {...register("character", { required: 'This field is required' })}/>
                {errors.character && <p className="char__search-error">{errors.character.message}</p>}
                {charNotFound ? (
                    <div className="char__search-error">
                        The character was not found. Check the name and try again
                    </div>
                ) : null}
                {char ? (
                    <div className="char__search-wrapper">
                        <div className="char__search-success">There is! Visit {char.name} page?</div>
                        <Link to={`/characters/${char.id}`} className="button button__secondary">
                            <div className="inner">To page</div>
                        </Link>
                    </div>
                ) : null}
                <button
                    type='submit'
                    className="button button__main"
                    disabled={loading}>
                    <div className="inner">find</div>
                </button>
            </form>
        </div>
    )
}

export default CharSearchForm;