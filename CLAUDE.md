# Funil - O Problema Não É o Seu Funil

## O que é
Landing page estática sobre a metodologia de estruturação de funis de negócios. Oferece educação sobre como não é o funil que é o problema, mas sim a estrutura por trás dele.

## Stack
- **Frontend:** HTML / CSS / JavaScript (estático)
- **Deploy:** VPS DigitalOcean (138.197.123.132) via Nginx (serve estático)
- **Domínio:** funil.somosintegros.com.br (pendente DNS)

## Estrutura
- `/index.html` — Landing page principal
- `/css/` — Estilos
- `/js/` — Scripts
- `/img/` — Imagens e assets
- `/favicon.svg` / `/favicon.png` — Favicon

## Deploy (VPS DigitalOcean)

- IP: 138.197.123.132
- Nginx serve os arquivos diretamente de `/var/www/funil`
- Sem PM2 — site 100% estático
- Config Nginx: `/etc/nginx/sites-available/funil` (ativo)

### Atualizar em produção

```bash
ssh do
cd /var/www/funil
git pull
# pronto — sem build
```

### Ativar SSL (quando DNS estiver apontado)

```bash
ssh do
certbot --nginx -d funil.somosintegros.com.br
```

## Comandos locais
```bash
python3 -m http.server 8000  # servir localmente
```

## Git Workflow
- Branch `dev` para desenvolvimento
- Branch `main` para produção
- NUNCA push direto na main

## Variáveis de Ambiente
Nenhuma — projeto puramente estático.
