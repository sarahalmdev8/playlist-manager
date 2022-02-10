import styled from 'styled-components'

const Card = styled.div`
  margin: 1rem;
  padding: 1rem;
  display: flex;
  flex-wrap: wrap;
  cursor: pointer;
  border-radius: 0.5rem;
  align-items: center;
  flex-direction: column;
  background-color: #FFF;
  box-shadow: 0px 1px 2px #8888;

  &:hover {
    box-shadow: 0px 2px 3px #8888;
  }

  @media (min-width: 1200px) {
    width: 18vw;
  }

  @media (max-width: 900px) {
    width: 28vw;
  }

  @media (max-width: 600px) {
    width: 80vw;
  }

`

export default Card
