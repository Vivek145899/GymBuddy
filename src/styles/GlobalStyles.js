import { createGlobalStyle } from 'styled-components'

const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  :root {
    --primary: #17a2b8;
    --secondary: #20b2aa;
    --background: #f8f9fa;
    --surface: #ffffff;
    --surface-secondary: #f1f3f4;
    --text: #1a1a1a;
    --text-secondary: #666666;
    --border: #e0e0e0;
    --accent: #17a2b8;
    --success: #00b894;
    --warning: #e17055;
    --error: #d63031;
    --gradient: linear-gradient(135deg, #17a2b8 0%, #20b2aa 100%);
    --gradient-secondary: linear-gradient(135deg, #f8f9fa 0%, #f1f3f4 100%);
    --gradient-accent: linear-gradient(135deg, #17a2b8 0%, #20b2aa 50%, #17a2b8 100%);
  }

  [data-theme="dark"] {
    --primary: #20b2aa;
    --secondary: #00ced1;
    --background: #0a0a0a;
    --surface: #1a1a1a;
    --surface-secondary: #2a2a2a;
    --text: #ffffff;
    --text-secondary: #b0b0b0;
    --border: #333333;
    --accent: #20b2aa;
    --success: #00d4aa;
    --warning: #fdcb6e;
    --error: #ff7675;
    --gradient: linear-gradient(135deg, #20b2aa 0%, #00ced1 100%);
    --gradient-secondary: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%);
    --gradient-accent: linear-gradient(135deg, #20b2aa 0%, #00ced1 50%, #20b2aa 100%);
  }

  body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background: var(--gradient-secondary);
    color: var(--text);
    min-height: 100vh;
    transition: background 0.3s ease, color 0.3s ease;
  }

  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
      monospace;
  }

  button {
    cursor: pointer;
    border: none;
    outline: none;
    font-family: inherit;
  }

  input, textarea, select {
    font-family: inherit;
    outline: none;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
  }

  .btn {
    padding: 12px 24px;
    border-radius: 8px;
    font-weight: 600;
    font-size: 16px;
    transition: all 0.3s ease;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
  }

  .btn-primary {
    background: var(--gradient);
    color: white;
    border: none;
    border-radius: 25px;
    font-weight: 600;
    letter-spacing: 0.5px;
    position: relative;
    overflow: hidden;
  }

  .btn-primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(23, 162, 184, 0.4);
  }

  .btn-primary:active {
    transform: translateY(0);
  }

  .btn-secondary {
    background: transparent;
    color: var(--primary);
    border: 2px solid var(--primary);
  }

  .btn-secondary:hover {
    background: var(--primary);
    color: white;
  }

  .btn-danger {
    background: var(--error);
    color: white;
  }

  .btn-danger:hover {
    background: var(--error);
    opacity: 0.9;
    transform: translateY(-2px);
  }

  .card {
    background: var(--surface);
    border-radius: 16px;
    padding: 24px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    margin-bottom: 20px;
    border: 1px solid var(--border);
    transition: all 0.3s ease;
  }

  .form-group {
    margin-bottom: 20px;
  }

  .form-label {
    display: block;
    margin-bottom: 8px;
    font-weight: 600;
    color: var(--text);
  }

  .form-input {
    width: 100%;
    padding: 12px 16px;
    border: 2px solid var(--border);
    border-radius: 8px;
    font-size: 16px;
    background: var(--surface);
    color: var(--text);
    transition: all 0.3s ease;
  }

  .form-input:focus {
    border-color: var(--primary);
    outline: none;
  }

  .form-textarea {
    resize: vertical;
    min-height: 100px;
    background: var(--surface);
    color: var(--text);
  }

  .form-select {
    width: 100%;
    padding: 12px 16px;
    border: 2px solid var(--border);
    border-radius: 8px;
    font-size: 16px;
    background: var(--surface);
    color: var(--text);
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .form-select:focus {
    border-color: var(--primary);
    outline: none;
  }

  .error {
    color: var(--error);
    font-size: 14px;
    margin-top: 4px;
  }

  .success {
    color: var(--success);
    font-size: 14px;
    margin-top: 4px;
  }

  .text-center {
    text-align: center;
  }

  .text-muted {
    color: #6c757d;
  }

  .mb-1 { margin-bottom: 8px; }
  .mb-2 { margin-bottom: 16px; }
  .mb-3 { margin-bottom: 24px; }
  .mb-4 { margin-bottom: 32px; }

  .mt-1 { margin-top: 8px; }
  .mt-2 { margin-top: 16px; }
  .mt-3 { margin-top: 24px; }
  .mt-4 { margin-top: 32px; }

  .flex {
    display: flex;
  }

  .flex-column {
    flex-direction: column;
  }

  .justify-center {
    justify-content: center;
  }

  .align-center {
    align-items: center;
  }

  .gap-1 { gap: 8px; }
  .gap-2 { gap: 16px; }
  .gap-3 { gap: 24px; }

  .grid {
    display: grid;
  }

  .grid-2 {
    grid-template-columns: repeat(2, 1fr);
  }

  .grid-3 {
    grid-template-columns: repeat(3, 1fr);
  }

  .grid-4 {
    grid-template-columns: repeat(4, 1fr);
  }

  @media (max-width: 768px) {
    .grid-2,
    .grid-3,
    .grid-4 {
      grid-template-columns: 1fr;
    }
    
    .container {
      padding: 0 16px;
    }
  }
`

export default GlobalStyles
