import styled from 'styled-components'
import { FaLeaf, FaHeart, FaGift, FaStar } from 'react-icons/fa'
import type { IconType } from 'react-icons'

type Differential = {
  icon: IconType
  title: string
  text: string
}

const DIFFERENTIALS: Differential[] = [
  {
    icon: FaLeaf,
    title: '100% Artesanal',
    text: 'Produção feita com cuidado, atenção e aquele toque caseiro que faz a diferença.',
  },
  {
    icon: FaHeart,
    title: 'Feito com Carinho',
    text: 'Receitas preparadas com dedicação para entregar sabor, afeto e qualidade.',
  },
  {
    icon: FaGift,
    title: 'Ideal para Presentes',
    text: 'Perfeito para surpreender em datas especiais, festas e lembranças cheias de carinho.',
  },
  {
    icon: FaStar,
    title: 'Personalize seu Pedido',
    text: 'Opções pensadas para combinar com o seu evento, presente ou encomenda especial.',
  },
]

const Section = styled.section`
  padding: 3rem 1.25rem 3.5rem;
  background: linear-gradient(
    180deg,
    ${({ theme }) => theme.colors.background} 0%,
    ${({ theme }) => theme.colors.tertiary} 100%
  );

  @media (min-width: 600px) {
    padding: 4rem 2rem 5rem;
  }
`

const Header = styled.div`
  max-width: 1200px;
  margin: 0 auto 2.5rem;
  text-align: center;
`

const SectionTitle = styled.h2`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.primaryDark};
  font-weight: normal;
  margin-bottom: 0.4rem;

  @media (min-width: 600px) {
    font-size: 2rem;
  }
`

const SectionSubtitle = styled.p`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.textMuted};
  line-height: 1.5;

  @media (min-width: 600px) {
    font-size: 0.95rem;
  }
`

const Grid = styled.ul`
  list-style: none;
  margin: 0 auto;
  padding: 0;
  max-width: 1200px;
  display: grid;
  gap: 1rem;

  /* Mobile: 2 colunas */
  grid-template-columns: repeat(2, 1fr);

  /* Desktop: 4 colunas */
  @media (min-width: 800px) {
    grid-template-columns: repeat(4, 1fr);
    gap: 1.5rem;
  }
`

const Card = styled.li`
  background: ${({ theme }) => theme.colors.surface};
  border: 1.5px solid ${({ theme }) => theme.colors.secondary};
  border-radius: ${({ theme }) => theme.radii.md};
  padding: 1.5rem 1.25rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.75rem;
  transition: transform 0.18s, box-shadow 0.18s;

  &:hover {
    transform: translateY(-3px);
    box-shadow: ${({ theme }) => theme.shadows.sm};
  }

  @media (min-width: 600px) {
    padding: 1.75rem 1.5rem;
  }
`

const IconWrap = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: ${({ theme }) => theme.radii.sm};
  background: ${({ theme }) => theme.colors.tertiary};
  color: ${({ theme }) => theme.colors.accent};
  flex-shrink: 0;

  svg {
    font-size: 1.4rem;
  }

  @media (min-width: 600px) {
    width: 54px;
    height: 54px;

    svg {
      font-size: 1.6rem;
    }
  }
`

const CardTitle = styled.h3`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 1rem;
  font-weight: normal;
  color: ${({ theme }) => theme.colors.primaryDark};
  line-height: 1.3;
  margin: 0;

  @media (min-width: 600px) {
    font-size: 1.1rem;
  }
`

const CardText = styled.p`
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.textMuted};
  line-height: 1.55;
  margin: 0;

  @media (min-width: 600px) {
    font-size: 0.9rem;
  }
`

export function DifferentialsSection() {
  return (
    <Section aria-label="Nossos diferenciais">
      <Header>
        <SectionTitle>Por que escolher nossos doces?</SectionTitle>
        <SectionSubtitle>
          Cada detalhe é pensado para tornar seus momentos mais especiais.
        </SectionSubtitle>
      </Header>

      <Grid>
        {DIFFERENTIALS.map(({ icon: Icon, title, text }) => (
          <Card key={title}>
            <IconWrap>
              <Icon aria-hidden="true" />
            </IconWrap>
            <div>
              <CardTitle>{title}</CardTitle>
              <CardText>{text}</CardText>
            </div>
          </Card>
        ))}
      </Grid>
    </Section>
  )
}
