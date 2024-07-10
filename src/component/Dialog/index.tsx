import styled from "styled-components";

export const OverlayStyled = styled.div`
    position: fixed;
    z-index: 998;
    width: 100vw;
    height: 100vh;
    background: #e8e8e8b8;
    top: 0;
    right: 0;
`

export const DialogStyled = styled.dialog<{ $form: boolean }>`
    position: ${props => props.$form ? 'absolute' : 'fixed'};
    z-index: 999;
    top: 0;
    right: 0;
    margin-top: 6rem;
    font-size: 20px;
    min-width: 300px;
    line-height: 1.35;

    @media screen and (max-width: 800px) {
        iframe{
            width: 300px;
        }
    }

    form{
        display: flex;
        flex-direction: column;
    }

    h2{
        padding: 1rem;
        text-align: center;
    }
    strong{
        font-weight: 800;
    }
    span{
        font-size: 2rem;
        color: #f00;
        font-weight: 800;
    }


    button{
        border: 1px solid transparent;
        border-radius: 10px;
        margin-left: 1rem;
        padding: 0.75rem;
        width: fit-content;
        font-size: 1rem;
        font-weight: 700;
        &:hover{
            border: 1px solid #000;
        }
    }
    label{
        margin-top: .5rem;
        font-weight: 600;
    }
    input{
        padding: 0.5rem;
        font-size: 20px;
    }
    inpup[type=checkbox]{
        width: 20px;
        height: 20px;
    }
    textarea{
        padding: 0.5rem;
        font-size: 14px;
        font-weight: 400;
        scrollbar-width: thin;
        height: 100px;
    }
    .delele{
        background: #f00;
        color: #fff;
    }

    .update{
        background: #ff0;
        margin: 0;
        &:hover{
        background: #eeee00;
        }
    }

    .container_buttons{
        display: flex;
        gap:1rem;
        margin: 0;
        margin-top: 1rem;
        padding: 0;
    }
    .container_checkbox{
        scrollbar-width: thin;
        display:flex;
        flex-direction: row;
        flex-wrap: wrap;
        max-width: 300px;
        max-height: 300px;
        overflow-x: auto;
        padding: 0.75rem;
        justify-content: center;
        gap: 0.5rem;
        justify-items: center;
        /* justify-content: space-between; */
    }

    .checkbox_values{
        display: flex;
        gap: 0.2;
    }

`

type typeDialogProps = {
    id?: number | undefined,
    showModal: boolean,
    functionShowModal: () => void;
    linkVideo: string 
}

// const getAllLinks = () => {
//     fetch(`https://668480d656e7503d1ae06de1.mockapi.io/movies`)
//         .then(res => res.json())
//         .then(async (data) => {
//             data.map(movie => {
//                 fetch(`https://api.themoviedb.org/3/movie/${movie.id}/videos?api_key=7bd8468dd9add6745a48f0808ba6f1db&language=pt-BR`)
//                     .then(res => res.json())
//                     .then(data => {
//                         if (data.results[0].key) {
//                             console.log(movie.id,`https://www.youtube.com/watch?v=${data.results[0].key}`)
//                         }
//                     })
//             })
//         })
// }

export const Dialog = ({
    showModal = false,
    functionShowModal,
    linkVideo,
}: typeDialogProps) => {
    // const URL = `https://www.youtube.com/embed/${linkVideo}?si=_kJceVPnZL2f_Jga`
    const URL = linkVideo
    // console.log(linkVideo)
    return (
        <>
            {showModal &&
                <>
                    <OverlayStyled onClick={functionShowModal} />
                    <DialogStyled $form={false} open={showModal}>
                        <iframe
                            width="560"
                            height="315"
                            src={URL}
                        >
                        </iframe>
                        <form method="dialog">
                            <button onClick={functionShowModal}>Fechar</button>
                        </form>
                    </DialogStyled>
                </>
            }

        </>
    )
}
