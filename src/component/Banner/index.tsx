import React from 'react'
import styled from 'styled-components'
import img from '/img/madMax.jpg'

const BannerStyled = styled.div`
    display: flex;
    
`

export const Banner = () => {
  return (
    <BannerStyled>
        <img src={img}/>
    </BannerStyled>
  )
}
