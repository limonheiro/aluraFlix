import styled from 'styled-components'


const TituloStyled = styled.p`
    font-size: 48px;
    font-weight: 600;
    color: #000;
    padding-left: 1rem;
    align-self: normal;
`

export const Titulo = ({children}:{children:string}) => {
  return (
    <TituloStyled>
      {children}
    </TituloStyled>
  )
}
