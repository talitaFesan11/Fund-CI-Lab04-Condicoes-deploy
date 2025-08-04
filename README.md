# Laboratório 04 - Deploy em servidor local ( substituindo Google Cloud)



# 🚀 Deploy Local com Docker, GitHub Actions e Tailscale

Este projeto utiliza **GitHub Actions** com um **self-hosted runner** para realizar o deploy automático em um servidor local via **Tailscale** e Docker.

---

## ✅ Requisitos

- Servidor Linux (ex: Ubuntu Server) com Docker instalado e configurado
- Conta no GitHub
- Conta no Docker Hub
- Conta no Tailscale (gratuita)
- Acesso SSH ao servidor

---

## 🧱 Estrutura do Deploy

- `Dockerfile` define o app containerizado
- `docker-compose.yml` gerencia o container localmente
- `GitHub Actions` realiza o deploy automático
- `Tailscale` é uma VPN moderna baseada no protocolo WireGuard conecta seu PC e o servidor via rede privada segura https://tailscale.com/
- `Self-hosted Runner` executa os workflows diretamente no servidor

---

## 🛠️ Passo a Passo da Configuração

---

## Usando Tailscale para Acesso Remoto à Aplicação
🔹 O que é o Tailscale?
O Tailscale é uma VPN baseada em WireGuard que:
- ✅ Cria uma rede privada entre seus dispositivos.
- ✅ Não precisa de configuração complexa de firewall/NAT.
- ✅ Usa autenticação via SSO (Google, GitHub, Microsoft, etc.).
- ✅ É gratuita para uso pessoal (até 100 dispositivos).

### 1. 🔐 Instalar Tailscale no servidor

```bash
curl -fsSL https://tailscale.com/install.sh | sh
sudo tailscale up
```

> Faça login com sua conta Tailscale. Isso colocará o servidor na sua *tailnet*.

---

### 2. 🖥️ Instalar Tailscale no cliente (seu PC)

#### Linux/macOS:

```bash
curl -fsSL https://tailscale.com/install.sh | sh
sudo tailscale up
```

#### Windows:

- Baixe de https://tailscale.com/download
- Faça login com a mesma conta Tailscale


### 3. 🤖 Configurar self-hosted GitHub Runner no servidor

No GitHub:

1. Vá até seu repositório → **Settings > Actions > Runners > New self-hosted runner**
2. Selecione Linux x64 e copie os comandos

No servidor:

```bash
mkdir actions-runner && cd actions-runner
curl -o actions-runner.tar.gz -L https://github.com/actions/runner/releases/download/v2.x.x/actions-runner-linux-x64-2.x.x.tar.gz
tar xzf actions-runner.tar.gz
./config.sh --url https://github.com/SEU_USUARIO/SEU_REPOSITORIO --token SEU_TOKEN
./run.sh
```

> Opcional: execute como serviço com `sudo ./svc.sh install && sudo ./svc.sh start`

---

### 6. 🔐 Secrets no GitHub

Vá em: **Settings > Secrets and variables > Actions**

#### ➕ Repository secrets:

| Nome               | Descrição               |
|--------------------|--------------------------|
| `DOCKERHUB_USERNAME` | Seu usuário do Docker Hub |
| `DOCKERHUB_TOKEN`    | Token de acesso (não a senha) |

#### ➕ Environment secrets (ex: `local-deploy`):

| Nome          | Descrição                         |
|---------------|------------------------------------|
| `APP_PORT`    | Porta da aplicação (ex: 8080)      |
| `TS_HOSTNAME` | IP Tailscale do servidor (ex: 100.80.68.5) |


---

## 🌐 Acessar a Aplicação e dar acesso a um cliente

Com o cliente Tailscale instalado e logado, acesse:


### 🔐 Vantagens:

- Conexão **segura e criptografada**
- **Não** é necessário abrir portas no roteador
- Você **controla quem tem acesso** à sua rede

---

### 👣 Passos:

1. **Peça para a pessoa criar uma conta no Tailscale**
   - Acesse: [https://tailscale.com/download](https://tailscale.com/download)
   - Instale no sistema da pessoa (Windows, macOS, Linux ou celular)

2. **Adicione o e-mail dela à sua tailnet**
   - Acesse: [https://tailscale.com/admin/machines](https://tailscale.com/admin/machines)
   - No menu superior, vá em **Settings > Access controls**

3. **Configurações possíveis:**
   - Edite os campos `tagOwners` ou `autoApprovers`
   - Ou ative o **invite-based access** (acesso por convite)
   - Ou ainda: use acesso por domínio base, como `*@gmail.com`, para liberar todos os usuários de um domínio

4. **Peça para ela fazer login no app do Tailscale com o e-mail autorizado**

5. **Após o login, o dispositivo aparecerá na sua rede Tailscale**

6. **Envie o IP Tailscale do seu servidor**
   - Exemplo: `http://100.80.68.7:8080`
   - A pessoa conseguirá acessar o app no navegador via esse IP

> ℹ️ Obs: O dispositivo da pessoa e o servidor devem estar online e conectados à mesma rede Tailscale.
