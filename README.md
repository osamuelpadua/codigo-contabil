# Código Contábil 3.0 — Página de vendas

Landing page estática (HTML + CSS + JS, sem build) do diagnóstico gratuito do Código Contábil.

## Estrutura

```
index.html              marcação da página
assets/
  css/style.css         estilos (tokens, componentes por seção, utilitários)
  js/main.js            CTAs, animações, header/dock, linha do tempo e lightbox
  img/                  imagens em WebP + favicon
server.js               servidor estático (usado no deploy)
```

## Rodar localmente

```bash
npm install
npm start          # http://localhost:3000
```

A porta pode ser trocada pela variável `PORT`.

## Manutenção

- **Link do formulário:** altere `APPLY_URL` no topo de `assets/js/main.js`. Todos os botões com a classe `.cta-link` passam a apontar para ele.
- **Cache de CSS/JS:** ao publicar mudanças em `style.css` ou `main.js`, atualize o `?v=` correspondente no `index.html`.
- **Imagens:** ao trocar uma imagem, use um nome de arquivo novo (as imagens são servidas com cache longo). Se trocar as imagens do hero, atualize também os `<link rel="preload">` no `<head>`.
