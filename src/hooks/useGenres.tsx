import { useQuery } from 'react-query';
// import axios from 'axios';

export type allGenresType = {
    id: number;
    nome: string;
};

export type GenresType = {
    genres: allGenresType[]
}

export const useGenres = () => {
    const { data, isLoading, error } = useQuery<GenresType>('genres', async () => {
        return await fetch('./genres.json', {
            headers: {
                'Content-Type': 'application/json',
                'accept': 'application/json',
            }
        })
            .then((response) => response.json())
            .then((data) => data)
            .catch(erro => erro)
    });

    return {
        data, isLoading, error
    }
};
