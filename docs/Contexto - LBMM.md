# Contexto - LBMM (MicrobioBase)

---
**Projeto:** MicrobioBase - Fungus Garden Web Front  
**Laboratório:** LBMM / UNESP (Laboratório de Bioquímica e Microbiologia Molecular)  
**Data de Atualização:** 09/09/2026  
**Quadro Trello:** [MicrobioBase - Fungus Garden](https://trello.com/b/A6oQEd7i/microbiobase-fungus-garden)  
**Branch Ativa:** `feature/kaua/pagina_comparacao_seq_runs`  
---

> [!TIP]
> **Base de Conhecimento Completa do Projeto (Obsidian Vault):**
> Documentação técnica aprofundada, diagramas e dados modelados na pasta `MicrobioBase - LBMM/`:
> - 🗺️ [[00 - Visão Geral e Mapa Mental]]
> - 💻 [[01 - Arquitetura Técnica e Frontend]]
> - 🐜 [[02 - Domínio Científico e Biológico]]
> - 🧬 [[03 - Módulo de Sequenciamento e Comparador de Seq Runs]]
> - 📐 [[04 - Modelagem de Dados e Tipos TypeScript]]
> - 🚀 [[05 - Guia do Desenvolvedor e Git Workflow]]
> - 👥 [[06 - Diagrama de Casos de Uso e Atores]] *(Inclui `Diagrama_Casos_de_Uso.drawio`)*
> - 📋 [[Notion_MicrobioBase_LBMM]] *(Estrutura pronta para o Notion)*

---

## 🎯 Visão Geral
Desenvolver e aprimorar a interface web interativa do MicrobioBase (LBMM / UNESP) para consulta, filtragem, análise comparativa e visualização de dados taxonômicos, morfológicos e genômicos de fungos e microrganismos associados ao mutualismo das formigas-cortadeiras.

---

## 📊 Status Atual & Atualização do Trello

### ✅ Finalizado & Resolvido
- **Arquitetura Base:** Setup moderno com React 19, TypeScript (~6.0), Vite 8 e ESLint 10.
- **Roteamento SPA:** 8 rotas estruturadas no React Router DOM v7 ([App.tsx](file:///C:/Users/k246165/Documents/system/fungus_garden_web_front/src/App.tsx)).
- **Páginas Institucionais:** Home, Detalhes do Organismo, Fontes de Dados, Equipe e Contato.
- **Taxonomia e Simbiose:** Filtros relacionais para bactérias/fungos e taxonomia simplificada de formigas atíneas.
- **Módulo de Sequenciamento Base:** [SequenciamentoPage.tsx](file:///C:/Users/k246165/Documents/system/fungus_garden_web_front/src/pages/SequenciamentoPage.tsx).
- **Padronização do Git (Card Trello Resolvido):** Identidade configurada oficialmente como `Kauã Henrique <kauaestudosprog@gmail.com>`. Card movido para **Concluído**.
- **Modelagem de Casos de Uso:** Criação do diagrama UML em formato nativo **Draw.io (`.drawio`)** e Mermaid.
- **Documentação de Engenharia:** Sincronização da documentação técnica no GitHub (`docs/`) e modelo pronto para o Notion.

### 🚀 Em Andamento
- **Comparação Multiamostral de Seq Runs:** Implementação da [CompareSeqRunsPage.tsx](file:///C:/Users/k246165/Documents/system/fungus_garden_web_front/src/pages/CompareSeqRunsPage.tsx) na branch `feature/kaua/pagina_comparacao_seq_runs`, contendo heatmap matricial, matriz de similaridade ecológica (Jaccard e Bray-Curtis) e exportação em CSV/FASTA.
- **Refinamento de UX de Busca:** Filtros dinâmicos em [SearchPage.tsx](file:///C:/Users/k246165/Documents/system/fungus_garden_web_front/src/pages/SearchPage.tsx).

---

## ⚠️ Gargalos e Desafios Mapeados no Trello

1. **🔴 [URGÊNCIA ALTA] Arquivo Espúrio `12.0.2` na Raiz:**
   - O arquivo `12.0.2` (gerado acidentalmente por erro de comando npm) está commitado na raiz desde o commit `0dd6ed5`. Necessita de `git rm 12.0.2`.
2. **🔴 [URGÊNCIA ALTA] Risco de Colisão de Estilos (CSS Monolítico):**
   - Arquivos CSS como [CompareSeqRunsPage.css](file:///C:/Users/k246165/Documents/system/fungus_garden_web_front/src/pages/CompareSeqRunsPage.css) com mais de 1.200 linhas possuem seletores que demandam prefixação estrita para não vazar estilos.
3. **🟡 [URGÊNCIA MÉDIA] Sobrecarga de Dados Mockados:**
   - Mais de 1.100 linhas estáticas em [seqRuns.ts](file:///C:/Users/k246165/Documents/system/fungus_garden_web_front/src/data/seqRuns.ts) e [organisms.ts](file:///C:/Users/k246165/Documents/system/fungus_garden_web_front/src/data/organisms.ts) no bundle inicial do cliente.
4. **🟡 [URGÊNCIA MÉDIA] Ausência de Testes Automatizados:**
   - Fórmulas de Jaccard e Bray-Curtis sem cobertura de testes unitários (Vitest).

---

## 📋 Próximos Passos (Top 3 Prioridades Imediatas)

- [ ] **1. Remover o arquivo `12.0.2`:** Executar `git rm 12.0.2`, commitar e subir na branch ativa.
- [ ] **2. Concluir a Página de Comparação de Seq Runs:** Finalizar interações visuais de `CompareSeqRunsPage.tsx` e validar com a branch `main_dev`.
- [ ] **3. Iniciar Camada de Serviço para a API Backend:** Estruturar `src/services/api.ts` para conectar o frontend aos endpoints REST reais do LBMM.
