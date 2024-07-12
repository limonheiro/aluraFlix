import { useMemo } from 'react'
import { useMoviesProvider } from '../../hooks/useMoviesProvider'
import styled from 'styled-components';

const PanelStyled = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: right;
`

const SeccaoStyled = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 0.25rem;
    padding: 0.25rem 1rem 2rem 1rem;
    align-items: center;
    text-transform: capitalize;
    justify-content: normal;
`


export const Panels = () => {
    const { panels, setPanels, Seccao } = useMoviesProvider()

    const listaSeccoes: (string | boolean)[][] = [['Recentes', true], ['Família'], ['Ação'], ['Romance']]



    useMemo(() => {
        async function Seccoes() {

            let seccao: JSX.Element[]
            seccao = []

            for (const NomeSeccao of listaSeccoes) {
                if (NomeSeccao.length === 1) {
                    seccao = await Seccao(NomeSeccao[0] as string)
                }
                if (NomeSeccao.length === 2) {
                    const [genre, newVideo] = NomeSeccao;
                    seccao = await Seccao(genre as string, newVideo as boolean)

                }
                 await Promise.all(seccao.map((s: JSX.Element) => setPanels(Anterior => [...Anterior, s])))
            }
        }
        Seccoes()
    }, [])


    return (
        <PanelStyled>
            <SeccaoStyled>
                {panels}
            </SeccaoStyled>
        </PanelStyled>
    )
}