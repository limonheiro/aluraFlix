import styled from "styled-components"
import { Banner } from "./component/Banner"
import { GlobalStyled } from "./component/GlobalStyled"
import { Panels } from "./component/Panels"
import { MoviesProvider } from "./context/MoviesContext"
import { Footer } from "./component/Footer"
import { useGenres } from "./hooks/useGenres"

const PanelStyled = styled.div`
  display: flex;
  flex-direction: column;
`

const LoadingStyeld = styled.div`

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  gap: 0.5rem;
  
  p{
    font-family: 'Inter';
    font-size: 1.5rem;
    /* -webkit-text-stroke: 2px #fff; */
    color: rgba(0, 0, 0, .1);

  }

  .loader {
    border: 4px solid rgba(0, 0, 0, .1);
    border-left-color: transparent;
    border-radius: 50%;
  }

  .loader {
    border: 4px solid rgba(0, 0, 0, .1);
    border-left-color: transparent;
    width: 60px;
    height: 60px;
  }

  .loader {
    border: 4px solid rgba(0, 0, 0, .1);
    border-left-color: transparent;
    width: 60px;
    height: 60px;
    animation: spin89345 0.5s linear infinite;
  }

  @keyframes spin89345 {
    0% {
      transform: rotate(0deg);
    }

    100% {
      transform: rotate(360deg);
    }
  }
`

function App() {
  const { isLoading } = useGenres()

  if (isLoading) {
    return (
      <>
        <LoadingStyeld>
          <div className="loader"></div>
          <p>Loading...</p>
        </LoadingStyeld>
      </>
    )
  }

  return (
    <>
      <GlobalStyled />
      <MoviesProvider>
        <Banner />
        <PanelStyled>
          <Panels />
        </PanelStyled>
      </MoviesProvider>
      <Footer />
    </>
  )
}

export default App
