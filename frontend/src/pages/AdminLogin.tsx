import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import styled from 'styled-components'
import { login } from '../services/products'
import { setAuthToken } from '../lib/api'

const Wrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.colors.background};
`

const TopBar = styled.header`
  background: ${({ theme }) => theme.colors.secondary};
  border-bottom: 3px solid ${({ theme }) => theme.colors.primary};
  padding: 1rem 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 0.75rem;
`

const Brand = styled(Link)`
  font-family: ${({ theme }) => theme.fonts.script};
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.primaryDark};
  text-decoration: none;
  font-weight: 600;

  &:hover {
    color: ${({ theme }) => theme.colors.accent};
  }
`

const AdminLabel = styled.span`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 600;
`

const BackToSite = styled(Link)`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.primary};
  text-decoration: none;
  font-weight: 500;

  &:hover {
    text-decoration: underline;
    color: ${({ theme }) => theme.colors.accent};
  }
`

const Page = styled.main`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
`

const Card = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  padding: 2.5rem;
  border-radius: ${({ theme }) => theme.radii.lg};
  box-shadow: ${({ theme }) => theme.shadows.lg};
  border: 2px solid ${({ theme }) => theme.colors.secondary};
  width: 100%;
  max-width: 420px;
`

const Title = styled.h1`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 1.75rem;
  color: ${({ theme }) => theme.colors.primaryDark};
  margin: 0 0 0.25rem;
  text-align: center;
`

const Subtitle = styled.p`
  font-size: 0.95rem;
  color: ${({ theme }) => theme.colors.textMuted};
  text-align: center;
  margin: 0 0 1.75rem;
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`

const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
`

const Label = styled.label`
  font-size: 0.9rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
`

const Input = styled.input`
  width: 100%;
  padding: 0.85rem 1rem;
  border: 2px solid ${({ theme }) => theme.colors.secondary};
  border-radius: ${({ theme }) => theme.radii.sm};
  font-size: 1rem;
  font-family: ${({ theme }) => theme.fonts.body};
  transition: border-color 0.2s;

  &::placeholder {
    color: ${({ theme }) => theme.colors.textMuted};
  }
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }
`

const Error = styled.p`
  color: ${({ theme }) => theme.colors.accent};
  font-size: 0.9rem;
  margin: 0;
  font-weight: 500;
`

const Button = styled.button`
  padding: 0.85rem 1.5rem;
  background: ${({ theme }) => theme.colors.primaryDark};
  color: ${({ theme }) => theme.colors.surface};
  border: none;
  border-radius: ${({ theme }) => theme.radii.md};
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
  text-align: center;

  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.colors.accent};
  }
  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`

const FooterLink = styled(Link)`
  display: block;
  text-align: center;
  margin-top: 1.25rem;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.primary};
  text-decoration: none;

  &:hover {
    text-decoration: underline;
    color: ${({ theme }) => theme.colors.accent};
  }
`

export function AdminLogin() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)
    const result = await login(email.trim(), password)
    setLoading(false)
    if (result.ok && result.token) {
      setAuthToken(result.token)
      navigate('/admin', { replace: true })
    } else {
      setError(result.error || 'Erro ao entrar')
    }
  }

  return (
    <Wrapper>
      <TopBar>
        <Brand to="/">Viviane Balas</Brand>
        <AdminLabel>Área administrativa</AdminLabel>
        <BackToSite to="/">← Voltar ao site</BackToSite>
      </TopBar>

      <Page>
        <Card>
          <Title>Login do administrador</Title>
          <Subtitle>Use seu email e senha para acessar o painel.</Subtitle>
          <Form onSubmit={handleSubmit}>
            <Field>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu@email.com"
                required
                autoComplete="email"
              />
            </Field>
            <Field>
              <Label htmlFor="password">Senha</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                autoComplete="current-password"
              />
            </Field>
            {error && <Error>{error}</Error>}
            <Button type="submit" disabled={loading}>
              {loading ? 'Entrando...' : 'Entrar'}
            </Button>
          </Form>
          <FooterLink to="/">← Voltar ao site</FooterLink>
        </Card>
      </Page>
    </Wrapper>
  )
}
