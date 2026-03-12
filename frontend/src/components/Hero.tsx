import styled from 'styled-components'
import { FaWhatsapp } from 'react-icons/fa'

const WA_HREF =
  'https://wa.me/5532988583597?text=Ol%C3%A1!%20Gostaria%20de%20fazer%20uma%20encomenda%20na%20Viviane%20Balas%20e%20Biscoitos%20Artesanais.'

const Section = styled.section`
  background: linear-gradient(
    160deg,
    ${({ theme }) => theme.colors.tertiary} 0%,
    ${({ theme }) => theme.colors.background} 60%
  );
  padding: 3rem 1.25rem 3.5rem;
  text-align: center;

  @media (min-width: 600px) {
    padding: 5rem 2rem 6rem;
  }
`

const Content = styled.div`
  max-width: 680px;
  margin: 0 auto;
`

const Label = styled.p`
  display: inline-block;
  font-size: 0.75rem;
  font-family: ${({ theme }) => theme.fonts.body};
  color: ${({ theme }) => theme.colors.accent};
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.14em;
  margin-bottom: 0.75rem;
  padding: 0.25rem 0.85rem;
  border: 1.5px solid ${({ theme }) => theme.colors.accent};
  border-radius: 999px;

  @media (min-width: 600px) {
    font-size: 0.8rem;
    margin-bottom: 1rem;
  }
`

const Title = styled.h1`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 2rem;
  color: ${({ theme }) => theme.colors.primaryDark};
  font-weight: normal;
  line-height: 1.2;
  margin-bottom: 1rem;

  @media (min-width: 600px) {
    font-size: 3rem;
    margin-bottom: 1.25rem;
  }
`

const Subtitle = styled.p`
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.textMuted};
  line-height: 1.7;
  margin-bottom: 2rem;
  max-width: 560px;
  margin-left: auto;
  margin-right: auto;

  @media (min-width: 600px) {
    font-size: 1.1rem;
    margin-bottom: 2.5rem;
  }
`

const CtaGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.85rem;

  @media (min-width: 480px) {
    flex-direction: row;
    justify-content: center;
  }
`

const CtaPrimary = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  background: #25d366;
  color: #fff;
  font-family: ${({ theme }) => theme.fonts.body};
  font-weight: 700;
  font-size: 1rem;
  padding: 0.85rem 1.75rem;
  min-height: 52px;
  border-radius: ${({ theme }) => theme.radii.md};
  transition: background 0.2s, transform 0.15s;
  -webkit-tap-highlight-color: transparent;
  text-decoration: none;

  svg {
    font-size: 1.3rem;
    flex-shrink: 0;
  }

  &:hover {
    background: #1ebe5d;
    transform: translateY(-2px);
  }

  @media (min-width: 480px) {
    font-size: 1rem;
  }
`

const CtaSecondary = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  color: ${({ theme }) => theme.colors.primaryDark};
  font-family: ${({ theme }) => theme.fonts.body};
  font-weight: 600;
  font-size: 1rem;
  padding: 0.85rem 1.75rem;
  min-height: 52px;
  border-radius: ${({ theme }) => theme.radii.md};
  border: 2px solid ${({ theme }) => theme.colors.primary};
  transition: background 0.2s, color 0.2s, transform 0.15s;
  -webkit-tap-highlight-color: transparent;
  text-decoration: none;

  &:hover {
    background: ${({ theme }) => theme.colors.secondary};
    color: ${({ theme }) => theme.colors.primaryDark};
    transform: translateY(-2px);
  }
`

export function Hero() {
  return (
    <Section id="inicio">
      <Content>
        <Label>Feito à mão com carinho</Label>
        <Title>Sabor artesanal feito com amor e tradição</Title>
        <Subtitle>
          Balas de coco, biscoitos e doces artesanais para adoçar seus momentos especiais.
          Perfeitos para presentear, festejar e encantar.
        </Subtitle>
        <CtaGroup>
          <CtaPrimary
            href={WA_HREF}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaWhatsapp />
            Fazer pedido no WhatsApp
          </CtaPrimary>
          <CtaSecondary href="#produtos">
            Ver catálogo
          </CtaSecondary>
        </CtaGroup>
      </Content>
    </Section>
  )
}
