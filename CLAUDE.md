# O Problema Não É o Seu Funil — Landing Page

## O que é

Landing page educacional/comercial que vende a aula diagnóstica **"O Problema Não É o Seu Funil"** por R$ 47 (ou 11x R$ 5,06). O conceito central: o problema dos empresários não é o funil, é o modelo de negócio que consome mais horas do que eles têm. Inclui aula + Matriz de Horários + diagnóstico IA + agentes IA + tracker diário.

Faz parte do ecossistema Íntegros como produto de entrada (low-ticket).

## Stack

- **Frontend:** HTML + CSS + JS vanilla (100% estático)
- **Integrações client-side:** ConvertKit/Kit (exit-intent popup, captura de email)
- **Analytics:** Vercel Web Analytics
- **Deploy:** VPS DigitalOcean (Nginx, serve estático) / Vercel
- **Domínio:** funil.somosintegros.com.br

## Deploy

### DigitalOcean (produção)

```bash
ssh do
cd /var/www/funil
git pull
# pronto — sem build, sem PM2
```

- **Nginx:** serve arquivos diretamente de `/var/www/funil`
- **Config:** `/etc/nginx/sites-available/funil`
- **IP:** 138.197.123.132

### Ativar SSL

```bash
ssh do
certbot --nginx -d funil.somosintegros.com.br
```

## Comandos

```bash
python3 -m http.server 8000   # servir localmente
```

## Variáveis de Ambiente

Nenhuma. Projeto 100% estático. A chave pública do ConvertKit está no JS (por design da API):
- **CK API Key (pública):** `ACToNRKxQcIk8S6Brww_QA`
- **CK Tag ID:** `15924900` (tag: `lead-funil`)

## Estrutura de Pastas

```
funil/
├── index.html            ← Landing page principal (320 linhas)
├── css/
│   └── styles.css        ← Estilos completos (829 linhas, dark theme + accent red)
├── js/
│   └── main.js           ← Parallax engine + scroll reveal + exit-intent popup
├── img/
│   ├── bg-hero-wide.jpg  ← Background do hero (parallax)
│   ├── image-from-rawpixel-id-*.jpg  ← Backgrounds dos painéis parallax
│   ├── crop-tracker.png  ← Screenshot da plataforma (tracker)
│   ├── crop-ferramentas.png  ← Screenshot (ferramentas)
│   ├── crop-agentes.png  ← Screenshot (agentes IA)
│   ├── logo.png          ← Logo Íntegros (header)
│   ├── assinatura.png    ← Logo Íntegros (footer)
│   └── og-image.jpg      ← Open Graph image
├── favicon.png           ← Favicon PNG
├── favicon.svg           ← Favicon SVG
├── backup/
│   ├── funil-integros.html  ← Versão anterior
│   └── v3.html              ← Versão anterior
├── .claudeignore         ← Ignora arquivos pesados
├── .gitignore            ← node_modules, .env, backup/
├── .github/workflows/
│   └── deploy.yml        ← CI/CD
└── CLAUDE.md             ← Este arquivo
```

## Seções da Landing Page

1. **Hero** — Parallax, título em itálico serif, scroll hint
2. **01 Sintoma** — Frustração do empresário
3. **Parallax Piranesi** — "Algumas pessoas têm um negócio, outras têm um emprego disfarçado de CNPJ"
4. **02 Falso culpado** — Não é culpa do mercado
5. **03 Histórico** — História pessoal do Kevin (burnout aos 24)
6. **Parallax Farmer** — "O problema nunca foi o funil"
7. **04 Causa raiz** — Modelo exigia mais horas que tinha
8. **05 Diagnóstico** — Pergunta-chave: modelo viável com as horas que tem?
9. **06 Conduta** — A aula de 30 minutos
10. **07 O Sistema** — Caixa de Ferramentas da plataforma
11. **Showcase** — 3 screenshots da plataforma (tracker, ferramentas, agentes)
12. **CTA Card** — "Diagnostic Report" estilo médico, R$ 47, link Assiny
13. **P.S.** — Nota final irônica
14. **Exit-intent popup** — Captura de email via ConvertKit

## Funcionalidades JS

- **Parallax engine:** Painéis com background-image que se movem com scroll (data-speed)
- **Scroll reveal:** IntersectionObserver adiciona classe `.visible` nos elementos `.reveal`
- **Exit-intent popup:** Desktop (mouseout topo) + Mobile (visibilitychange). Integra com ConvertKit API (`/v3/tags/{id}/subscribe`). Usa sessionStorage para não repetir.

## Design System

- **Tema:** Dark (`#080807`) + accent vermelho (`#b03a3a`)
- **Fontes:** Playfair Display (títulos serif, bold/italic), Inter (corpo sans)
- **CSS vars:** `--bg`, `--text`, `--text-body`, `--text-muted`, `--accent`, `--serif`, `--sans`
- **Visual:** Estética de "relatório médico/diagnóstico" — section markers numerados, pull-quotes com label, card CTA como "report card"
- **Parallax:** 3 painéis com imagens de fundo (hero, piranesi, farmer), overlays com gradients

## Regras de Desenvolvimento

### Fazer
- Manter estética de diagnóstico médico nos markers e pullquotes
- Preservar efeitos de parallax (3 painéis com data-speed)
- Manter exit-intent popup funcional e integrado com ConvertKit
- Testar OG tags e SEO meta antes de deploy

### Não fazer
- Não adicionar frameworks CSS — projeto é vanilla por design
- Não remover parallax ou simplificar animações sem autorização
- Não alterar o link Assiny de checkout
- Não alterar a chave pública do ConvertKit (é pública por design)
- Não mexer nas imagens de background sem verificar peso/performance

## Contexto de Negócio

É o low-ticket de R$ 47 que funciona como porta de entrada do ecossistema Íntegros. Ao comprar, o lead recebe acesso à Caixa de Ferramentas (plataforma com tracker, Matriz de Horários, diagnóstico IA e agentes). É o primeiro contato do lead com a metodologia, antes de ser convidado para Fundamentos (R$ 3.500) ou Íntegros (R$ 25k+).

## Git

- **Branch de trabalho:** `dev`
- **Branch de produção:** `main`
- **Regra:** NUNCA push direto na main
- **Commits:** conventional commits em inglês
