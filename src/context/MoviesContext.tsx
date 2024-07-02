import React, { createContext, useState } from "react";

type MoviesChildren = {
    children: JSX.Element |JSX.Element[] 
}

export type BD = {
    backdrop_path:string,
    genre_ids:Array<number>,
    id:number,
    original_language:string,
    overview:string,
    popularity:number,
    poster_path:string,
    release_date:string,
    title:string,
    video:boolean
}

interface MoviesType  {
    movies:Array<BD>
}

interface MoviesStateType extends MoviesType{
    setMovies : React.Dispatch<React.SetStateAction<Array<BD>>>
}

export const MoviesContext = createContext<MoviesStateType|undefined>(undefined);
MoviesContext.displayName = 'movies'

export function MoviesProvider ({children}:MoviesChildren){
    const[movies, setMovies] = useState<Array<BD>>([])


    return(
        <MoviesContext.Provider value={{movies, setMovies}}>
            {children}
        </MoviesContext.Provider>
    )
}

