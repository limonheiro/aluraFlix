
export const Seccao = async (genre: string) => {
    try {
        const response = await fetch(`http://localhost:3000/genres?nome=${genre}`)
        const data = await response.json()
        const generoID = await data[0].id
        // setGenero(anterior => anterior !== generoID && generoID)

        const TituloGenero = await getGenre(generoID);
        console.log(Titulo)
        const genreMovie = movies.filter((movie) => {
            if (movie.genre_ids.includes(generoID)) {
                return movie
            }
        })
        const panel = await Promise.all(
            genreMovie.slice(0, 6).map(async (movie, index) => {
                const genreName = await getGenre(movie.genre_ids[0]);
                return (
                    <Panel
                        key={movie.id + index}
                        id={movie.id}
                        title={movie.title}
                        genre={genreName}
                        ano={movie.release_date.split('-')[0]}
                        describe={movie.overview}
                        img={`https://image.tmdb.org/t/p/w342${movie.backdrop_path}`}
                    />
                );
            }))

        setPanels((Anterior) => {
            console.log(panel.length)
            if (panel.length > 0) {
                return (
                    <>
                        {Anterior}
                        <Container column={false}>
                            <Titulo>{TituloGenero}</Titulo>
                            <Container column={false}>
                                {panel}
                            </Container>
                        </Container>
                    </>
                )
            } else {
                console.log('its over')
            }
        })
    } catch (error) {
        console.error('Error fetching section:', error)
    }

}