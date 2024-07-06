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
    const { panels, Seccao } = useMoviesProvider()

    useMemo(() => {
        Seccao('Recentes', true)
        Seccao('Família')
        Seccao('Ação')
        Seccao('Terror')
    }, [])

    return (
        <PanelStyled>
            <SeccaoStyled>
                {panels}
            </SeccaoStyled>
        </PanelStyled>
    )
}