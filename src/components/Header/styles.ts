import styled from 'styled-components'

export const Container = styled.header`
    background:var(--blue);
`;

export const Content = styled.div`
    max-width: 1120px;
    margin: 0 auto;

    padding: 2rem 1rem 12rem;
    
    display:flex;
    align-items: center;
    justify-content: space-between;

    #button{
        display:flex;
        align-items: center;
        justify-content: center;

        /* button:nth-child(2){
            margin-left: 1rem;
        } */
        
        button{
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1rem;
            color:#fff;
            background: var(--blue-light);
            border:0;
            padding: 0 2rem;
            border-radius: 0.25rem;
            height:3rem;

            &{
                margin-left: 1rem;
            }

            transition : filter 0.2s;

            &:hover {
                filter: brightness(0.9);
            }

            img{
                width:1.5rem;
                margin-left:0.5rem;
            }
        }
    }
    @media (max-width: 490px){
        button{ 
            padding: 0 0.5rem;
        }
    }


`;