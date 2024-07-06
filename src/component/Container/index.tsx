import styled from "styled-components";

export const Container = styled.div<{ column: true | false }>`
        display: flex;
        flex-direction: ${props => props.column ? 'column' : 'row'};
        flex-wrap: wrap;

        gap: 0.25rem;
        padding: ${props => props.column ? '0' : '0.25rem 1rem 2rem 1rem'} ;
        justify-content: ${props => props.column ? 'space-evenly' : 'start'};
        align-items: center;
        align-self: baseline;
`