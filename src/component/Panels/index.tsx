import { useMemo } from 'react'
import {useMoviesProvider} from '../../hooks/useMoviesProvider'
import { Container } from '../Container';


export const Panels = () => {
    const {panels,Seccao} = useMoviesProvider()

    
    useMemo(()=>{
        Seccao('Família')
        Seccao('Ação')
        Seccao('Terror')
    },[])
    
    // useMemo(() => {
    //     const fetchGenres = async () => {
    //         const panelComponents = await Promise.all(movies.map(async (movie, index) => {
    //             const genre = await getGenre(movie.genre_ids[0]);
    //             return (
    //                 <Panel 
    //                     key={movie.id + index}
    //                     title={movie.title}
    //                     genre={genre}
    //                     ano={movie.release_date.split('-')[0]}
    //                     describe={movie.overview}
    //                     img={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
    //                 />
    //             );
    //         }));
    //         setPanels(panelComponents);
    //     };
        
    //     fetchGenres();
    // }, [movies]);

    return (
        <Container>
            { panels }
        </Container>
  )
}
