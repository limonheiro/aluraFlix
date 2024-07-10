import styled from 'styled-components'
import { CirclePlus } from 'lucide-react';
import img from '../../assets/img/madMax-700.webp'
import { useState } from 'react';
import { DialogStyled, OverlayStyled } from '../Dialog';
import { Form } from '../Form';

const BannerStyled = styled.div<{ image: string }>`
    display: flex;
    flex-direction: column;
    min-height: 350px;
    /* width:100vw; */
    max-width: 100%;
    align-items: center;
    height: 516px;
    background-image: ${props => props.image && `url(${props.image})`};
    background-size:cover;
    background-repeat:no-repeat;
    background-position: right;
    margin-bottom: 2rem;

`
const ContainerBannerStyled = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100vw;
    max-width: 100%;
    height: 100%;

    nav{
        padding-top: 0.5rem;
        display:flex;
        justify-content: space-around;
        align-items:center;
        text-align:center;
        align-content: center;
    }
    nav>a{
        text-decoration:none;
        color:#fff;
        font-weight:200;
        font-size:64px;
        align-self: center;
        flex-grow: 1;

    }

    p{
        font-size: 64px;
        font-weight: 900;
        padding: 2rem;
        align-self: first baseline;
    }

    .lucide{
        margin-top: 0.5rem;
        align-self: center;
        align-content: flex-end;
        width: 40px;
        height: 40px;
        padding-right: 2rem;
        cursor: pointer;
    }
`

export const Banner = () => {
    const [addMovie, setAddMovie] = useState<boolean>(false)
    const [genreIds, setGenreIds] = useState<Array<number>>([])
    return (
        <>
            <BannerStyled image={img}>
                <ContainerBannerStyled>
                    <nav>
                        <a href='#'>AluraFlix</a>
                        <CirclePlus onClick={() => setAddMovie(!addMovie)} />
                    </nav>
                    {/* <p className='bg_title'>
                        Mad Max
                    </p> */}
                </ContainerBannerStyled>
            </BannerStyled>

            {addMovie &&
                <>
                    <OverlayStyled onClick={() => setAddMovie(!addMovie)} />
                    <DialogStyled $form={true} open={addMovie}>
                        <Form
                            tituloForm="Formulario para"
                            buttonText="Enviar"
                            genreIds={genreIds}
                            setGenreId={setGenreIds}
                            ano=''
                            img=''
                            describe=''
                            setModal={() => setAddMovie(!addMovie)}
                            newFilme={true}
                        />
                    </DialogStyled>
                </>
            }
        </>

    )
}
