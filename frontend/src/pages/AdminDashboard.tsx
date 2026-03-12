import { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import styled from 'styled-components'
import { getProducts, deleteProduct } from '../services/products'
import { getAuthToken, clearAuthToken, getImageUrl } from '../lib/api'
import type { Product } from '../types/product'

const Page = styled.div`
  min-height: 100vh;
  padding: 2rem;
  background: ${({ theme }) => theme.colors.background};
  max-width: 1000px;
  margin: 0 auto;
`

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  gap: 1rem;
`

const Title = styled.h1`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.primaryDark};
  margin: 0;
`

const Actions = styled.div`
  display: flex;
  gap: 0.75rem;
`

const Button = styled.button`
  padding: 0.5rem 1rem;
  border-radius: ${({ theme }) => theme.radii.sm};
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  border: none;
  transition: opacity 0.2s;

  &.primary {
    background: ${({ theme }) => theme.colors.primaryDark};
    color: ${({ theme }) => theme.colors.surface};
  }
  &.secondary {
    background: ${({ theme }) => theme.colors.secondary};
    color: ${({ theme }) => theme.colors.primary};
  }
  &.danger {
    background: ${({ theme }) => theme.colors.accent};
    color: white;
  }
  &:hover {
    opacity: 0.9;
  }
`

const LinkBtn = styled(Link)`
  padding: 0.5rem 1rem;
  border-radius: ${({ theme }) => theme.radii.sm};
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  text-decoration: none;
  display: inline-block;
  background: ${({ theme }) => theme.colors.primaryDark};
  color: ${({ theme }) => theme.colors.surface};

  &:hover {
    opacity: 0.9;
  }
`

const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

const Item = styled.article`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.radii.md};
  box-shadow: ${({ theme }) => theme.shadows.sm};
  flex-wrap: wrap;
`

const Thumb = styled.div`
  width: 64px;
  height: 64px;
  border-radius: ${({ theme }) => theme.radii.sm};
  background: ${({ theme }) => theme.colors.tertiary};
  overflow: hidden;
  flex-shrink: 0;
`

const ThumbImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`

const Info = styled.div`
  flex: 1;
  min-width: 200px;
`

const Name = styled.div`
  font-weight: 600;
  color: ${({ theme }) => theme.colors.primaryDark};
`

const Meta = styled.div`
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.textMuted};
  margin-top: 0.25rem;
`

const Empty = styled.p`
  color: ${({ theme }) => theme.colors.textMuted};
  text-align: center;
  padding: 2rem;
`

function formatPrice(value: number): string {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value)
}

export function AdminDashboard() {
  const navigate = useNavigate()
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!getAuthToken()) {
      navigate('/admin/login', { replace: true })
      return
    }
    getProducts().then(setProducts).finally(() => setLoading(false))
  }, [navigate])

  function handleLogout() {
    clearAuthToken()
    navigate('/admin/login', { replace: true })
  }

  async function handleDelete(id: string) {
    if (!confirm('Excluir este produto?')) return
    const result = await deleteProduct(id)
    if (result.ok) setProducts((prev) => prev.filter((p) => p.id !== id))
    else alert(result.error)
  }

  if (loading) return <Page><Title>Carregando...</Title></Page>

  return (
    <Page>
      <Header>
        <Title>Painel admin — Produtos</Title>
        <Actions>
          <LinkBtn to="/">Ver site</LinkBtn>
          <LinkBtn to="/admin/novo">+ Novo produto</LinkBtn>
          <Button type="button" className="secondary" onClick={handleLogout}>
            Sair
          </Button>
        </Actions>
      </Header>
      <List>
        {products.length === 0 && <Empty>Nenhum produto cadastrado.</Empty>}
        {products.map((p) => (
          <Item key={p.id}>
            <Thumb>
              {getImageUrl(p.image_url) ? (
                <ThumbImg src={getImageUrl(p.image_url)!} alt={p.name} />
              ) : null}
            </Thumb>
            <Info>
              <Name>{p.name}</Name>
              <Meta>{p.category} · {formatPrice(p.price)}</Meta>
            </Info>
            <Actions>
              <LinkBtn to={`/admin/editar/${p.id}`}>Editar</LinkBtn>
              <Button type="button" className="danger" onClick={() => handleDelete(p.id)}>
                Excluir
              </Button>
            </Actions>
          </Item>
        ))}
      </List>
    </Page>
  )
}
