import styled from 'styled-components'
import { FaWhatsapp, FaInstagram } from 'react-icons/fa'
import { HiOutlineGlobe } from 'react-icons/hi'

const Section = styled.section`
  padding: 3rem 1.25rem 4rem;
  background: linear-gradient(180deg, ${({ theme }) => theme.colors.tertiary} 0%, ${({ theme }) => theme.colors.secondary} 100%);
  border-top: 2px solid ${({ theme }) => theme.colors.primary};

  @media (min-width: 600px) {
    padding: 4rem 2rem 5rem;
  }
`

const Wrap = styled.div`
  max-width: 480px;
  margin: 0 auto;
  text-align: center;
`

const Title = styled.h2`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 1.75rem;
  color: ${({ theme }) => theme.colors.primaryDark};
  margin: 0 0 0.5rem;
  font-weight: normal;

  @media (min-width: 600px) {
    font-size: 2rem;
  }
`

const Description = styled.p`
  font-size: 0.95rem;
  color: ${({ theme }) => theme.colors.text};
  line-height: 1.5;
  margin: 0 0 1.5rem;
`

const ConnectLabel = styled.p`
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 600;
  margin: 0 0 1.25rem;
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
`

const LinkList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`

const LinkItem = styled.li``

const LinkButton = styled.a<{ $highlight?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  width: 100%;
  padding: 1rem 1.25rem;
  min-height: 56px;
  background: ${({ theme, $highlight }) => ($highlight ? theme.colors.primaryDark : theme.colors.surface)};
  color: ${({ theme, $highlight }) => ($highlight ? theme.colors.surface : theme.colors.primaryDark)};
  border-radius: ${({ theme }) => theme.radii.lg};
  border: 2px solid ${({ theme }) => theme.colors.secondary};
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 1rem;
  font-weight: 600;
  text-decoration: none;
  box-shadow: ${({ theme }) => theme.shadows.sm};
  transition: transform 0.15s, box-shadow 0.15s, border-color 0.15s;
  -webkit-tap-highlight-color: transparent;

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.md};
    border-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme, $highlight }) => ($highlight ? theme.colors.surface : theme.colors.accent)};
  }

  svg {
    font-size: 1.4rem;
    flex-shrink: 0;
  }
`

const CONTACT_LINKS = [
  {
    icon: FaWhatsapp,
    label: 'Fazer pedido no WhatsApp',
    href: 'https://wa.me/5532988583597?text=Ol%C3%A1!%20Gostaria%20de%20fazer%20uma%20encomenda%20na%20Viviane%20Balas%20e%20Biscoitos%20Artesanais.',
  },
  {
    icon: FaInstagram,
    label: 'Siga no Instagram',
    href: 'https://www.instagram.com/vivibalasartesanais?igsh=djc4Mm03bmJ3aXhq&utm_source=qr',
  },
  {
    icon: HiOutlineGlobe,
    label: 'Ver catálogo de produtos',
    href: '#produtos',
    highlight: true,
  },
]

export function ContactSection() {
  return (
    <Section id="contato">
      <Wrap>
        <Title>Fale com a Viviane</Title>
        <Description>
          Entre em contato para fazer sua encomenda, montar um presente especial ou criar
          lembrancinhas personalizadas para sua festa. Será um prazer adoçar o seu momento
          com carinho e sabor artesanal.
        </Description>
        <ConnectLabel>
          Entre em contato
        </ConnectLabel>
        <LinkList>
          {CONTACT_LINKS.map((link) => (
            <LinkItem key={link.label}>
              <LinkButton
                href={link.href}
                target={link.href.startsWith('http') ? '_blank' : undefined}
                rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                $highlight={link.highlight}
              >
                <link.icon />
                {link.label}
              </LinkButton>
            </LinkItem>
          ))}
        </LinkList>
      </Wrap>
    </Section>
  )
}
