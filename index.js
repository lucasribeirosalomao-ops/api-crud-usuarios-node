const express = require("express");
const cors = require("cors"); 

const app = express();

app.use(cors());
app.use(express.json());

let usuarios = [
  { id: 1, nome: "Lucas", email: "lucas@email.com" },
  { id: 2, nome: "Maria", email: "maria@email.com" }
];

let proximoId = 3;

app.get("/", (req, res) => {
  res.send("API CRUD de Usuários funcionando!");
});

app.get("/usuarios", (req, res) => {
  res.status(200).json(usuarios);
});

app.post("/usuarios", (req, res) => {
  const { nome, email } = req.body;

  if (!nome || !email) {
    return res.status(400).json({ mensagem: "Nome e e-mail são obrigatórios." });
  }

  const emailExiste = usuarios.find(usuario => usuario.email === email);

  if (emailExiste) {
    return res.status(400).json({ mensagem: "Já existe um usuário com esse e-mail." });
  }

  const novoUsuario = {
    id: proximoId++,
    nome,
    email
  };

  usuarios.push(novoUsuario);

  res.status(201).json({
    mensagem: "Usuário criado com sucesso.",
    usuario: novoUsuario
  });
});

app.put("/usuarios/:id", (req, res) => {
  const id = Number(req.params.id);
  const { nome, email } = req.body;

  const usuario = usuarios.find(usuario => usuario.id === id);

  if (!usuario) {
    return res.status(404).json({ mensagem: "Usuário não encontrado." });
  }

  if (!nome || !email) {
    return res.status(400).json({ mensagem: "Nome e e-mail são obrigatórios." });
  }

  const emailExiste = usuarios.find(
    usuario => usuario.email === email && usuario.id !== id
  );

  if (emailExiste) {
    return res.status(400).json({ mensagem: "Já existe outro usuário com esse e-mail." });
  }

  usuario.nome = nome;
  usuario.email = email;

  res.status(200).json({
    mensagem: "Usuário atualizado com sucesso.",
    usuario
  });
});

app.delete("/usuarios/:id", (req, res) => {
  const id = Number(req.params.id);

  const indice = usuarios.findIndex(usuario => usuario.id === id);

  if (indice === -1) {
    return res.status(404).json({ mensagem: "Usuário não encontrado." });
  }

  const usuarioRemovido = usuarios.splice(indice, 1);

  res.status(200).json({
    mensagem: "Usuário removido com sucesso.",
    usuario: usuarioRemovido[0]
  });
});

app.listen(3000, () => {
  console.log("Servidor rodando em http://localhost:3000");
});