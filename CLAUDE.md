# Funil - O Problema Não É o Seu Funil

## O que é
Landing page estática sobre a metodologia de estruturação de funis de negócios. Oferece educação sobre como não é o funil que é o problema, mas sim a estrutura por trás dele.

## Stack
- **Frontend:** HTML / CSS / JavaScript (estático)
- **Deploy:** Vercel
- **Domínio:** funil.somosintegros.com.br

## Estrutura
- `/index.html` — Landing page principal
- `/css/` — Estilos
- `/js/` — Scripts
- `/img/` — Imagens e assets
- `/favicon.svg` / `/favicon.png` — Favicon

## Comandos
```bash
# Apenas arquivo estático, não há build necessário
# Servir localmente (opcional)
python3 -m http.server 8000
```

## Git Workflow
- Branch `dev` para desenvolvimento
- Branch `main` para produção
- NUNCA push direto na main (Vercel)

## Variáveis de Ambiente
Projeto estático — não há .env.
