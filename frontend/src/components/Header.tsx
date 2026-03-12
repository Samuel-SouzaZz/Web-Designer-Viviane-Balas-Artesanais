import { useState } from 'react'
import styled from 'styled-components'
import { HiOutlineDotsVertical } from 'react-icons/hi'

const StyledHeader = styled.header`
  background: ${({ theme }) => theme.colors.secondary};
  padding: 0.75rem 1rem;
  box-shadow: ${({ theme }) => theme.shadows.sm};
  border-bottom: 2px solid ${({ theme }) => theme.colors.primary};
  position: relative;

  @media (min-width: 600px) {
    padding: 1rem 2rem;
  }
`

const Nav = styled.nav`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 70px;
  gap: 0.75rem;

  @media (min-width: 600px) {
    min-height: 100px;
  }
`

const MenuButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  min-width: 44px;
  min-height: 44px;
  border: none;
  border-radius: ${({ theme }) => theme.radii.sm};
  background: transparent;
  color: ${({ theme }) => theme.colors.primary};
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;

  @media (min-width: 600px) {
    display: none;
  }

  &:hover {
    background: ${({ theme }) => theme.colors.tertiary};
    color: ${({ theme }) => theme.colors.primaryDark};
  }

  svg {
    font-size: 1.5rem;
  }
`

const LogoLink = styled.a`
  display: flex;
  align-items: center;
  height: 60px;
  margin-left: 0;

  @media (min-width: 600px) {
    height: 100px;
    margin-left: 0;
  }
`

const LogoImage = styled.img`
  height: 60px;
  width: auto;
  object-fit: contain;

  @media (min-width: 600px) {
    height: 100px;
  }
`

const NavItem = styled.li`
  display: flex;
  align-items: center;

  @media (max-width: 599px) {
    width: 100%;
  }
`

const NavLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.primary};
  font-family: ${({ theme }) => theme.fonts.heading};
  font-weight: 600;
  font-size: 0.85rem;
  padding: 0.4rem 0;
  border-radius: ${({ theme }) => theme.radii.sm};
  transition: color 0.2s;
  -webkit-tap-highlight-color: transparent;

  @media (min-width: 600px) {
    font-size: 1rem;
    padding: 0.5rem 0;
  }

  @media (max-width: 599px) {
    justify-content: flex-start;
    padding: 1rem 1.25rem;
    font-size: 1.1rem;
    background: ${({ theme }) => theme.colors.surface};
    margin-bottom: 0.5rem;
    border-radius: ${({ theme }) => theme.radii.md};
  }

  &:hover {
    color: ${({ theme }) => theme.colors.accent};
  }
`

const CtaButton = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  background: ${({ theme }) => theme.colors.primaryDark};
  color: ${({ theme }) => theme.colors.surface};
  font-family: ${({ theme }) => theme.fonts.heading};
  font-weight: 600;
  font-size: 0.85rem;
  padding: 0.5rem 1rem;
  border-radius: ${({ theme }) => theme.radii.md};
  transition: background 0.2s, transform 0.1s;
  -webkit-tap-highlight-color: transparent;

  @media (min-width: 600px) {
    font-size: 0.95rem;
    padding: 0.6rem 1.25rem;
    margin-left: 0.5rem;
  }

  @media (max-width: 599px) {
    justify-content: center;
    padding: 1rem 1.25rem;
    font-size: 1.05rem;
    margin-top: 0.5rem;
    margin-bottom: 0;
  }

  &:hover {
    background: ${({ theme }) => theme.colors.accent};
    transform: translateY(-1px);
  }
`

const DrawerPanel = styled.div<{ $open: boolean }>`
  @media (max-width: 599px) {
    position: fixed;
    top: 0;
    left: 0;
    width: min(300px, 85vw);
    max-width: 300px;
    height: 100%;
    height: 100dvh;
    background: ${({ theme }) => theme.colors.surface};
    z-index: 1000;
    padding: 1rem 0 2rem;
    padding-top: max(1rem, env(safe-area-inset-top));
    padding-bottom: max(2rem, env(safe-area-inset-bottom));
    box-shadow: ${({ theme }) => theme.shadows.lg};
    transform: translateX(${({ $open }) => ($open ? '0' : '-100%')});
    transition: transform 0.25s ease-out;
    overflow-y: auto;
  }

  @media (min-width: 600px) {
    display: contents;
  }
`

const DrawerBackdrop = styled.div<{ $open: boolean }>`
  @media (max-width: 599px) {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.4);
    z-index: 998;
    opacity: ${({ $open }) => ($open ? 1 : 0)};
    visibility: ${({ $open }) => ($open ? 'visible' : 'hidden')};
    transition: opacity 0.2s, visibility 0.2s;
  }

  @media (min-width: 600px) {
    display: none;
  }
`

const DrawerTitle = styled.span`
  @media (max-width: 599px) {
    display: block;
    font-family: ${({ theme }) => theme.fonts.script};
    font-size: 1.25rem;
    color: ${({ theme }) => theme.colors.primary};
    padding: 0 1.25rem 1rem;
    border-bottom: 1px solid ${({ theme }) => theme.colors.secondary};
    margin-bottom: 0.5rem;
  }

  @media (min-width: 600px) {
    display: none;
  }
`

const DrawerLinks = styled.ul`
  @media (max-width: 599px) {
    list-style: none;
    margin: 0;
    padding: 0 0.75rem;
  }

  @media (min-width: 600px) {
    display: none;
  }
`

const DesktopLinks = styled.ul`
  display: none;

  @media (min-width: 600px) {
    display: flex;
    list-style: none;
    margin: 0;
    padding: 0;
    gap: 2rem;
    align-items: center;
  }
`

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  function closeMenu() {
    setMenuOpen(false)
  }

  return (
    <StyledHeader>
      <Nav>
        <MenuButton
          type="button"
          onClick={() => setMenuOpen(true)}
          aria-label="Abrir menu"
          aria-expanded={menuOpen}
        >
          <HiOutlineDotsVertical />
        </MenuButton>

        <LogoLink href="#inicio" aria-label="Vivi Balas - Início">
          <LogoImage src="/logo.png" alt="Vivi Balas e Biscoitos Artesanais" />
        </LogoLink>

        <DesktopLinks>
          <NavItem>
            <NavLink href="#inicio">Início</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="#produtos">Produtos</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="#contato">Contato</NavLink>
          </NavItem>
          <NavItem>
            <CtaButton href="#contato">Peça agora</CtaButton>
          </NavItem>
        </DesktopLinks>
      </Nav>

      <DrawerBackdrop $open={menuOpen} onClick={closeMenu} aria-hidden="true" />
      <DrawerPanel $open={menuOpen}>
        <DrawerTitle>Menu</DrawerTitle>
        <DrawerLinks>
          <li>
            <NavLink href="#inicio" onClick={closeMenu}>Início</NavLink>
          </li>
          <li>
            <NavLink href="#produtos" onClick={closeMenu}>Produtos</NavLink>
          </li>
          <li>
            <NavLink href="#contato" onClick={closeMenu}>Contato</NavLink>
          </li>
          <li>
            <CtaButton href="#contato" onClick={closeMenu}>Peça agora</CtaButton>
          </li>
        </DrawerLinks>
      </DrawerPanel>
    </StyledHeader>
  )
}
