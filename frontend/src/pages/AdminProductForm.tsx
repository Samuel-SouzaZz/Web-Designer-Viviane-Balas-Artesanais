import { useState, useEffect } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import styled from 'styled-components'
import { getAuthToken } from '../lib/api'
import { getProducts, createProduct, updateProduct } from '../services/products'
import type { ProductForm as ProductFormType } from '../types/product'

const Page = styled.div`
  min-height: 100vh;
  padding: 2rem;
  background: ${({ theme }) => theme.colors.background};
  max-width: 600px;
  margin: 0 auto;
`

const Title = styled.h1`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.primaryDark};
  margin-bottom: 1.5rem;
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`

const Label = styled.label`
  font-size: 0.9rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
`

const Input = styled.input`
  width: 100%;
  padding: 0.75rem 1rem;
  border: 2px solid ${({ theme }) => theme.colors.secondary};
  border-radius: ${({ theme }) => theme.radii.sm};
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }
`

const Textarea = styled.textarea`
  width: 100%;
  padding: 0.75rem 1rem;
  border: 2px solid ${({ theme }) => theme.colors.secondary};
  border-radius: ${({ theme }) => theme.radii.sm};
  font-size: 1rem;
  min-height: 100px;
  resize: vertical;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }
`

const Error = styled.p`
  color: ${({ theme }) => theme.colors.accent};
  font-size: 0.9rem;
  margin: 0;
`

const Button = styled.button`
  padding: 0.75rem 1.5rem;
  background: ${({ theme }) => theme.colors.primaryDark};
  color: ${({ theme }) => theme.colors.surface};
  border: none;
  border-radius: ${({ theme }) => theme.radii.md};
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    background: ${({ theme }) => theme.colors.accent};
  }
  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`

const BackLink = styled(Link)`
  display: inline-block;
  margin-bottom: 1rem;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.primary};
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`

export function AdminProductForm() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const isEdit = Boolean(id)
  const [name, setName] = useState('')
  const [category, setCategory] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [image, setImage] = useState<File | null>(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!getAuthToken()) {
      navigate('/admin/login', { replace: true })
      return
    }
    if (isEdit && id) {
      getProducts().then((list) => {
        const p = list.find((x) => x.id === id)
        if (p) {
          setName(p.name)
          setCategory(p.category)
          setDescription(p.description)
          setPrice(String(p.price))
        }
      })
    }
  }, [isEdit, id, navigate])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)
    const form: ProductFormType = { name, category, description, price, image: image || undefined }
    const result = isEdit && id
      ? await updateProduct(id, form)
      : await createProduct(form)
    setLoading(false)
    if (result.ok) {
      navigate('/admin', { replace: true })
    } else {
      setError(result.error || 'Erro ao salvar')
    }
  }

  return (
    <Page>
      <BackLink to="/admin">← Voltar ao painel</BackLink>
      <Title>{isEdit ? 'Editar produto' : 'Novo produto'}</Title>
      <Form onSubmit={handleSubmit}>
        <div>
          <Label htmlFor="name">Nome</Label>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="category">Categoria</Label>
          <Input
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="Ex: Balas de coco, Biscoitos, Doces"
            required
          />
        </div>
        <div>
          <Label htmlFor="description">Descrição</Label>
          <Textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="price">Preço (R$)</Label>
          <Input
            id="price"
            type="text"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="0,00"
            required
          />
        </div>
        <div>
          <Label htmlFor="image">Foto {isEdit && '(deixe em branco para manter a atual)'}</Label>
          <Input
            id="image"
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files?.[0] ?? null)}
          />
        </div>
        {error && <Error>{error}</Error>}
        <Button type="submit" disabled={loading}>
          {loading ? 'Salvando...' : isEdit ? 'Salvar' : 'Cadastrar'}
        </Button>
      </Form>
    </Page>
  )
}
