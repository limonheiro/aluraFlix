import { useQuery } from 'react-query';

export type allGenresType = {
    id: number;
    nome: string;
};

export type GenresType = {
    genres: allGenresType[]
}

export const useGenres = () => {
    const { data, isLoading, error } = useQuery<GenresType>('genres', async () => {
        const res =  await fetch('./genres.json', {
            headers: {
                'Content-Type': 'application/json',
                'accept': 'application/json',
            }
        })
        return res.json()
    },{
        retry:5,
    });

    return {
        data, isLoading, error
    }
};
