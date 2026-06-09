# fungus_garden_web_front

# Documentação do Repositório - Frontend (React)

## Stack Tecnológica Utilizada

* **Biblioteca Principal:** React
* **Ferramenta de Build e Servidor Local:** Vite
* **Linguagem de Programação:** TypeScript
* **Cliente HTTP:** Axios

---

## Justificativa de Arquitetura e Vantagens Técnicas

A seleção das tecnologias que compõem a interface fundamentou-se nos critérios de desempenho de execução, segurança em tempo de desenvolvimento (type-safety) e eficiência na manutenção do código.

### Critérios de Escolha e Benefícios

* **Otimização do Ambiente com Vite:** Em substituição a ferramentas tradicionais de empacotamento, o Vite foi implementado para garantir tempos reduzidos de inicialização do servidor local e atualizações em tempo real (Hot Module Replacement) altamente eficientes, baseadas em ES Modules nativos.
* **Prevenção de Falhas com TypeScript:** A adição de tipagem estática ao ecossistema React introduz uma camada rigorosa de validação de dados em tempo de compilação. Erros de sintaxe, ausência de propriedades em componentes ou incongruências nos tipos de dados recebidos são identificados diretamente na IDE, reduzindo drasticamente a incidência de falhas em ambiente de produção.
* **Modularidade e Reutilização do React:** A arquitetura baseada em componentes do React favorece a manutenibilidade do código. A separação em componentes isolados e especializados assegura que a interface gráfica possa escalar de forma organizada e previsível.
* **Gerenciamento de Requisições com Axios:** O Axios estende as capacidades do mecanismo fetch nativo do navegador. Sua implementação justifica-se pelo suporte robusto a Interceptors (configurados para a injeção automatizada de tokens de autenticação nos cabeçalhos de requisições autenticadas) e por um sistema padronizado de tratamento de exceções HTTP.

---

## Integração e Contratos de Dados

A consistência na comunicação com serviços externos é assegurada por meio de interfaces declaradas em TypeScript. Essas interfaces funcionam como um contrato rígido de integração: qualquer alteração na estrutura esperada dos dados (JSON) pelo provedor de serviços reflete-se imediatamente como uma inconsistência no código de frontend durante o desenvolvimento. Essa abordagem permite a detecção precoce de incompatibilidades antes que o código seja submetido ao processo de deploy.