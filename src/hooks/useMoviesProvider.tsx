import { useContext, useMemo, useState } from "react";
import { MoviesContext } from "../context/MoviesContext";
import { Titulo } from "../component/Titulo";
import { Panel } from "../component/Panels/Panel";
import { Container } from "../component/Container";

export const useMoviesProvider = () => {
    const context = useContext(MoviesContext)

    if (!context) {
        throw new Error('useMovieProvider must be used within a MoviesContext');
    }

    const { movies, setMovies } = context

    const [moviesId, setMoviesId] = useState<Array<number>>([])
    const [panels, setPanels] = useState<JSX.Element|JSX.Element[]>([]);


    const getGenre = async (id: number) => {
        const response = await fetch(`http://localhost:3000/genres?id=${id}`)
            .then(response => response.json())
            .then(data => data[0] !== undefined ? data[0].nome : "indefinido")
            .catch(error => {
                console.error(error)
                return "indefinido"
            })
        return response
    }


    const Seccao = (genre: string) => {
        fetch(`http://localhost:3000/genres?nome=${genre}`)
            .then(res => res.json())
            .then(data => {
                fetch(`http://localhost:3000/movies?genre_ids_like=${data[0].id}`)
                    .then(res => res.json())
                    .then(async (data) => {
                        const filterData = data.filter(d => !moviesId.includes(d))
                        console.log(moviesId)
                        const panel = await Promise.all(filterData.slice(0, 6).map(async (movie, index) => {
                            const genero = await getGenre(movie.genre_ids[0]);
                                return (
                                    <>
                                        <Panel
                                            key={movie.id}
                                            id={movie.id}
                                            title={movie.title}
                                            genre={genero}
                                            ano={movie.release_date.split('-')[0]}
                                            describe={movie.overview}
                                            img={`https://image.tmdb.org/t/p/w342${movie.backdrop_path}`}
                                        />

                                    </>
                                );
                        }))
                        setPanels(Anterior => (
                            <>
                                {Anterior}
                                <Container column>
                                    <Titulo>{genre}</Titulo>
                                    <Container>
                                        {panel}
                                    </Container>
                                </Container>
                            </>
                        ))
                    })
            })
    }

    // console.log(moviesId)

    useMemo(() => {
        fetch('http://localhost:3000/movies')
            .then(res => res.json())
            .then(data => setMovies(data))
    }, [])

    return {
        movies,
        setMovies,
        panels,
        setPanels,
        getGenre,
        Seccao
    }

}