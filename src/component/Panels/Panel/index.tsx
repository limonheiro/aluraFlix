
import styled, { css } from 'styled-components'
import { CirclePlay, SquarePen } from 'lucide-react';
import { CircleX } from 'lucide-react';
import { useState } from 'react';

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
    padding-bottom: 1rem;
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
    margin-top: 8px;

    ${({ isfocused }) => {
        return isfocused && [displayStyle, blurStyled]
    }}

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
    scrollbar-color: #000 #fff;

    padding: 0 16px 16px 8px;
    line-height: 1.3;
`

const DialogStyled = styled.dialog`
    z-index: 999;
`

type PanelProps = {
    id: string|number
    title: string
    genre: string
    ano: string
    describe: string
    img: string
}



export const Panel = ({ id, title, genre, ano, describe, img }: PanelProps) => {

    const [isfocused, setFocused] = useState<boolean>(false);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [linkVideo, setLinkVideo] = useState<string>()

    async function trailerID(id:string|number) {
        const URL = `https://api.themoviedb.org/3/movie/${id}/videos?api_key=7bd8468dd9add6745a48f0808ba6f1db&language=pt-BR`
        const res = await fetch(URL)
        const data = await res.json()
        const trailerLink = data.results[0].key

        // const VideoURL = `https://www.themoviedb.org/video/play?key=${trailerLink}`
        // res = await fetch(URL)
        // data = await res.json()
        // console.log(data.results[0].key)
        setLinkVideo(trailerLink)
        setShowModal(!showModal)
    }

    return (
        <>
            <ContainerStyled>
                <ContainerPanelStyled isfocused={isfocused ? 1 : 0}>
                    <PanelStyled
                        tabIndex={0}
                        onMouseEnter={() => setFocused(true)}
                        onMouseLeave={() => setFocused(false)}
                    >
                        <img src={img} />
                        <ContainerTitleStyled>
                            <h1>{title}</h1>
                            <ContainerSubtitleStyled >
                                <p>{genre}</p>
                                <p>{ano}</p>
                            </ContainerSubtitleStyled>
                        </ContainerTitleStyled>
                        <ContainerBottomStyled isfocused={isfocused ? 1 : 0}>
                            <ContainerDescribeStyled>
                                <CirclePlay onClick={() => trailerID(id)} />
                                <div className='container_edicao'>
                                    <CircleX />
                                    <SquarePen />
                                </div>
                            </ContainerDescribeStyled>
                            <TextDescribeStyled>
                                {describe}
                            </TextDescribeStyled>
                        </ContainerBottomStyled>
                    </PanelStyled>
                </ContainerPanelStyled>
            </ContainerStyled>
            {showModal &&
                <DialogStyled open={showModal}>
                    <iframe
                        width="560"
                        height="315"
                        src={`https://www.youtube.com/embed/${linkVideo}?si=_kJceVPnZL2f_Jga`}
                        title="YouTube video player"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    >
                    </iframe>
                </DialogStyled>}
        </>
    )
}