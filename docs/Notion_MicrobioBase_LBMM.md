# 🌿 MicrobioBase — Central de Engenharia & Documentação LBMM

> 💡 **Informações da Página**
> - **Projeto:** MicrobioBase (Fungus Garden Web Front)
> - **Laboratório:** LBMM / UNESP (Laboratório de Bioquímica e Microbiologia Molecular)
> - **Desenvolvedor Responsável:** Kauã Henrique
> - **Repositório GitHub:** `Lab-LBMM/fungus_garden_web_front`
> - **Branch Ativa:** `feature/kaua/pagina_comparacao_seq_runs`
> - **Quadro no Trello:** [MicrobioBase - Fungus Garden](https://trello.com/b/A6oQEd7i/microbiobase-fungus-garden)
> - **Última Atualização:** 09/09/2026

---

## 📌 1. Visão Geral & Contexto Científico

### O que é o MicrobioBase?
O **MicrobioBase** é uma Single Page Application (SPA) científica interativa construída para catalogar, pesquisar, filtrar e analisar visualmente espécimes de fungos, bactérias e formigas atíneas, além de processar dados genômicos e corridas de sequenciamento de amplicons (**16S rRNA** e **ITS**).

> 🔬 **O Sistema Simbiótico Estudado (Mutualismo Multipartido)**
> 1. **🐜 Formigas Atíneas (*Atta sexdens*):** Formigas-cortadeiras que coletam biomassa vegetal não para digestão própria, mas para nutrir seu ninho.
> 2. **🍄 Jardim de Fungo (*Leucoagaricus gongylophorus*):** Fungo basidiomiceto mutualista cultivado pelas formigas, responsável por quebrar celulose e produzir *gongilídios* nutritivos para alimentar as larvas e a rainha.
> 3. **☣️ Patógeno Especialista (*Escovopsis spp.*):** Microfungo parasita que ataca agressivamente as colônias fúngicas do jardim.
> 4. **🧬 Bactérias Mutualistas (*Pseudonocardia* / *Streptomyces*):** Actinomicetos que habitam as criptas cuticulares das operárias e produzem metabólitos secundários e antifúngicos (ex: *dentamicina*) para combater o *Escovopsis*.

---

## 💻 2. Arquitetura Técnica do Frontend

### Stack Tecnológica
- **Linguagem & Framework:** React 19.2 + TypeScript ~6.0 (Strict Mode)
- **Build Tooling:** Vite 8.0 com Hot Module Replacement (HMR)
- **Roteamento:** React Router DOM v7 (modo declarativo em `App.tsx`)
- **Estilização:** CSS Vanilla modular com variáveis de design centralizadas em `src/styles/global.css`
- **Ícones:** Lucide React
- **Linter:** ESLint 10 com regras para TypeScript e React Hooks

### Estrutura de Rotas da Aplicação
| Rota | Componente | Descrição Funcional |
| :--- | :--- | :--- |
| `/` | `HomePage` | Hero com busca rápida, barra de estatísticas (`StatsBar`), seletor morfológico de agricultura de formigas e espécimes em destaque |
| `/buscar` | `SearchPage` | Motor de busca avançada com filtro taxonômico hierárquico em 8 níveis biológicos e seletor customizado |
| `/organismo/:id` | `DetailPage` | Ficha técnica completa do organismo, anel SVG interativo de GC/AT, contagem de genes e links NCBI GenBank |
| `/sequenciamento` | `SequenciamentoPage` | Dashboard com lista de corridas metagenômicas, tabela comparativa de plataformas e diretrizes do laboratório |
| `/comparar-seqruns` | `CompareSeqRunsPage` | Módulo bioinformático multiamostral com matriz heatmap de ASVs, cálculo ecológico de similaridade e exportação |
| `/time` | `TeamPage` | Apresentação do corpo de pesquisadores do LBMM (Dr. André Rodrigues, Dra. Maria Fernanda, pós-docs e devs) |
| `/fontes` | `DataSourcesPage` | Lista de repositórios integrados (NCBI GenBank, RefSeq, UniProt, MycoBank, AntWeb, SILVA) |
| `/contato` | `ContactPage` | Formulário e dados de contato para colaboração científica |

---

## 🧬 3. Módulo Bioinformático de Sequenciamento (Destaque da Sprint)

> 🚀 **Em Desenvolvimento Ativo na branch:** `feature/kaua/pagina_comparacao_seq_runs`

### Capacidades do Comparador de Corridas (`CompareSeqRunsPage`):
1. **Heatmap Matricial Dinâmico:**
   - Eixo Y: ASVs (Amplicon Sequence Variants) únicas consolidadas.
   - Eixo X: Corridas de sequenciamento selecionadas pelo usuário.
   - Métricas selecionáveis: **Abundância Relativa (%)**, **Contagens Brutas (Raw Reads)** e **Escala Logarítmica ($\log_{10}$)**.
   - Paletas de cor configuráveis: *Verde-Amarelo-Vermelho*, *Verde-Vermelho*, *Vermelho-Amarelo-Verde*.
2. **Matriz de Similaridade Ecológica:**
   - **Índice de Jaccard:** Mede presença/ausência de táxons compartilhados:
     $$J(A, B) = \frac{|A \cap B|}{|A \cup B|}$$
   - **Dissimilaridade de Bray-Curtis:** Quantifica a diferença de estrutura e abundância entre comunidades microbianas:
     $$BC_{ij} = 1 - \frac{2 \sum \min(c_{ik}, c_{jk})}{\sum c_{ik} + \sum c_{jk}}$$
3. **Modal de Detalhes da ASV:**
   - Exibição da sequência de nucleotídeos em formato FASTA com botão de cópia rápida.
   - Descrição ecológica da linhagem no mutualismo do LBMM.
4. **Ferramentas de Exportação:**
   - Download de planilha `.csv` com cruzamento de dados.
   - Exportação multisequência em formato `.fasta`.

---

## ⚠️ 4. Auditoria do Repositório, Gargalos e Riscos

> 🛑 **Problemas Críticos e Ações Imediatas:**

1. **🔴 [URGÊNCIA ALTA] Arquivo Espúrio `12.0.2` na Raiz:**
   - **Causa:** No commit `0dd6ed5`, um erro de comando do npm foi redirecionado para um arquivo de texto e comitado por engano.
   - **Ação:** Executar `git rm 12.0.2 && git commit -m "chore: remove 12.0.2"`.

2. **🔴 [URGÊNCIA ALTA] Risco de Colisão de Estilos (CSS Monolítico):**
   - **Causa:** O arquivo `CompareSeqRunsPage.css` possui mais de 1.200 linhas de CSS puro. Alguns seletores genéricos de tabela podem vazar e desconfigurar o Header ou modais.
   - **Ação:** Garantir escopo BEM rigoroso (`.compare-seqruns__*`).

3. **🟡 [URGÊNCIA MÉDIA] Sobrecarga de Dados Mockados:**
   - **Causa:** `seqRuns.ts` e `organisms.ts` contêm mais de 1.100 linhas estáticas no bundle JS inicial do cliente.
   - **Ação:** Construir a camada de serviço `src/services/api.ts` com paginação e consumo assíncrono da futura API REST do LBMM.

4. **🟡 [URGÊNCIA MÉDIA] Ausência de Testes Automatizados:**
   - **Causa:** Cálculos matemáticos de Jaccard e Bray-Curtis não possuem suíte de testes.
   - **Ação:** Configurar Vitest e criar testes unitários para validar fórmulas matemáticas com matrizes de referência.

---

## 📊 5. Quadro de Tarefas & Status no Trello

Espelho do quadro [MicrobioBase - Fungus Garden](https://trello.com/b/A6oQEd7i/microbiobase-fungus-garden):

### 📝 A Fazer
- [ ] `[BUG / ALTA]` Remover arquivo espúrio `12.0.2` da raiz do repositório.
- [ ] `[REFATORAÇÃO / ALTA]` Revisar isolamento e escopo de classes em `CompareSeqRunsPage.css`.
- [ ] `[INTEGRAÇÃO / MÉDIA]` Integração com a API Backend do LBMM (substituir mocks de `src/data/`).
- [ ] `[MOBILE / MÉDIA]` Testes de Responsividade Mobile em telas de celulares.

### 🚀 Em Andamento
- [x] Criação da Página de Comparação de Seq Runs (`feature/kaua/pagina_comparacao_seq_runs`).
- [x] Componentes de Filtros e Busca de Microrganismos (`SearchPage.tsx`).
- [x] Implementação da Página de Sequenciamento (`SequenciamentoPage.tsx`).

### 📌 Backlog
- [ ] `[ARQUITETURA / MÉDIA]` Desacoplar dados mockados e criar camada de serviço API.
- [ ] `[TESTES / MÉDIA]` Implementar testes unitários para cálculos de Jaccard e Bray-Curtis.
- [ ] `[UX / MOBILE / BAIXA]` Aprimorar rolagem e tooltips do Heatmap em telas menores.
- [ ] `[FUNCIONALIDADE / BAIXA]` Exportação de Dados Taxonômicos em CSV/Excel.
- [ ] `[FUNCIONALIDADE / BAIXA]` Visualizador de Imagens Microscópicas com Zoom.

### ✅ Concluído
- [x] Setup do Projeto (React 19 + Vite + TypeScript).
- [x] Roteamento SPA com React Router DOM v7.
- [x] Padronizar autoria e assinatura nos commits locais (`Kauã Henrique`).
- [x] Documentação técnica completa sincronizada no Obsidian e commitada no GitHub (`docs/`).

---

## 🛠️ 6. Guia Rápido de Comandos

```bash
# Instalar dependências
npm install

# Iniciar servidor local de desenvolvimento
npm run dev

# Compilar e validar tipos TypeScript
npm run build

# Executar linter estático
npm run lint

# Testar o bundle final de produção localmente
npm run preview
```
