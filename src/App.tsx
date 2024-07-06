import styled from "styled-components"
import { Banner } from "./component/Banner"
import { GlobalStyled } from "./component/GlobalStyled"
import { Panels } from "./component/Panels"
import { MoviesProvider } from "./context/MoviesContext"
import { Footer } from "./component/Footer"

const PanelStyled = styled.div`
  display: flex;
  flex-direction: column;
`

function App() {

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
