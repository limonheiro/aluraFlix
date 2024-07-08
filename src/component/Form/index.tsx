import React, { FormEvent } from "react"
import { allGenresType } from "../../hooks/useMoviesProvider"



type FormProps = {
    buttonText: string
    id?: number | undefined
    tituloForm: string | undefined
    title: string | undefined
    allGenres: allGenresType[]|never[]
    genreIds: Array<number>
    setGenreId: React.Dispatch<React.SetStateAction<number[]>>
    ano: string | undefined
    img: string | undefined
    describe: string | undefined
    setModal: () => void
    newFilme?: true | false | undefined
}

interface CustomElements extends HTMLFormControlsCollection {
    title: HTMLInputElement;
    genre_ids: NodeListOf<HTMLInputElement>;
    release_date: HTMLInputElement;
    backdrop_path: HTMLInputElement;
    overview: HTMLInputElement;
}


export const Form = ({ id, buttonText, tituloForm, title, allGenres, genreIds, setGenreId, ano, img, describe, setModal, newFilme }: FormProps) => {

    function dataForm(form: CustomElements) {

        const genre_ids = [...form.genre_ids].map(g => {
            if (g.checked) { return Number(g.value) }
        }).filter(ele => ele != undefined) as number[]

        setGenreId(genre_ids)

        const data = {
            title: form.title.value,
            genre_ids: genre_ids,
            release_date: form.release_date.value,
            backdrop_path: form.backdrop_path.value,
            overview: form.overview.value,
            new: newFilme
        }

        return data
    }

    async function AlterarData(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const formElements = event.currentTarget.elements as typeof event.currentTarget.elements & CustomElements;
        const Movies = dataForm(formElements)

        await fetch(`https://668480d656e7503d1ae06de1.mockapi.io/movies/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(Movies)
        })
        setModal
        window.location.reload();
    }

    async function AddData(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const formElements = event.currentTarget.elements as typeof event.currentTarget.elements & CustomElements;
        const Movies = dataForm(formElements)

        await fetch(`https://668480d656e7503d1ae06de1.mockapi.io/movies`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(Movies)
        })
        setModal
        window.location.reload();
    }

    function changeGenreValue(genre_id: number) {
        setGenreId(prevGenId => {
            if (!prevGenId.includes(genre_id)) {
                return [...prevGenId, genre_id]
            } else {
                return prevGenId.filter(genre => genre !== genre_id)
            }
        })
    }


    return (
        <>
            <h2> {newFilme ?
                <> Adicionar um<br /><strong>Novo Filme</strong></>
                : <>{tituloForm}<br /><strong>{title}</strong></>}
            </h2>
            <form method="post" onSubmit={newFilme ? AddData : AlterarData}>
                <label htmlFor="title">Titulo</label>
                <input id='title' name='title' type='text' placeholder='Escreva um titulo' defaultValue={title} required></input>
                <label htmlFor="genre_ids">Generos</label>
                <div className='container_checkbox'>
                    {allGenres.map(genre => {
                        return <>
                            <div key={genre.id} className='checkbox_values'>
                                <input
                                    type="checkbox"
                                    id="genre_ids"
                                    name="genre_ids"
                                    defaultValue={genre.id}
                                    checked={genreIds.includes(genre.id)}
                                    onChange={() => changeGenreValue(genre.id)}
                                />
                                {genre.nome}
                            </div>
                        </>
                    })}
                </div>
                <label htmlFor="release_date">Data</label>
                <input id='release_date' type='date' name='release_date' defaultValue={ano} required></input>
                <label htmlFor='backdrop_path'>Link para Imagem</label>
                <input id='backdrop_path' name='backdrop_path' defaultValue={img} required></input>
                <label htmlFor='overview'>Descrição</label>
                <textarea id='overview' name='overview' defaultValue={describe} required></textarea>

                <div className='container_buttons'>
                    <button className='update' type='submit'>{buttonText}</button>
                    <button onClick={setModal}>Cancelar</button>
                </div>
            </form>
        </>
    )
}
