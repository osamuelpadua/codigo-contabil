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

- **Link do formulário:** está no `href` dos botões com a classe `cta-formulario` no `index.html` (use buscar e substituir). Não remova essa classe: o `main.js` usa ela para repassar os parâmetros do anúncio (`utm_*`, `fbclid`...) ao formulário.
- **Meta Pixel:** instalado no fim do `<head>` do `index.html` (dispara o `PageView`).
- **Cache de CSS/JS:** ao publicar mudanças em `style.css` ou `main.js`, atualize o `?v=` correspondente no `index.html`.
- **Imagens:** ao trocar uma imagem, use um nome de arquivo novo (as imagens são servidas com cache longo). Se trocar as imagens do hero, atualize também os `<link rel="preload">` no `<head>`.
