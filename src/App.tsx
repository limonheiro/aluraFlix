import styled from "styled-components"
import { Banner } from "./component/Banner"
import { GlobalStyled } from "./component/GlobalStyled"
import { Panel } from "./component/Panels/Panel"

const PanelStyled = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`

function App() {

  return (
    <>
    <GlobalStyled/>
    <Banner/>
    <PanelStyled>
      <Panel/>
      <Panel/>
    </PanelStyled>
    </>
  )
}

export default App
