import styled from "styled-components"
import { Banner } from "./component/Banner"
import { GlobalStyled } from "./component/GlobalStyled"
import { Panels } from "./component/Panels"
import { MoviesProvider } from "./context/MoviesContext"

const PanelStyled = styled.div`
  display: flex;
  flex-direction: column;
  /* gap: 16px; */
`

function App() {

  return (
    <>
    <GlobalStyled/>
    <Banner/>
    <MoviesProvider>
    <PanelStyled>
      <Panels/>
    </PanelStyled>
    </MoviesProvider>
    </>
  )
}

export default App
