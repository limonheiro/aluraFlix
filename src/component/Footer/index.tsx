import img from '../../assets/img/wide.webp'

import styled from 'styled-components'

const FooterStyled = styled.footer`
    display: flex;
    flex-direction: column;
    gap: 0.25rem;;
    color: #fff;
    max-width: 100%;
    font-size: 64px;
    font-weight: 200;
    padding: 1.25rem;
    p{
        padding: 0.25rem;
    }
    :nth-child(2){
        font-size: 0.75rem;
    }
`

export const Footer = () => {
    return (
        <FooterStyled style={{backgroundImage : `url(${img})`}}>
            <p>
                AluraFlix
            </p>
            <p>
                Desenvolvido por Nicolas T
            </p>
        </FooterStyled>
    )
}
