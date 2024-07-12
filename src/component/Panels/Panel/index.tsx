
import styled, { css } from 'styled-components'
import { CirclePlay, SquarePen } from 'lucide-react';
import { CircleX } from 'lucide-react';
import { useState } from 'react';
import { Dialog, DialogStyled, OverlayStyled } from '../../Dialog';
import { Form } from '../../Form';

type PanelVar = {
    $isfocused: boolean
}

const blurStyled = css`
    box-shadow: rgba(0, 0, 0, 0.35) 0px 0px 15px;
`

const ContainerStyled = styled.div`
    min-width: 280px;
    max-width: 280px;
    height: 150px;
    padding-top: 0.25;
    padding-bottom: 0.75;
    align-self: flex-start;
    @media screen and (max-width: 801px) {
        margin-bottom: 0.5rem;
        :nth-last-child(1){
            margin-bottom: 0px;
        }
    }
`

const ContainerPanelStyled = styled.div<PanelVar>`
    position: relative;
    width: 100%;
    height: 100%;

    ${({ $isfocused }) => {
        return $isfocused && blurStyled
    }}

`

const PanelStyled = styled.div`
    display: flex;
    flex-direction: column;
    max-height: 150px;
    z-index: 1;
    /* position: absolute; */
    img{
       width:100%; 
       height: 100%;
       object-fit:cover;
    }
`

// ########

const displayStyle = css`
  display: flex;
`;


const ContainerBottomStyled = styled.div<PanelVar>`
    display: none;
    min-width: 280px;
    /* max-width: 280px; */
    flex-direction: column;
    height:150px;
    background: #fff;
    position: absolute;
    z-index: 5;
    top: 100%;
    padding-top: 5px;

    ${({ $isfocused }) => {
        return $isfocused && [displayStyle, blurStyled]
    }}

    @media screen and (max-width: 801px) {
            top:0;

            margin-bottom: 0.5rem;
            :nth-last-child(1){
                margin-bottom: 0px;
            }
        }

`

const ContainerTitleStyled = styled.div`
    display: flex;
    flex-direction: column;
    text-align: left;
    z-index: 1;
    padding-left:1rem;
    position: absolute;
    bottom: 0;
    max-width: 250px;
    h1{
        font-size: 24px;
        font-weight: 900;
        text-shadow: black 0.1rem 0.1rem 2rem
   
    }

`

const ContainerSubtitleStyled = styled.div`
    display: flex;
    flex-direction: row;
    font-size: 14px;
    justify-items: flex-start;
    gap: 8px;
    text-align: left;
    text-shadow: black 0.1rem 0.1rem 2rem;
    margin-bottom: 0.5rem;

    :first-child{
        flex-shrink: 9;
    }
    :nth-child(2){
        flex-shrink: 1;
    }
`

const ContainerDescribeStyled = styled.div`
    display: flex;
    color: #000;
    gap: 8px;
    max-width: 280px;
    width: 100%;
    justify-content: flex-start;
    justify-content: space-between;
    padding: 0.5rem 0;

    .lucide {
        cursor: pointer;
    }

    :first-child{
        padding-left: 8px;
        align-self: flex-start;
    }
    :nth-child(2){
        align-items: flex-end;
    }

    .container_edicao{
        display: flex;
        gap: 8px;
        
        :last-child{
            padding-right: 16px;
        }
    }
`

const TextDescribeStyled = styled.p`
    color: #000;
    font-size: 12px;
    font-weight: 300;
    height: fit-content;
    max-height: 110px;
    max-height: 80px;
    overflow: auto;

    scrollbar-width: thin;
    padding: 0 16px 16px 8px;
    line-height: 1.3;
`

type PanelProps = {
    id: number
    title: string
    genre: string
    genre_ids: number[]
    ano: string
    describe: string
    img: string
    video_link: string
}

// genre_ids lista de genero representa por numeros
// genre nome do genero principal 
export const Panel = ({ id, title, genre, genre_ids, ano, describe, video_link, img }: PanelProps) => {

    const [isfocused, setFocused] = useState<boolean>(false);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [deleteModal, setDeleteModal] = useState<boolean>(false);
    const [alterarModal, setAlterarModal] = useState<boolean>(false)
    const [linkVideo, setLinkVideo] = useState<string>('');
    const [genreIds, setGenreIds] = useState<Array<number>>(genre_ids)

    async function trailerID() {

        if(linkVideo === ''){
            const hashVideo = video_link.split('watch?v=')[1]
            console.log(hashVideo)
            setLinkVideo(`https://www.youtube.com/embed/${hashVideo}?si=ZQrkDkNQwzSw7wqp&amp;controls=0`)
        }
        setShowModal(!showModal)
    }

    async function deleteData(id: number | string) {
        // debugger
        const URL = `https://668480d656e7503d1ae06de1.mockapi.io/movies/${id}`
        // alert(URL)
        await fetch(URL, {
            method: 'DELETE',
            headers: {
                'Access-Control-Allow-Headers': 'X-Requested-With,Content-Type,Cache-Control,access_token',
                'Content-Type': 'application/json'
            }
        }).catch(error => {
            console.error(error)
            alert(error)
            return "indefinido"
        })
        window.location.reload();

    }

    return (
        <>
            <ContainerStyled>
                <ContainerPanelStyled $isfocused={isfocused}>
                    <PanelStyled
                        tabIndex={0}
                        onClick={() => setFocused(true)}
                        // onTouchStart={() => setFocused(!isfocused)}
                        // onPointerDown={() => setFocused(false)}
                        onMouseEnter={() => setFocused(true)}
                        onMouseLeave={() => setFocused(false)}
                    >
                        <img src={img} alt={`Imagem do filme '${title}'`} />
                        <ContainerTitleStyled>
                            <h1>{title}</h1>
                            <ContainerSubtitleStyled >
                                <p>{genre}</p>
                                <p>{ano.split('-')[0]}</p>
                            </ContainerSubtitleStyled>
                        </ContainerTitleStyled>
                        <ContainerBottomStyled $isfocused={isfocused}>
                            <ContainerDescribeStyled>
                                <CirclePlay
                                    onTouchStart={() => trailerID()}
                                    onClick={() => trailerID()} />
                                <div className='container_edicao'>
                                    <CircleX
                                        onTouchStart={() => setDeleteModal(!deleteModal)}
                                        onClick={() => setDeleteModal(!deleteModal)} />
                                    <SquarePen
                                        onTouchStart={() => setAlterarModal(!alterarModal)}
                                        onClick={() => setAlterarModal(!alterarModal)} />
                                </div>
                            </ContainerDescribeStyled>
                            <TextDescribeStyled>
                                {describe}
                            </TextDescribeStyled>
                        </ContainerBottomStyled>
                    </PanelStyled>
                </ContainerPanelStyled>
            </ContainerStyled>
            <Dialog showModal={showModal} functionShowModal={() => setShowModal(!showModal)} linkVideo={linkVideo as string} ></Dialog>

            {deleteModal &&
                <>
                    <OverlayStyled onClick={() => setDeleteModal(!deleteModal)} />
                    <DialogStyled $form={false} open={deleteModal}>
                        <form method="dialog">
                            <h2>Deseja <span>deletar</span><br /><strong>{title}</strong>?</h2>
                            <div className='container_buttons'>
                                <button className='delele' onClick={() => {
                                    deleteData(id)
                                }}>Deletar</button>
                                <button onClick={() => setDeleteModal(!deleteModal)}>Cancelar</button>
                            </div>
                        </form>
                    </DialogStyled>
                </>
            }

            {alterarModal &&
                <>
                    <OverlayStyled onClick={() => setAlterarModal(!alterarModal)} />
                    <DialogStyled open={alterarModal} $form={true}>
                        <Form
                            id={id}
                            tituloForm="Editando"
                            title={title}
                            buttonText="Alterar"
                            genreIds={genreIds}
                            setGenreId={setGenreIds}
                            ano={ano}
                            img={img}
                            describe={describe}
                            linkVideo={video_link}
                            setModal={() => setAlterarModal(!alterarModal)}
                        />
                    </DialogStyled>
                </>
            }
        </>
    )
}