Coisa que fiz em ordem:

-Setup backend(src), setar port etc + Setup DB
-Importei o necessário (mongoose etc)
-Defini as rotas: signup, login, logout
-Fiz o modelo para o USER (user.model.js)
-Token jwt para os cookies + httpOnly + samesite:'strict'
-Defini o controller signup + validação + bcrypt da senha
-Testei signup com o postman

-controller login - confere se o email já existe (lembrar trycatch)
-se email nao existe, comparei senhas com bycript.compare, se tá errado = erro
-se tudo correto - json retornando id,name,email,pfp
-controller logout - expirar instantaneamente ticket jwt
-Testei login + logout com postman
-adicionei rota de update profile

-adicionei funcao protetiva(middleware) para verificar usuario{
comparei usando token dos cookies,
chamei a proxima funcao(nesse caso dar update no profile)
}
-usei cloudinary para update de profile pic


-fiz a rota para as mensagens, depois o schema, depois o controller
-ficou faltando usar socket.io para fazer mensagem em tempo real// vou fazer mais tarde

-iniciei o front 
-pequenas correcoes + ajustes no back (authcontroller(faltava adicionar um check para ver se tinha autenticacao))
-comecei as rotas do front(falta mt coisa tem muitos erros estou perdido)