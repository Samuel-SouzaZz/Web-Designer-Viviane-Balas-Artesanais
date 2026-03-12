import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { FaWhatsapp } from 'react-icons/fa'
import { ProductCard } from './ProductCard'
import { getProducts } from '../services/products'
import type { Product } from '../types/product'

const WA_HREF =
  'https://wa.me/5532988583597?text=Ol%C3%A1!%20Gostaria%20de%20fazer%20uma%20encomenda%20na%20Viviane%20Balas%20e%20Biscoitos%20Artesanais.'

const Section = styled.section`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem 3rem;

  @media (min-width: 600px) {
    padding: 3rem 2rem 4rem;
  }
`

const SectionTitle = styled.h3`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 1.75rem;
  color: ${({ theme }) => theme.colors.primaryDark};
  margin: 0 0 0.5rem;
  text-align: center;
  font-weight: normal;
`

const SectionSubtitle = styled.p`
  font-size: 0.95rem;
  color: ${({ theme }) => theme.colors.textMuted};
  text-align: center;
  max-width: 520px;
  margin: 0 auto 2.5rem;
  line-height: 1.5;
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;

  @media (min-width: 480px) {
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 2rem;
  }
`

const Loading = styled.p`
  text-align: center;
  color: ${({ theme }) => theme.colors.textMuted};
  padding: 2rem;
`

const Error = styled.p`
  text-align: center;
  color: ${({ theme }) => theme.colors.accent};
  padding: 2rem;
`

const Empty = styled.p`
  text-align: center;
  color: ${({ theme }) => theme.colors.textMuted};
  padding: 2rem;
`

const CtaWrap = styled.div`
  margin-top: 2.5rem;
  display: flex;
  justify-content: center;
`

const CtaButton = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  background: #25d366;
  color: #fff;
  font-family: ${({ theme }) => theme.fonts.body};
  font-weight: 700;
  font-size: 1rem;
  padding: 0.85rem 2rem;
  min-height: 52px;
  border-radius: ${({ theme }) => theme.radii.md};
  text-decoration: none;
  transition: background 0.2s, transform 0.15s;
  -webkit-tap-highlight-color: transparent;

  svg {
    font-size: 1.3rem;
    flex-shrink: 0;
  }

  &:hover {
    background: #1ebe5d;
    transform: translateY(-2px);
  }
`

export function ProductGrid() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    getProducts().then((data) => {
      if (!cancelled) {
        setProducts(data)
        setError(null)
      }
      setLoading(false)
    }).catch(() => {
      if (!cancelled) {
        setError('Não foi possível carregar os produtos.')
        setLoading(false)
      }
    })
    return () => { cancelled = true }
  }, [])

  return (
    <Section id="produtos">
      <SectionTitle>Nossos produtos artesanais</SectionTitle>
      <SectionSubtitle>
        Cada item preparado com ingredientes cuidadosamente escolhidos. Clique para saber mais.
      </SectionSubtitle>
      {loading && <Loading>Carregando...</Loading>}
      {error && <Error>{error}</Error>}
      {!loading && !error && products.length === 0 && (
        <Empty>Ainda não há produtos cadastrados.</Empty>
      )}
      {!loading && !error && products.length > 0 && (
        <>
          <Grid>
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </Grid>
          <CtaWrap>
            <CtaButton href={WA_HREF} target="_blank" rel="noopener noreferrer">
              <FaWhatsapp />
              Encomendar pelo WhatsApp
            </CtaButton>
          </CtaWrap>
        </>
      )}
    </Section>
  )
}
