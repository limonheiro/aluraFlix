import React, { FormEvent, useCallback, useState } from "react"
import { nanoid } from "nanoid"
import { allGenresType } from "../../hooks/useGenres"
import { useMoviesProvider } from "../../hooks/useMoviesProvider"



type FormProps = {
    buttonText: string
    id?: number | undefined
    tituloForm: string | undefined
    title?: string | undefined
    genreIds: Array<number>
    setGenreId: React.Dispatch<React.SetStateAction<number[]>>
    ano: string | undefined
    img: string | undefined
    describe: string | undefined
    linkVideo?: string | undefined
    setModal: () => void
    newFilme?: true | false | undefined
}

interface CustomElements extends HTMLFormControlsCollection {
    title: HTMLInputElement;
    genre_ids: NodeListOf<HTMLInputElement>;
    release_date: HTMLInputElement;
    backdrop_path: HTMLInputElement;
    video_link: HTMLInputElement;
    overview: HTMLInputElement;
}


export const Form = ({ id, buttonText, tituloForm, title, genreIds, setGenreId, ano, img, describe, linkVideo, setModal, newFilme }: FormProps) => {
    const { allGenres, isLoading, error } = useMoviesProvider();

    const [formTitle, setFormTitle] = useState<string>(title || "");
    const [formAno, setFormAno] = useState<string>(ano || "");
    const [formImg, setFormImg] = useState<string>(img || "");
    const [formDescribe, setFormDescribe] = useState<string>(describe || "");
    const [formLinkVideo, setFormLinkVideo] = useState<string>(linkVideo || "");



    function dataForm(form: CustomElements) {

        const genre_ids = [...form.genre_ids].map(g => {
            if (g.checked) { return Number(g.value) }
        }).filter(ele => ele !== undefined) as number[]

        setGenreId(genre_ids)

        const data = {
            title: form.title.value,
            genre_ids: genre_ids,
            release_date: form.release_date.value,
            backdrop_path: form.backdrop_path.value,
            overview: form.overview.value,
            video_link: form.video_link.value,
            new: newFilme
        }

        return data
    }

    async function handleData(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const formElements = event.currentTarget.elements as typeof event.currentTarget.elements & CustomElements;
        const Movies = dataForm(formElements)

        const URL = newFilme ? `https://668480d656e7503d1ae06de1.mockapi.io/movies` : `https://668480d656e7503d1ae06de1.mockapi.io/movies/${id}`
        const methodForm = newFilme ? 'POST' : 'PUT'

        await fetch(URL, {
            method: methodForm,
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

    const handleFormTitle = useCallback(
        (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            setFormTitle(e.target.value)
        }, [setFormTitle]
    )

    const handleFormAno = useCallback(
        (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            setFormAno(e.target.value)
        }, [setFormAno]
    )

    const handleFormImg = useCallback(
        (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            setFormImg(e.target.value)
        }, [setFormImg]
    )

    const handleFormDescribe = useCallback(
        (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            setFormDescribe(e.target.value)
        }, [setFormDescribe]
    )

    const handleFormVideo = useCallback(
        (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            setFormLinkVideo(e.target.value)
        }, [setFormLinkVideo]
    )

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error loading genres:</div>;
    }

    if (!allGenres) {
        return <div>No genres available {allGenres}</div>;
    }

    console.log('rendenizou')

    return (
        <>
            <h2> {newFilme ?
                <> Adicionar um<br /><strong>Novo Filme</strong></>
                : <>{tituloForm}<br /><strong>{title}</strong></>}
            </h2>
            <form method="post" onSubmit={handleData}>
                <label htmlFor="title">Titulo</label>
                <input
                    id='title'
                    name='title'
                    type='text'
                    placeholder='Titulo do Filme'
                    value={formTitle}
                    onChange={handleFormTitle}
                    required></input>
                <label htmlFor="genre_ids">Generos</label>
                <div className='container_checkbox'>
                    {allGenres.genres.map((genre: allGenresType) => {
                        return (
                            <React.Fragment key={nanoid()}>
                                <div key={genre.id} className='checkbox_values'>
                                    <input
                                        type="checkbox"
                                        id="genre_ids"
                                        name="genre_ids"
                                        value={genre.id}
                                        checked={genreIds.includes(genre.id)}
                                        onChange={() => changeGenreValue(genre.id)}
                                    />
                                    {genre.nome}
                                </div>
                            </ React.Fragment>
                        )
                    }
                    )}
                </div>

                <label htmlFor="release_date">Data</label>
                <input
                    id='release_date'
                    type='date'
                    name='release_date'
                    value={formAno}
                    onChange={handleFormAno}
                    required />
                <label htmlFor="video_link">Link para video</label>
                <input
                    id='video_link'
                    type='text'
                    name='video_link'
                    pattern="/(https\:\/*www.youtube.com\/watch\?v=*)\w+/g"
                    value={formLinkVideo}
                    onChange={handleFormVideo}
                    placeholder="Link para video do Youtube"
                    required />
                <label htmlFor='backdrop_path'>Link para Imagem</label>
                <input
                    id='backdrop_path'
                    name='backdrop_path'
                    value={formImg}
                    onChange={handleFormImg}
                    placeholder="Link para imagem"
                    required></input>
                <label htmlFor='overview'>Descrição</label>
                <textarea
                    id='overview'
                    name='overview'
                    value={formDescribe}
                    onChange={handleFormDescribe}
                    placeholder="Descrição"
                    required></textarea>

                <div className='container_buttons'>
                    <button className='update' type='submit'>{buttonText}</button>
                    <button type="button" onClick={setModal}>Cancelar</button>
                </div>
            </form>
        </>
    )
}
