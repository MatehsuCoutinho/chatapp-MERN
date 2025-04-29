Coisa que fiz em ordem:

-Setup backend(src), setar port etc + Setup DB<br/>
-Importei o necessário (mongoose etc)<br/>
-Defini as rotas: signup, login, logout<br/>
-Fiz o modelo para o USER (user.model.js)<br/>
-Token jwt para os cookies + httpOnly + samesite:'strict'<br/>
-Defini o controller signup + validação + bcrypt da senha<br/>
-Testei signup com o postman<br/>

-controller login - confere se o email já existe (lembrar trycatch)<br/>
-se email nao existe, comparei senhas com bycript.compare, se tá errado = erro<br/>
-se tudo correto - json retornando id,name,email,pfp<br/>
-controller logout - expirar instantaneamente ticket jwt<br/>
-Testei login + logout com postman<br/>
-adicionei rota de update profile<br/>

-adicionei funcao protetiva(middleware) para verificar usuario{<br/>
comparei usando token dos cookies,<br/>
chamei a proxima funcao(nesse caso dar update no profile)
}<br/>
-usei cloudinary para update de profile pic<br/>


-fiz a rota para as mensagens, depois o schema, depois o controller<br/>
-ficou faltando usar socket.io para fazer mensagem em tempo real// vou fazer mais tarde<br/>

-iniciei o front <br/>
-pequenas correcoes + ajustes no back (authcontroller(faltava adicionar um check para ver se tinha autenticacao))<br/>
-comecei as rotas do front(falta mt coisa tem muitos erros estou perdido)<br/>