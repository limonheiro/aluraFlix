import React, { useContext, useState } from "react";
import { BD, MoviesContext } from "../context/MoviesContext";
import { Titulo } from "../component/Titulo";
import { Panel } from "../component/Panels/Panel";
import { Container } from "../component/Container";
import { nanoid } from 'nanoid'
import allGenres from "../data/genres.json"
import styled from "styled-components";

// export type allGenres = {
//     id: number
//     nome: string
// }

// export type GenreType = {
//     allGenres: allGenres[]
//     setAllGenres: React.Dispatch<React.SetStateAction<allGenres[]>>
// }

export const NewVideoStyled = styled.div`
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    gap: 0.25rem;
    width: 100vw;
    padding: 0;
    max-width: 100%;
    min-width: 350px;
    align-items: baseline;
`



export const useMoviesProvider = () => {
    const context = useContext(MoviesContext)

    if (!context) {
        throw new Error('useMovieProvider must be used within a MoviesContext');
    }

    const { movies, setMovies } = context

    const [panels, setPanels] = useState<JSX.Element | JSX.Element[]>([]);
    // const [allGenres, setAllGenres] = useState<allGenres[] | never[]>([]);


    const getGenreMovie = async (id: number) => {
        if (allGenres.genres.length) {
            // console.log(allGenres)
            const genre = allGenres.genres.filter(genre => genre.id === id)
            if (genre.nome) {
                // console.log(allGenres, genre)
                return genre.nome
            }

        } else {
            const response = await fetch(`https://my-json-server.typicode.com/limonheiro/db_genres/genres?id=${id}`)
                .then(response => response.json())
                .then(data => data[0] !== undefined ? data[0].nome : "indefinido")
                .catch(error => {
                    console.error(error)
                    return "indefinido"
                })
            return response
        }
    }

    const getIdGenre = async (genre: string) => {
        if (allGenres.length > 1) {
            const genre = allGenres.filter((genre) => genre.nome === genre)
            if (genre) {
                // console.log(allGenres, genre)
                return `?genre_ids=${genre.id}`
            }

        } else {
            const res = await fetch(`https://my-json-server.typicode.com/limonheiro/db_genres/genres?nome=${genre}`)
            const data: allGenres[] = await res.json()
            const id = Number(data[0].id)
            return `?genre_ids=${id}`
        }
    }

    const Seccao = async (genre: string, newVideo?: true | false | undefined) => {

        const data = newVideo ? '?new=true' : await getIdGenre(genre)
        fetch(`https://668480d656e7503d1ae06de1.mockapi.io/movies${data}`)
            .then(res => res.json())
            .then(async (data) => {
                const panel = await Promise.all(data.slice(0, 6).map(async (movie: BD) => {
                    const genero = await getGenreMovie(movie.genre_ids[0]);
                    return (
                        <React.Fragment key={nanoid()}>
                            <Panel
                                key={nanoid()}
                                id={movie.id}
                                title={movie.title}
                                genre={genero}
                                genre_ids={movie.genre_ids}
                                ano={movie.release_date}
                                describe={movie.overview}
                                img={movie.backdrop_path}
                            />

                        </React.Fragment>
                    );
                }));
                const ContainerPanel = (
                    <React.Fragment key={nanoid()}>
                        <Titulo>{genre}</Titulo>
                        <Container key={nanoid()} $column={!true}>
                            {panel}
                        </Container>
                    </React.Fragment>
                );

                setPanels(Anterior => {
                    if (newVideo) {
                        return (
                            <>
                                {Anterior}
                                <NewVideoStyled key={nanoid()}>
                                    {ContainerPanel}
                                </NewVideoStyled>
                            </>
                        )
                    } else {
                        return (
                            <>
                                {Anterior}
                                <Container key={nanoid()} $column={(!false)}>
                                    {ContainerPanel}
                                </Container>
                            </>
                        );
                    }
                });
            });

    };

    return {
        movies,
        setMovies,
        panels,
        setPanels,
        getGenreMovie,
        allGenres,
        Seccao
    };
}