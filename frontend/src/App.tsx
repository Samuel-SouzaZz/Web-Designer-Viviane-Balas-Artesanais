import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import { theme } from './theme'
import { GlobalStyles } from './styles/GlobalStyles'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { CategorySection } from './components/CategorySection'
import { DifferentialsSection } from './components/DifferentialsSection'
import { ProductGrid } from './components/ProductGrid'
import { ContactSection } from './components/ContactSection'
import { Footer } from './components/Footer'
import { AdminLogin } from './pages/AdminLogin'
import { AdminDashboard } from './pages/AdminDashboard'
import { AdminProductForm } from './pages/AdminProductForm'
import { getAuthToken } from './lib/api'

function PublicSite() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <CategorySection />
        <DifferentialsSection />
        <ProductGrid />
        <ContactSection />
      </main>
      <Footer />
    </>
  )
}

function AdminRoute({ children }: { children: React.ReactNode }) {
  if (!getAuthToken()) return <Navigate to="/admin/login" replace />
  return <>{children}</>
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PublicSite />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
          <Route path="/admin/novo" element={<AdminRoute><AdminProductForm /></AdminRoute>} />
          <Route path="/admin/editar/:id" element={<AdminRoute><AdminProductForm /></AdminRoute>} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
