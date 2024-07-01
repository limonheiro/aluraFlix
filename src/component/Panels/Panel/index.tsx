
import img from '../../../assets/img/ToyStory.jpg'
import styled, { css } from 'styled-components'
import { CirclePlay, SquarePen } from 'lucide-react';
import { CircleX } from 'lucide-react';
import { useState } from 'react';

type PanelProps = {
    isFocused : boolean
}

const blurStyled = css`
    box-shadow: rgba(0, 0, 0, 0.35) 0px 0px 15px;
`

const ContainerStyled = styled.div`
    max-width: 280px;
    height: 150px;
`

const ContainerPanelStyled = styled.div<PanelProps>`
    position: relative;
    width: 100%;
    height: 100%;

    ${( {isFocused} ) => {
        return isFocused && blurStyled}}

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


const ContainerBottomStyled = styled.div<PanelProps>`
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

    ${( {isFocused} ) => {
        return isFocused && [displayStyle, blurStyled]}}

`

const ContainerTitleStyled = styled.div`
    display: flex;
    flex-direction: column;
    text-align: left;
    z-index: 1;
    padding-left:1rem;
    position: absolute;
    bottom: 0;
    h1{
        font-size: 24px;
        font-weight: 900;   
    }

`

const ContainerSubtitleStyled = styled.div`
    display: flex;
    flex-direction: row;
    font-size: 14px;
    justify-items: flex-start;
    gap: 8px;
    text-align: left;

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
    padding: 0 16px 16px 8px;
    line-height: 1.3;
`

export const Panel = () => {

    const [isFocused, setFocused] = useState<true | false>(false);

    const onFocusHandle = () =>{
        console.log('focus')
        setFocused(true)
    }

    return (
        <ContainerStyled>
            <ContainerPanelStyled isFocused={isFocused}>
                <PanelStyled
                tabIndex={0}
                    onMouseEnter={onFocusHandle}
                    onMouseLeave={() => setFocused(false)}
                >
                    <img src={img} />
                    <ContainerTitleStyled>
                        <h1>Toy Story</h1>
                        <ContainerSubtitleStyled >
                            <p>Animação</p>
                            <p>1995</p>
                        </ContainerSubtitleStyled>
                    </ContainerTitleStyled>
                    <ContainerBottomStyled isFocused={isFocused}>
                        <ContainerDescribeStyled>
                            <CirclePlay />
                            <div className='container_edicao'>
                                <CircleX />
                                <SquarePen />
                            </div>
                        </ContainerDescribeStyled>
                        <TextDescribeStyled>
                            Em um mundo onde os brinquedos são seres vivos que fingem não ter vida quando os humanos estão por perto, um boneco cauboi de pano chamado Xerife Woody é o brinquedo favorito de Andy Davis,
                            um garoto de seis anos.
                        </TextDescribeStyled>
                    </ContainerBottomStyled>
                </PanelStyled>
            </ContainerPanelStyled>
        </ContainerStyled>
    )
}