# Contexto - LBMM (MicrobioBase)

---
**Projeto:** MicrobioBase - Fungus Garden Web Front  
**Laboratório:** LBMM / UNESP (Laboratório de Bioquímica e Microbiologia Molecular)  
**Data de Atualização:** 09/09/2026  
**Quadro Trello:** [MicrobioBase - Fungus Garden](https://trello.com/b/A6oQEd7i/microbiobase-fungus-garden)  
**Branch Ativa:** `feature/kaua/pagina_comparacao_seq_runs`  
---

> [!TIP]
> **Base de Conhecimento Completa do Projeto:**
> Foram criadas notas aprofundadas com diagramas e documentação técnica completa na pasta `MicrobioBase - LBMM/`:
> - 🗺️ [[00 - Visão Geral e Mapa Mental]]
> - 💻 [[01 - Arquitetura Técnica e Frontend]]
> - 🐜 [[02 - Domínio Científico e Biológico]]
> - 🧬 [[03 - Módulo de Sequenciamento e Comparador de Seq Runs]]
> - 📐 [[04 - Modelagem de Dados e Tipos TypeScript]]
> - 🚀 [[05 - Guia do Desenvolvedor e Git Workflow]]

---

## 🎯 Visão Geral
Desenvolver e aprimorar a interface web interativa do MicrobioBase (LBMM / UNESP) para consulta, filtragem, análise comparativa e visualização de dados taxonômicos, morfológicos e genômicos de fungos e microrganismos associados ao mutualismo das formigas-cortadeiras.

---

## 📊 Status Atual

### ✅ Finalizado
- **Arquitetura Base:** Setup moderno e robusto com React 19, TypeScript (~6.0), Vite 8 e ESLint 10.
- **Roteamento SPA:** 8 rotas estruturadas no React Router DOM v7 ([App.tsx](file:///C:/Users/k246165/Documents/system/fungus_garden_web_front/src/App.tsx)).
- **Páginas Institucionais:** Home, Detalhes do Organismo, Fontes de Dados, Equipe e Contato.
- **Taxonomia e Simbiose:** Filtros relacionais para bactérias/fungos e taxonomia simplificada de formigas atíneas.
- **Módulo de Sequenciamento Base:** [SequenciamentoPage.tsx](file:///C:/Users/k246165/Documents/system/fungus_garden_web_front/src/pages/SequenciamentoPage.tsx) com abas de corridas, tabela genômica e diretrizes.

### 🚀 Em Andamento
- **Comparação Multiamostral de Seq Runs:** Implementação da [CompareSeqRunsPage.tsx](file:///C:/Users/k246165/Documents/system/fungus_garden_web_front/src/pages/CompareSeqRunsPage.tsx) na branch `feature/kaua/pagina_comparacao_seq_runs`, contendo heatmap matricial, matriz de similaridade ecológica (Jaccard e Bray-Curtis) e exportação em CSV/FASTA.
- **Refinamento de UX de Busca:** Filtros dinâmicos em [SearchPage.tsx](file:///C:/Users/k246165/Documents/system/fungus_garden_web_front/src/pages/SearchPage.tsx).

---

## ⚠️ Gargalos e Desafios

1. **Higiene e Configuração do Git:**
   - **Arquivo indesejado commitado:** O arquivo `12.0.2` (gerado acidentalmente por erro de comando npm) foi commitado na raiz do repositório no commit `0dd6ed5`. Deve ser removido com `git rm 12.0.2`.
   - **Variação de Autoria:** Commits alternando entre `kauahsa` e `KauaAndrade-Unicamp`.
   - **Sincronização de Branches:** Alinhamento com a branch base `origin/main_dev` e coordenação com a branch paralela da colaboradora Isabelly (`feature/isabelly/mapa-calor-seq-run`).

2. **Dependência de Dados Mockados:**
   - Mais de 1.100 linhas de dados estáticos embutidos no código-fonte ([seqRuns.ts](file:///C:/Users/k246165/Documents/system/fungus_garden_web_front/src/data/seqRuns.ts) e [organisms.ts](file:///C:/Users/k246165/Documents/system/fungus_garden_web_front/src/data/organisms.ts)), sobrecarregando o bundle inicial da SPA.

3. **Arquitetura de CSS Monolítico:**
   - Páginas com arquivos CSS superiores a 1.200 linhas de CSS puro (ex: [CompareSeqRunsPage.css](file:///C:/Users/k246165/Documents/system/fungus_garden_web_front/src/pages/CompareSeqRunsPage.css)), demandando atenção para que estilos não colidam globalmente.

---

## 📋 Próximos Passos (Top 3 Prioridades)

- [ ] **1. Limpar e padronizar o Git:** Executar `git rm 12.0.2`, commitar e definir o autor unificado via `git config`.
- [ ] **2. Concluir a Página de Comparação de Seq Runs:** Finalizar as interações visuais de `CompareSeqRunsPage.tsx` e validar compatibilidade com a branch `main_dev`.
- [ ] **3. Planejar a Camada de Serviço para a API Backend:** Estruturar `src/services/api.ts` para conectar o frontend aos endpoints REST reais do laboratório LBMM.
