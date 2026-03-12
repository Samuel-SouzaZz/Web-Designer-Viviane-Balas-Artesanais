export const theme = {
  colors: {
    // Paleta Viviane — Verde oliva, rosa, bege, laranja
    primary: '#80805D',       // Verde oliva (principal)
    primaryDark: '#5c5c42',   // Verde oliva escuro
    secondary: '#EDD7D5',     // Rosa claro
    tertiary: '#E7D4B5',      // Bege claro
    accent: '#B65600',        // Laranja queimado (destaque)
    background: '#F5F0EB',    // Bege/claro estilo bakery
    surface: '#ffffff',
    text: '#4a4a3f',         // Texto alinhado ao verde oliva
    textMuted: '#6b6b5c',
  },
  fonts: {
    heading: '"Belinda Avenue", Georgia, serif',
    script: '"Sunshine", cursive',
    body: 'Georgia, "Times New Roman", serif',
  },
  radii: {
    sm: '8px',
    md: '12px',
    lg: '20px',
  },
  shadows: {
    sm: '0 2px 8px rgba(128, 128, 93, 0.12)',
    md: '0 4px 20px rgba(128, 128, 93, 0.18)',
    lg: '0 8px 32px rgba(128, 128, 93, 0.2)',
    soft: '0 2px 24px rgba(237, 215, 213, 0.5)',
  },
}

export type Theme = typeof theme
