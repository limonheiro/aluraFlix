import styled from "styled-components";

export const Container = styled.div<{column:boolean}>`
        display: flex;
        flex-direction: ${props => props.column ? 'column': 'row'};
        flex-wrap: wrap;
        /* max-width: 1200px; */
        /* width: 100%; */
        gap: 0.25rem;
        padding: 0.25rem 1rem 2rem 1rem;
        justify-content: space-evenly;
        align-items: center;
        

`