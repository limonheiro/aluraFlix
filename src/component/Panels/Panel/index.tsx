
import styled, { css } from 'styled-components'
import { CirclePlay, SquarePen } from 'lucide-react';
import { CircleX } from 'lucide-react';
import { useState } from 'react';
import { Dialog, DialogStyled, OverlayStyled } from '../../Dialog';
import { useMoviesProvider } from '../../../hooks/useMoviesProvider';
import { Form } from '../../Form';

type PanelVar = {
    isfocused: number
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

    ${({ isfocused }) => {
        return isfocused && blurStyled
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
       object-fit:cover;
    }
`

// ########

const displayStyle = css`
  display: flex;
`;


const ContainerBottomStyled = styled.div<PanelVar>`
    display: none;
    flex-direction: column;
    height:150px;
    background: #fff;
    padding-left: 8px;
    position: absolute;
    z-index: 5;
    top: 100%;
    padding-top: 5px;
    margin-top: 4px;

    ${({ isfocused }) => {
        return isfocused && [displayStyle, blurStyled]
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
}

// genre_ids lista de genero representa por numeros
// genre nome do genero principal 
export const Panel = ({ id, title, genre, genre_ids, ano, describe, img }: PanelProps) => {

    const [isfocused, setFocused] = useState<boolean>(false);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [deleteModal, setDeleteModal] = useState<boolean>(false);
    const [alterarModal, setAlterarModal] = useState<boolean>(false)
    const [linkVideo, setLinkVideo] = useState<string>();
    const [genreIds, setGenreIds] = useState<Array<number>>(genre_ids)
    const { allGenres } = useMoviesProvider() // lista de todos os generos

    async function trailerID(id: string | number) {
        const URL = `https://api.themoviedb.org/3/movie/${id}/videos?api_key=7bd8468dd9add6745a48f0808ba6f1db&language=pt-BR`
        const res = await fetch(URL)
        const data = await res.json()
        if (data.results[0]) {
            const trailerLink = data.results[0].key
            console.log(data)
            setLinkVideo(trailerLink)
        }
        setShowModal(!showModal)
    }

    function deleteData(id: string | number) {
        fetch(`https://668480d656e7503d1ae06de1.mockapi.io/movies/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })

    }

    return (
        <>
            <ContainerStyled>
                <ContainerPanelStyled isfocused={isfocused ? 1 : 0}>
                    <PanelStyled
                        tabIndex={0}
                        onClick={() => setFocused(true)}
                        // onTouchStart={() => setFocused(!isfocused)}
                        // onPointerDown={() => setFocused(false)}
                        onMouseEnter={() => setFocused(true)}
                        onMouseLeave={() => setFocused(false)}
                    >
                        <img src={img} />
                        <ContainerTitleStyled>
                            <h1>{title}</h1>
                            <ContainerSubtitleStyled >
                                <p>{genre}</p>
                                <p>{ano.split('-')[0]}</p>
                            </ContainerSubtitleStyled>
                        </ContainerTitleStyled>
                        <ContainerBottomStyled isfocused={isfocused ? 1 : 0}>
                            <ContainerDescribeStyled>
                                <CirclePlay
                                    onTouchStart={() => trailerID(id)}
                                    onClick={() => trailerID(id)} />
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
            <Dialog showModal={showModal} functionShowModal={() => setShowModal(!showModal)} linkVideo={linkVideo} ></Dialog>

            {deleteModal &&
                <>
                    <OverlayStyled onClick={() => setDeleteModal(!deleteModal)} />
                    <DialogStyled form={false} open={deleteModal}>
                        <form method="dialog">
                            <h2>Deseja <span>deletar</span><br /><strong>{title}</strong>?</h2>
                            <div className='container_buttons'>
                                <button className='delele' onClick={() => {
                                    deleteData(id)
                                    window.location.reload();
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
                    <DialogStyled open={alterarModal} form={true}>
                        <Form
                            id={id}
                            tituloForm="Editando"
                            title={title}
                            buttonText="Alterar"
                            allGenres={allGenres}
                            genreIds={genreIds}
                            setGenreId={setGenreIds}
                            ano={ano}
                            img={img}
                            describe={describe}
                            setModal={() => setAlterarModal(!alterarModal)}
                        />
                    </DialogStyled>
                </>
            }
        </>
    )
}