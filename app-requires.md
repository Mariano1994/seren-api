
## RF (Requisitos Fucionais) - As funcionalidades da aplicacao - O que sera possivel o ususario fazer na nossa aplicacao.

- [ ] Deve ser possivel se cadastrar 
- [ ] Deve ser possivel se autenticar
- [ ] Deve ser possivel obter os perfil de um usuario logado
- [ ] Deve ser possivel obter o numero de check-Ins realizados pelo usuario logado
- [ ] Deve ser possivel o usuario obter o seu historico de check-ins
- [ ] Deve ser possivel o usuario buscar academias proximas 
- [ ] Deve ser possivel o usuario buscar academias pelo nome
- [ ] Deve ser possivel o usuario realizar check-in em uma academia
- [ ] Deve ser possivel o validar o check-in do usuario
- [ ] Deve ser possivel o cadastrar academias



## RNs (Requisitos de Negocio) - Possibilidades que os nossos requisitos funcionais podem tomar - Determinam as condicoes a serem aplicadas a cada requisito funcional (A regra de negocio sempre sera associada a um requisito funcional).

- [ ] O usuario nao pode se cadastrar com e-mail duplicado
- [ ] O usuario nao fazer 2 check-in 2 vezes no mesmo dia
- [ ] O usuario nao fazer check-in se nao estiver menos de 100m da academia
- [ ] O Check-in so pode ser validade apos 20 minutos depois de ser criado
- [ ] O Check-in so pode ser validado por administradores
- [ ] Academia so pode ser criada por administradores



## RNFs (Requisitos nao Funcionais) - Requisitos que nao partem do cliente, ou seja o cliente nao tem controle sobre eles - Sao muito mais tecnicos - Ex: Tipo da base de dados a usar, tec de pagnicao, metodo de auth entre outros.
- [ ] A senha do usuario tem estar criptografada
- [ ] Os dados da aplicacao precisam estar persistidos numa base de dados PostgreSQL
- [ ] Todas a listas de dados precisam estar paginadasS com 20 items por paginas
- [ ] O usuario deve ser identificado por JTW (JSON WEB TOKEN )
