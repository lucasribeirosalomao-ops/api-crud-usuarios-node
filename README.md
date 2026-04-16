# 🚀 API CRUD de Usuários

API REST desenvolvida com Node.js e Express para gerenciamento de usuários.

---

## 📌 Funcionalidades

- ✅ Listar usuários
- ✅ Criar usuários
- ✅ Atualizar usuários
- ✅ Deletar usuários
- ✅ Validação de dados
- ✅ Verificação de e-mail duplicado

---

## 🛠 Tecnologias

- Node.js
- Express
- CORS

---

## 📡 Endpoints

### 🔹 Listar usuários
GET /usuarios

### 🔹 Criar usuário
POST /usuarios

```json
{
  "nome": "Lucas",
  "email": "lucas@email.com"
}
