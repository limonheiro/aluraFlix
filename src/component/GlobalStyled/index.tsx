import { createGlobalStyle } from 'styled-components'
import './reset.css'

export const GlobalStyled = createGlobalStyle`
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
    }

`