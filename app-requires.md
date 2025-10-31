
## RF (Requisitos Fucionais) - As funcionalidades da aplicacao - O que sera possivel o ususario fazer na nossa aplicacao.

- [x] Deve ser possivel se cadastrar 
- [x] Deve ser possivel se autenticar
- [x] Deve ser possivel obter os perfil de um usuario logado
- [x] Deve ser possivel obter o numero de check-Ins realizados pelo usuario logado
- [x] Deve ser possivel o usuario obter o seu historico de check-ins
- [x] Deve ser possivel o usuario buscar academias proximas 
- [x] Deve ser possivel o usuario buscar academias pelo nome
- [x] Deve ser possivel o usuario realizar check-in em uma academia
- [x] Deve ser possivel o validar o check-in do usuario
- [x] Deve ser possivel o cadastrar academias



## RNs (Requisitos de Negocio) - Possibilidades que os nossos requisitos funcionais podem tomar - Determinam as condicoes a serem aplicadas a cada requisito funcional (A regra de negocio sempre sera associada a um requisito funcional).

- [x] O usuario nao pode se cadastrar com e-mail duplicado
- [x] O usuario nao fazer 2 check-in 2 vezes no mesmo dia
- [x] O usuario nao fazer check-in se nao estiver menos de 100m da academia
- [x] O Check-in so pode ser validade apos 20 minutos depois de ser criado
- [ ] O Check-in so pode ser validado por administradores
- [ ] Academia so pode ser criada por administradores



## RNFs (Requisitos nao Funcionais) - Requisitos que nao partem do cliente, ou seja o cliente nao tem controle sobre eles - Sao muito mais tecnicos - Ex: Tipo da base de dados a usar, tec de pagnicao, metodo de auth entre outros.
- [x] A senha do usuario tem estar criptografada
- [x] Os dados da aplicacao precisam estar persistidos numa base de dados PostgreSQL
- [x] Todas a listas de dados precisam estar paginadasS com 20 items por paginas
- [ ] O usuario deve ser identificado por JTW (JSON WEB TOKEN )




   