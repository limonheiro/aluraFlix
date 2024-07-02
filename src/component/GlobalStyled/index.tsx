import { createGlobalStyle } from 'styled-components'
import './reset.css'

export const GlobalStyled = createGlobalStyle`

    width: 100%;

    .bg_title{
        font-size: 64px;
        font-weight: 900;
    }

    .md_title{
        font-size: 48px;
        font-weight: 600;
    }

    .panel_title{
        font-size: 24px;
        font-weight: 900;
    }

    .panel_sub_title{
        font-size: 14px;
        font-weight: 200;
    }

    body{
        min-width: 350px;
        height: 100%;
        /* width: 100vh; */
        color: #fff;
        display: flex;
        flex-direction: column;
    }

`