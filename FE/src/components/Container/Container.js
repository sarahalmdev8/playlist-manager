import styled from 'styled-components'

const Container = styled.div`
  flex: 1;
  margin: 0;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: ${({ centered }) => centered ? 'center' : 'flex-start' };
  justify-content: ${({ centered }) => centered ? 'center' : 'flex-start' };
`

export default Container
