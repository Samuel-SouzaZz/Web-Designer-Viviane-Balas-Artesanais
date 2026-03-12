import styled from 'styled-components'
import { GiCoconuts, GiCandyCanes, GiBalloons } from 'react-icons/gi'
import { FaGift } from 'react-icons/fa'
import { MdOutlineCookie } from 'react-icons/md'
import type { IconType } from 'react-icons'

type Category = {
  icon: IconType
  label: string
}

const CATEGORIES: Category[] = [
  { icon: GiCoconuts,       label: 'Balas de Coco' },
  { icon: GiCandyCanes,     label: 'Balas Recheadas' },
  { icon: MdOutlineCookie,  label: 'Biscoitos Artesanais' },
  { icon: FaGift,           label: 'Lembrancinhas' },
  { icon: GiBalloons,       label: 'Doces para Festas' },
]

const Section = styled.section`
  padding: 2.5rem 1.25rem 3rem;
  background: ${({ theme }) => theme.colors.surface};
  border-top: 1px solid ${({ theme }) => theme.colors.secondary};
  border-bottom: 1px solid ${({ theme }) => theme.colors.secondary};

  @media (min-width: 600px) {
    padding: 3.5rem 2rem 4rem;
  }
`

const Header = styled.div`
  max-width: 1200px;
  margin: 0 auto 2rem;
  text-align: center;

  @media (min-width: 600px) {
    margin-bottom: 2.5rem;
  }
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

/* Mobile: scroll horizontal com snap */
const ScrollWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: 599px) {
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none;
    &::-webkit-scrollbar { display: none; }
    padding-bottom: 0.25rem;
  }
`

const Grid = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 1rem;

  /* Mobile: fila única rolável */
  @media (max-width: 599px) {
    grid-template-columns: repeat(5, 140px);
    scroll-snap-type: x mandatory;
  }

  /* Tablet */
  @media (min-width: 600px) and (max-width: 899px) {
    grid-template-columns: repeat(3, 1fr);
  }

  /* Desktop */
  @media (min-width: 900px) {
    grid-template-columns: repeat(5, 1fr);
  }
`

const Card = styled.a`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.65rem;
  padding: 1.25rem 0.75rem;
  background: ${({ theme }) => theme.colors.background};
  border: 1.5px solid ${({ theme }) => theme.colors.secondary};
  border-radius: ${({ theme }) => theme.radii.md};
  text-decoration: none;
  cursor: pointer;
  transition: transform 0.18s, box-shadow 0.18s, border-color 0.18s;
  -webkit-tap-highlight-color: transparent;

  /* Mobile: snap item */
  @media (max-width: 599px) {
    scroll-snap-align: start;
    min-width: 140px;
  }

  &:hover {
    transform: translateY(-4px);
    box-shadow: ${({ theme }) => theme.shadows.md};
    border-color: ${({ theme }) => theme.colors.primary};
  }
`

const IconWrap = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 52px;
  height: 52px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.tertiary};
  color: ${({ theme }) => theme.colors.accent};

  svg {
    font-size: 1.6rem;
  }

  @media (min-width: 600px) {
    width: 60px;
    height: 60px;

    svg {
      font-size: 1.8rem;
    }
  }
`

const CardLabel = styled.span`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 0.8rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.primaryDark};
  text-align: center;
  line-height: 1.3;

  @media (min-width: 600px) {
    font-size: 0.85rem;
  }
`

export function CategorySection() {
  return (
    <Section>
      <Header>
        <SectionTitle>Nossos tipos de doces</SectionTitle>
        <SectionSubtitle>
          Escolha entre nossas opções artesanais feitas com carinho.
        </SectionSubtitle>
      </Header>

      <ScrollWrapper>
        <Grid>
          {CATEGORIES.map(({ icon: Icon, label }) => (
            <li key={label}>
              <Card href="#produtos" aria-label={`Ver produtos: ${label}`}>
                <IconWrap>
                  <Icon aria-hidden="true" />
                </IconWrap>
                <CardLabel>{label}</CardLabel>
              </Card>
            </li>
          ))}
        </Grid>
      </ScrollWrapper>
    </Section>
  )
}
