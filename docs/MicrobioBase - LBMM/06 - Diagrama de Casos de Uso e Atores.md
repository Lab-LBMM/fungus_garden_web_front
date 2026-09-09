---
title: 06 - Diagrama de Casos de Uso e Atores
tags:
  - uml
  - casos-de-uso
  - drawio
  - arquitetura
  - personas
date: 2026-09-09
---

# 👥 06 - Diagrama de Casos de Uso e Atores

Nota anterior: [[05 - Guia do Desenvolvedor e Git Workflow]] | Retornar ao índice: [[00 - Visão Geral e Mapa Mental]]

> 🎨 **Arquivo Nativo Draw.io Disponível:**  
> O diagrama abaixo também está modelado e editável no formato nativo do Draw.io:  
> 📁 `Diagrama_Casos_de_Uso.drawio` (compatível com [app.diagrams.net](https://app.diagrams.net/) e extensão Draw.io do VS Code).

---

## 🗺️ Diagrama de Casos de Uso (UML / Mermaid)

```mermaid
flowchart LR
    %% Atores
    Pesquisador["👨‍🔬 Pesquisador / Bioinformata"]
    Estudante["🎓 Estudante / Visitante Geral"]

    subgraph Plataforma [" Plataforma MicrobioBase (LBMM / UNESP) "]
        %% Casos de Uso do Catálogo e Taxonomia
        UC_Buscar(["Buscar e Filtrar Organismos"]):::cat
        UC_FiltroSimbiotico(["Filtrar por Agricultura e Simbiose"]):::cat
        UC_Detalhes(["Consultar Ficha Técnica do Organismo"]):::cat
        UC_PerfilGenomico(["Visualizar Conteúdo GC/AT e Genes"]):::sub
        UC_TaxonomiaNCBI(["Consultar Taxonomia e NCBI GenBank"]):::sub

        %% Casos de Uso de Sequenciamento e Bioinformática
        UC_ListarRuns(["Explorar Corridas de Sequenciamento"]):::bio
        UC_CompararRuns(["Comparar Corridas de Sequenciamento"]):::bio
        UC_Heatmap(["Visualizar Heatmap Matricial de ASVs"]):::sub
        UC_Similaridade(["Calcular Similaridade (Jaccard / Bray-Curtis)"]):::sub
        UC_ModalFasta(["Inspecionar Sequência e Taxonomia da ASV"]):::sub
        UC_Exportar(["Exportar Relatórios (CSV / FASTA)"]):::bio

        %% Casos de Uso Institucionais
        UC_Diretrizes(["Consultar Protocolos de Submissão"]):::inst
        UC_Fontes(["Consultar Fontes de Dados (UniProt, MycoBank, etc.)"]):::inst
        UC_EquipeContato(["Conhecer Equipe do LBMM e Enviar Mensagem"]):::inst
    end

    %% Relacionamentos do Estudante / Visitante Geral
    Estudante --> UC_Buscar
    Estudante --> UC_FiltroSimbiotico
    Estudante --> UC_Detalhes
    Estudante --> UC_Fontes
    Estudante --> UC_EquipeContato

    %% Relacionamentos do Pesquisador / Bioinformata
    Pesquisador --> UC_Buscar
    Pesquisador --> UC_Detalhes
    Pesquisador --> UC_ListarRuns
    Pesquisador --> UC_CompararRuns
    Pesquisador --> UC_Exportar
    Pesquisador --> UC_Diretrizes

    %% Relações de Inclusão e Extensão (Includes / Extends)
    UC_Detalhes -. "«include»" .-> UC_PerfilGenomico
    UC_Detalhes -. "«include»" .-> UC_TaxonomiaNCBI
    UC_CompararRuns -. "«include»" .-> UC_Heatmap
    UC_CompararRuns -. "«extend»" .-> UC_Similaridade
    UC_CompararRuns -. "«extend»" .-> UC_ModalFasta

    %% Estilos visuais
    classDef cat fill:#e8f5ee,stroke:#1a7a4a,stroke-width:1.5px,color:#145e38;
    classDef bio fill:#e0f2fe,stroke:#0284c7,stroke-width:1.5px,color:#0369a1;
    classDef sub fill:#ffffff,stroke:#64748b,stroke-dasharray: 4 4,stroke-width:1px,color:#334155;
    classDef inst fill:#fef3c7,stroke:#d97706,stroke-width:1.5px,color:#92400e;
```

---

## 🎭 Perfil dos Atores

### 1. 🎓 Estudante / Visitante Geral
* **Objetivo:** Conhecer a biodiversidade do jardim de fungo, estudar a simbiose das formigas atíneas e consultar dados taxonômicos e morfológicos.
* **Principais Ações:**
  - Busca textual livre e filtros por tipo biológico (Fungo, Bactéria, Formiga).
  - Filtragem por sistemas agrícolas (Basal, Levedura, Fungos Corais, Cortadeiras).
  - Visualização da ficha técnica com anel interativo de proporção GC/AT.
  - Consulta aos dados institucionais do laboratório (Equipe e Fontes).

### 2. 👨‍🔬 Pesquisador / Bioinformata
* **Objetivo:** Analisar criticamente a estrutura das comunidades microbianas das colônias de formigas, cruzar perfis de amplicons e gerar dados para publicações científicas.
* **Principais Ações:**
  - Inspeção das corridas de sequenciamento NGS (16S rRNA e ITS).
  - Seleção multiamostral para montagem dinâmica de Heatmap de abundância de ASVs.
  - Cálculo de índices ecológicos de diversidade alfa (Shannon, Chao1) e beta (Jaccard e Bray-Curtis).
  - Inspeção de sequências nucleotídicas brutas (FASTA) de variantes raras ou dominantes.
  - Exportação de dados consolidados em formatos tabulares (`.csv`) e multifasta (`.fasta`).

---

## 📋 Mapeamento Funcional por Rota da SPA

| Caso de Uso | Rota Frontend | Componente Responsável |
| :--- | :--- | :--- |
| Busca & Filtros Taxonômicos | `/buscar` | [SearchPage.tsx](file:///C:/Users/k246165/Documents/system/fungus_garden_web_front/src/pages/SearchPage.tsx) + `TaxonomyFilter` |
| Ficha do Organismo & Genômica | `/organismo/:id` | [DetailPage.tsx](file:///C:/Users/k246165/Documents/system/fungus_garden_web_front/src/pages/DetailPage.tsx) |
| Lista de Corridas NGS | `/sequenciamento` | [SequenciamentoPage.tsx](file:///C:/Users/k246165/Documents/system/fungus_garden_web_front/src/pages/SequenciamentoPage.tsx) |
| Comparador Multiamostral & Heatmap | `/comparar-seqruns` | [CompareSeqRunsPage.tsx](file:///C:/Users/k246165/Documents/system/fungus_garden_web_front/src/pages/CompareSeqRunsPage.tsx) |
| Apresentação da Equipe | `/time` | [TeamPage.tsx](file:///C:/Users/k246165/Documents/system/fungus_garden_web_front/src/pages/TeamPage.tsx) |
| Bancos de Dados Parceiros | `/fontes` | [DataSourcesPage.tsx](file:///C:/Users/k246165/Documents/system/fungus_garden_web_front/src/pages/DataSourcesPage.tsx) |
