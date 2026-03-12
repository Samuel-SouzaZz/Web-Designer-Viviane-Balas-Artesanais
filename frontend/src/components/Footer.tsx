import styled from 'styled-components'

const StyledFooter = styled.footer`
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.surface};
  padding: 1.5rem 1rem 2rem;
  padding-bottom: calc(1.5rem + env(safe-area-inset-bottom));
  margin-top: 3rem;
  text-align: center;
  border-top: 2px solid ${({ theme }) => theme.colors.primaryDark};

  @media (min-width: 600px) {
    padding: 2.5rem 2rem;
    margin-top: 4rem;
  }
`

const Content = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`

const Text = styled.p`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.surface};
  opacity: 0.95;
  margin: 0;
`

const Brand = styled.span`
  font-family: ${({ theme }) => theme.fonts.script};
  font-size: 1.2rem;
`

const Copy = styled.p`
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.tertiary};
  margin-top: 0.5rem;
  opacity: 0.9;
  margin-bottom: 0;
`

export function Footer() {
  return (
    <StyledFooter>
      <Content>
        <Text>
          <Brand>Viviane Balas</Brand> — Biscoitos e doces artesanais
        </Text>
        <Copy>© Todos os direitos reservados</Copy>
      </Content>
    </StyledFooter>
  )
}
