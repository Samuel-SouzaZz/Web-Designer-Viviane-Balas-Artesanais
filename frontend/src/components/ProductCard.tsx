import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { getImageUrl } from '../lib/api'
import type { Product } from '../types/product'

const Card = styled.article`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.radii.md};
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadows.sm};
  transition: box-shadow 0.2s;

  &:hover {
    box-shadow: ${({ theme }) => theme.shadows.md};
  }
`

const ImageWrap = styled.div`
  width: 100%;
  aspect-ratio: 1;
  background: ${({ theme }) => theme.colors.tertiary};
  display: flex;
  align-items: center;
  justify-content: center;
`

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`

const Placeholder = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 0.85rem;
`

const Content = styled.div`
  padding: 1rem 1.25rem 1.25rem;
`

const Category = styled.span`
  display: block;
  font-size: 0.7rem;
  color: ${({ theme }) => theme.colors.accent};
  font-family: ${({ theme }) => theme.fonts.body};
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  margin-bottom: 0.35rem;
`

const Name = styled.h4`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 1.1rem;
  font-weight: normal;
  margin: 0 0 0.4rem;
  color: ${({ theme }) => theme.colors.primaryDark};
  line-height: 1.25;
`

const ShortDesc = styled.p`
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.textMuted};
  line-height: 1.4;
  margin: 0 0 0.75rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`

const CardButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: 100%;
  background: ${({ theme }) => theme.colors.primaryDark};
  color: ${({ theme }) => theme.colors.surface};
  font-family: ${({ theme }) => theme.fonts.body};
  font-weight: 600;
  font-size: 0.85rem;
  padding: 0.6rem 1rem;
  min-height: 44px;
  border: none;
  border-radius: ${({ theme }) => theme.radii.sm};
  cursor: pointer;
  transition: background 0.2s;
  -webkit-tap-highlight-color: transparent;

  &:hover {
    background: ${({ theme }) => theme.colors.accent};
  }
`

// Modal
const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
  animation: fadeIn 0.2s ease-out;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;

  @media (max-width: 600px) {
    padding: 0;
    align-items: flex-start;
    min-height: 100vh;
    min-height: 100dvh;
  }

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
`

const ModalBox = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.radii.lg};
  max-width: 440px;
  width: 100%;
  max-height: 90vh;
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadows.lg};
  animation: slideIn 0.25s ease-out;
  display: flex;
  flex-direction: column;

  @media (max-width: 600px) {
    max-width: none;
    max-height: none;
    min-height: 100vh;
    min-height: 100dvh;
    border-radius: 0;
    box-shadow: none;
    margin: 0;
  }

  @keyframes slideIn {
    from {
      opacity: 0;
      transform: scale(0.95) translateY(-10px);
    }
    to {
      opacity: 1;
      transform: scale(1) translateY(0);
    }
  }
`

const ModalImageWrap = styled.div`
  width: 100%;
  aspect-ratio: 1;
  background: ${({ theme }) => theme.colors.tertiary};
  flex-shrink: 0;
`

const ModalImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`

const ModalContent = styled.div`
  padding: 1.5rem 1.5rem 1.75rem;
  overflow-y: auto;
  max-height: 50vh;
  -webkit-overflow-scrolling: touch;
  flex: 1 1 auto;

  @media (max-width: 600px) {
    max-height: none;
    padding: 1.25rem 1.25rem calc(1.75rem + env(safe-area-inset-bottom));
  }
`

const ModalCategory = styled.span`
  display: block;
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.accent};
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  margin-bottom: 0.35rem;
`

const ModalName = styled.h3`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 1.35rem;
  font-weight: normal;
  margin: 0 0 0.5rem;
  color: ${({ theme }) => theme.colors.primaryDark};
  line-height: 1.3;
`

const ModalPrice = styled.p`
  font-size: 1.2rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.primary};
  margin: 0 0 0.75rem;
`

const ModalDescription = styled.p`
  font-size: 0.95rem;
  color: ${({ theme }) => theme.colors.text};
  line-height: 1.5;
  margin: 0 0 1.25rem;
`

const ModalActions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;

  @media (max-width: 600px) {
    flex-direction: column;
  }
`

const ModalButton = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 0.75rem 1.25rem;
  min-height: 48px;
  border-radius: ${({ theme }) => theme.radii.sm};
  font-size: 0.9rem;
  font-weight: 600;
  text-decoration: none;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
  -webkit-tap-highlight-color: transparent;

  &.primary {
    background: ${({ theme }) => theme.colors.primaryDark};
    color: ${({ theme }) => theme.colors.surface};
  }
  &.primary:hover {
    background: ${({ theme }) => theme.colors.accent};
  }
  &.secondary {
    background: ${({ theme }) => theme.colors.secondary};
    color: ${({ theme }) => theme.colors.primary};
  }
  &.secondary:hover {
    background: ${({ theme }) => theme.colors.tertiary};
  }
`

const CloseButton = styled.button`
  position: absolute;
  top: max(0.75rem, env(safe-area-inset-top));
  right: max(0.75rem, env(safe-area-inset-right));
  width: 40px;
  height: 40px;
  min-width: 40px;
  min-height: 40px;
  border: none;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.5);
  color: white;
  font-size: 1.5rem;
  line-height: 1;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
  transition: background 0.2s;
  -webkit-tap-highlight-color: transparent;

  &:hover {
    background: rgba(0, 0, 0, 0.7);
  }
`

const ModalImageContainer = styled.div`
  position: relative;
`

function formatPrice(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value)
}

type ProductCardProps = {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const [modalOpen, setModalOpen] = useState(false)
  const imageUrl = getImageUrl(product.image_url)

  useEffect(() => {
    if (!modalOpen) return
    const scrollY = window.scrollY
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth
    const prevOverflow = document.body.style.overflow
    const prevPosition = document.body.style.position
    const prevTop = document.body.style.top
    const prevPaddingRight = document.body.style.paddingRight
    const prevWidth = document.body.style.width
    document.body.style.overflow = 'hidden'
    document.body.style.paddingRight = `${scrollbarWidth}px`
    document.body.style.position = 'fixed'
    document.body.style.top = `-${scrollY}px`
    document.body.style.left = '0'
    document.body.style.right = '0'
    document.body.style.width = '100%'
    return () => {
      document.body.style.overflow = prevOverflow
      document.body.style.position = prevPosition
      document.body.style.top = prevTop
      document.body.style.paddingRight = prevPaddingRight
      document.body.style.left = ''
      document.body.style.right = ''
      document.body.style.width = prevWidth
      window.scrollTo(0, scrollY)
    }
  }, [modalOpen])

  return (
    <>
      <Card>
        <ImageWrap>
          {imageUrl ? (
            <Image src={imageUrl} alt={product.name} loading="lazy" />
          ) : (
            <Placeholder>Sem foto</Placeholder>
          )}
        </ImageWrap>
        <Content>
          <Category>{product.category}</Category>
          <Name>{product.name}</Name>
          <ShortDesc>{product.description}</ShortDesc>
          <CardButton type="button" onClick={() => setModalOpen(true)}>
            Saiba mais
          </CardButton>
        </Content>
      </Card>

      {modalOpen && (
        <Overlay onClick={() => setModalOpen(false)}>
          <ModalBox onClick={(e) => e.stopPropagation()}>
            <ModalImageContainer>
              {imageUrl ? (
                <ModalImageWrap>
                  <ModalImage src={imageUrl} alt={product.name} />
                </ModalImageWrap>
              ) : (
                <ModalImageWrap>
                  <Placeholder>Sem foto</Placeholder>
                </ModalImageWrap>
              )}
              <CloseButton type="button" onClick={() => setModalOpen(false)} aria-label="Fechar">
                ×
              </CloseButton>
            </ModalImageContainer>
            <ModalContent>
              <ModalCategory>{product.category}</ModalCategory>
              <ModalName>{product.name}</ModalName>
              <ModalPrice>{formatPrice(product.price)}</ModalPrice>
              <ModalDescription>{product.description}</ModalDescription>
              <ModalActions>
                <ModalButton className="primary" href="#contato" onClick={() => setModalOpen(false)}>
                  Entrar em contato
                </ModalButton>
                <ModalButton className="secondary" as="button" type="button" onClick={() => setModalOpen(false)}>
                  Fechar
                </ModalButton>
              </ModalActions>
            </ModalContent>
          </ModalBox>
        </Overlay>
      )}
    </>
  )
}
