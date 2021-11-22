import styled from "styled-components";

export const Container = styled.div `
    display:grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem; //espaçamento dentro do grid
    margin-top: -10rem;

    div {
        background: var(--shape);
        padding: 1.5rem 2rem;
        border-radius: 0.25rem;
        color: var(--text-title);

        header {
            display:flex;
            align-items:center;
            justify-content:space-between;
        }
        strong { //por padrão vem com display in-line, ai o margin top nao funciona
            display:block;
            margin-top:1rem;
            font-size:2rem;
            font-weight:500;
            line-height:3rem;
        }
        &.highlight-background {
            background: var(--green);
            color: #fff;
        }

    }

    @media (max-width: 820px) {
        div{
            strong{
                font-size:1.5rem;
            }
        }
    }

    @media (max-width: 640px) {
        div{
            strong{
                font-size:1rem;
            }
        }
    }

    @media (max-width: 520px) {
        div{
            header{
                p{
                    display: none;
                }
            }
            strong{
                font-size:0.9rem;
            }
        }
    }

    @media (max-width: 490px) {
        display: flex;
        flex-direction: column;
        gap: 0.2rem;
        
        div{
            display: flex;
            align-items: center;
            justify-content: space-around;

            strong{
                font-size:1.5rem;
            }
        }
    }    
`;