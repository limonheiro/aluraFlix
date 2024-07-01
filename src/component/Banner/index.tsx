import styled from 'styled-components'
import img from '../../assets/img/madMax.jpg'

const BannerStyled = styled.div<{image:string}>`
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: center;
    height: 516px;
    background-image: ${props => props.image && `url(${props.image})`};
    background-size:cover;
    background-repeat:no-repeat;
    background-position: right;
`
const ContainerBannerStyled = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 1200px;
    height: 100%;

    nav{
        padding-top: 0.5rem;
        display:flex;
        justify-content: center;
        align-items:center;
        text-align:center;
    }
    nav>a{
        text-decoration:none;
        color:#fff;
        font-weight:200;
        font-size:64px;
        align-self: center;
    }

    p{
        font-size: 64px;
        font-weight: 900;
        padding: 2rem;
        align-self: first baseline;
    }
`

export const Banner = () => {
  return (
    <BannerStyled image={img}>
        <ContainerBannerStyled>
            <nav>
                <a href='#'>AluraFlix</a>
            </nav>
            <p className='bg_title'>
                Mad Max
            </p>
        </ContainerBannerStyled>
    </BannerStyled>
  )
}
