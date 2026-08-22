# 🌐 Pulse HRMS — Public Production Deployment Guide

This guide details step-by-step instructions for deploying Pulse HRMS to a public domain behind an NGINX reverse proxy with automated SSL (HTTPS) via Let's Encrypt Certbot.

---

## 🏗️ Production Architecture

```text
INTERNET
   │  (HTTPS / Port 443)
   ▼
NGINX REVERSE PROXY  ──► SSL Termination, Security Headers, Gzip
   │  (HTTP / Port 8069 - Internal localhost)
   ▼
ODOO 17 CONTAINER    ──► Application Logic, Custom Controllers, REST APIs
   │  (PostgreSQL Connection - Docker Internal Network Only)
   ▼
POSTGRESQL 15 DB     ──► Private Storage (No Exposed External Ports)
```

---

## 🔒 Security Requirements Checklist

- [x] **PostgreSQL Isolated**: Port `5432` is NOT exposed publicly (`ports:` omitted in `docker-compose.yml`).
- [x] **Database Passwords**: Stored safely in server environment files (`.env` listed in `.gitignore`).
- [x] **Relative API URLs**: All frontend `fetch()` requests use relative URLs (`/web/dataset/call_kw`, `/api/...`), making the app 100% domain-agnostic.
- [x] **Persistent Volumes**: PostgreSQL data is saved to the `pulse-db-data` Docker volume.

---

## 🚀 Step-by-Step Public Deployment Instructions

### 1. Server Setup & Docker Installation
On your Linux server (Ubuntu 22.04 LTS / Debian 12):
```bash
sudo apt update && sudo apt upgrade -y
sudo apt install -y docker.io docker-compose nginx certbot python3-certbot-nginx
```

### 2. Clone Repository & Environment Setup
```bash
git clone https://github.com/sheshagiri7/pulse-hr.git /opt/pulse-hr
cd /opt/pulse-hr
```

### 3. Launch Docker Containers
```bash
docker-compose up -d
```
Verify containers are running and healthy:
```bash
docker ps
```

### 4. Configure Odoo Reverse Proxy Mode
Update Odoo System Parameters to enable proxy mode and configure your public domain:
```bash
docker exec pulse-odoo odoo --db_host=db --db_user=odoo --db_password=odoo -d pulse --stop-after-init --proxy-mode
```

To set the base URL dynamically in Odoo database:
```sql
docker exec -it pulse-db psql -U odoo -d pulse -c "INSERT INTO ir_config_parameter (key, value) VALUES ('web.base.url', 'https://pulse.yourdomain.com') ON CONFLICT (key) DO UPDATE SET value = 'https://pulse.yourdomain.com';"
```

### 5. NGINX Reverse Proxy & SSL Setup
Copy NGINX template and edit your domain:
```bash
sudo cp deployment/nginx.conf.template /etc/nginx/sites-available/pulse.conf
sudo sed -i 's/pulse.yourdomain.com/YOUR_DOMAIN.com/g' /etc/nginx/sites-available/pulse.conf
sudo ln -s /etc/nginx/sites-available/pulse.conf /etc/nginx/sites-enabled/
```

Generate SSL Certificates using Certbot:
```bash
sudo certbot --nginx -d YOUR_DOMAIN.com
sudo systemctl reload nginx
```

---

## 🔍 Verification & Maintenance

1. **Verify HTTPS Access**: Navigate to `https://YOUR_DOMAIN.com/` in your browser.
2. **Verify Security**: Confirm SSL padlock and check header security via `curl -I https://YOUR_DOMAIN.com`.
3. **Backup Data**:
   ```bash
   docker exec pulse-db pg_dump -U odoo -d pulse > pulse_backup_$(date +%F).sql
   ```
