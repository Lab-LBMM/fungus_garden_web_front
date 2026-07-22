import React, { useState, useMemo } from 'react';
import {
  ChevronRight,
  ChevronDown,
  RotateCcw,
  Layers,
  GitFork,
  X,
  Filter,
  Search,
  Globe,
  Dna,
  Microscope,
  List,
  Shield,
  Users,
  Folder,
  Bug,
  Database,
} from 'lucide-react';
import type { Organism } from '../types';
import './TaxonomyFilter.css';

export interface RankConfig {
  key: string;
  label: string;
  singular: string;
}

export const MICROBE_RANKS: RankConfig[] = [
  { key: 'reino', label: 'Reinos', singular: 'Reino' },
  { key: 'filo', label: 'Filos', singular: 'Filo' },
  { key: 'classe', label: 'Classes', singular: 'Classe' },
  { key: 'ordem', label: 'Ordens', singular: 'Ordem' },
  { key: 'familia', label: 'Famílias', singular: 'Família' },
  { key: 'genero', label: 'Gêneros', singular: 'Gênero' },
  { key: 'especie', label: 'Espécies', singular: 'Espécie' },
  { key: 'acessoGenbank', label: 'Acessos GenBank', singular: 'Acesso GenBank' },
];

export const ANT_RANKS: RankConfig[] = [
  { key: 'reino', label: 'Reinos', singular: 'Reino' },
  { key: 'filo', label: 'Filos', singular: 'Filo' },
  { key: 'classe', label: 'Classes', singular: 'Classe' },
  { key: 'ordem', label: 'Ordens', singular: 'Ordem' },
  { key: 'superfamilia', label: 'Superfamílias', singular: 'Superfamília' },
  { key: 'familia', label: 'Famílias', singular: 'Família' },
  { key: 'subfamilia', label: 'Subfamílias', singular: 'Subfamília' },
  { key: 'especie', label: 'Espécies', singular: 'Espécie' },
  { key: 'acessoGenbank', label: 'Acessos GenBank', singular: 'Acesso GenBank' },
];

export const getRankIcon = (key: string): React.ReactElement => {
  switch (key) {
    case 'reino':
      return <Globe size={14} />;
    case 'filo':
      return <Dna size={14} />;
    case 'classe':
      return <Microscope size={14} />;
    case 'ordem':
      return <List size={14} />;
    case 'superfamilia':
      return <Shield size={14} />;
    case 'familia':
      return <Users size={14} />;
    case 'subfamilia':
      return <Folder size={14} />;
    case 'genero':
      return <Search size={14} />;
    case 'especie':
      return <Bug size={14} />;
    case 'acessoGenbank':
      return <Database size={14} />;
    default:
      return <Filter size={14} />;
  }
};

export const getInitialSelection = (ranks: RankConfig[]): Record<string, string[]> => {
  const sel: Record<string, string[]> = {};
  ranks.forEach((r) => {
    sel[r.key] = [];
  });
  return sel;
};

interface Props {
  title: string;
  ranks: RankConfig[];
  organisms: Organism[];
  selection: Record<string, string[]>;
  onChange: (newSelection: Record<string, string[]>) => void;
}

interface TreeNode {
  id: string;
  name: string;
  rankKey: string;
  count: number;
  children: TreeNode[];
}

const TaxonomyFilter: React.FC<Props> = ({
  title,
  ranks,
  organisms,
  selection,
  onChange,
}) => {
  const [viewMode, setViewMode] = useState<'ranks' | 'tree'>('tree');
  const [activeRankKey, setActiveRankKey] = useState<string>(ranks[0]?.key || 'filo');
  const [expandedNodes, setExpandedNodes] = useState<Record<string, boolean>>({});
  const [rankSearch, setRankSearch] = useState<Record<string, string>>({});

  const rankMap = useMemo(() => {
    const map: Record<string, RankConfig> = {};
    ranks.forEach((r) => {
      map[r.key] = r;
    });
    return map;
  }, [ranks]);

  const totalActiveFilters = useMemo(() => {
    return Object.values(selection).reduce((acc, list) => acc + (list ? list.length : 0), 0);
  }, [selection]);

  // Extract available options per rank with parent constraints (Hierarchical)
  const availableOptionsByRank = useMemo(() => {
    const result: Record<string, { name: string; count: number; parentInfo?: string }[]> = {};
    const rankKeys = ranks.map((r) => r.key);

    rankKeys.forEach((rankKey, rankIdx) => {
      // Filter organisms matching active parent selections
      const filteredOrgs = organisms.filter((org) => {
        const tax = org.detail?.taxonomyInfo as Record<string, string> | undefined;
        if (!tax) return false;

        for (let i = 0; i < rankIdx; i++) {
          const parentKey = rankKeys[i];
          const selectedParents = selection[parentKey] || [];
          if (
            selectedParents.length > 0 &&
            (!tax[parentKey] || !selectedParents.includes(tax[parentKey]))
          ) {
            return false;
          }
        }
        return true;
      });

      const counts: Record<string, { count: number; parents: Set<string> }> = {};

      filteredOrgs.forEach((org) => {
        const tax = org.detail?.taxonomyInfo as Record<string, string> | undefined;
        if (!tax) return;
        const val = tax[rankKey];
        if (!val) return;

        if (!counts[val]) {
          counts[val] = { count: 0, parents: new Set() };
        }
        counts[val].count += 1;

        if (rankIdx > 0) {
          const parentKey = rankKeys[rankIdx - 1];
          if (tax[parentKey]) {
            counts[val].parents.add(tax[parentKey]);
          }
        }
      });

      result[rankKey] = Object.entries(counts)
        .map(([name, info]) => ({
          name,
          count: info.count,
          parentInfo: Array.from(info.parents).join(', '),
        }))
        .sort((a, b) => a.name.localeCompare(b.name));
    });

    return result;
  }, [organisms, ranks, selection]);

  // Build hierarchical tree structure dynamically
  const taxonomyTree = useMemo(() => {
    const rootNodes: TreeNode[] = [];

    organisms.forEach((org) => {
      const tax = org.detail?.taxonomyInfo as Record<string, string> | undefined;
      if (!tax) return;

      let currentLevelNodes = rootNodes;
      let pathId = '';

      ranks.forEach((rankConfig) => {
        const rankKey = rankConfig.key;
        const val = tax[rankKey];
        if (!val) return;

        pathId = pathId ? `${pathId}>${val}` : `${rankKey}:${val}`;

        let node = currentLevelNodes.find((n) => n.name === val);
        if (!node) {
          node = {
            id: pathId,
            name: val,
            rankKey,
            count: 0,
            children: [],
          };
          currentLevelNodes.push(node);
        }
        node.count += 1;
        currentLevelNodes = node.children;
      });
    });

    const sortTree = (nodes: TreeNode[]) => {
      nodes.sort((a, b) => a.name.localeCompare(b.name));
      nodes.forEach((n) => sortTree(n.children));
    };
    sortTree(rootNodes);

    return rootNodes;
  }, [organisms, ranks]);

  const toggleNodeExpansion = (nodeId: string) => {
    setExpandedNodes((prev) => ({
      ...prev,
      [nodeId]: !prev[nodeId],
    }));
  };

  const expandAllNodes = () => {
    const newExpanded: Record<string, boolean> = {};
    const traverse = (nodes: TreeNode[]) => {
      nodes.forEach((n) => {
        newExpanded[n.id] = true;
        if (n.children.length) traverse(n.children);
      });
    };
    traverse(taxonomyTree);
    setExpandedNodes(newExpanded);
  };

  const collapseAllNodes = () => {
    setExpandedNodes({});
  };

  const handleCheckboxChange = (rankKey: string, name: string) => {
    const currentList = selection[rankKey] || [];
    const isSelected = currentList.includes(name);

    const newList = isSelected
      ? currentList.filter((item) => item !== name)
      : [...currentList, name];

    onChange({
      ...selection,
      [rankKey]: newList,
    });
  };

  const handleClearRank = (rankKey: string) => {
    onChange({
      ...selection,
      [rankKey]: [],
    });
  };

  const handleClearAll = () => {
    onChange(getInitialSelection(ranks));
  };

  const removeItem = (rankKey: string, name: string) => {
    onChange({
      ...selection,
      [rankKey]: (selection[rankKey] || []).filter((item) => item !== name),
    });
  };

  const activeRankConfig = rankMap[activeRankKey] || ranks[0];

  // Render tree node recursively
  const renderTreeNode = (node: TreeNode, depth: number = 0) => {
    const isExpanded = !!expandedNodes[node.id];
    const hasChildren = node.children.length > 0;
    const isChecked = (selection[node.rankKey] || []).includes(node.name);
    const rConfig = rankMap[node.rankKey];

    return (
      <div key={node.id} className="taxonomy-tree__item-wrap">
        <div
          className={`taxonomy-tree__item ${isChecked ? 'taxonomy-tree__item--selected' : ''}`}
          style={{ paddingLeft: `${depth * 20 + 10}px` }}
        >
          <button
            type="button"
            className={`taxonomy-tree__toggle ${hasChildren ? '' : 'taxonomy-tree__toggle--hidden'}`}
            onClick={() => toggleNodeExpansion(node.id)}
            title={isExpanded ? 'Recolher' : 'Expandir'}
          >
            {hasChildren && (isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />)}
          </button>

          <label className="taxonomy-tree__checkbox-label">
            <input
              type="checkbox"
              checked={isChecked}
              onChange={() => handleCheckboxChange(node.rankKey, node.name)}
              className="taxonomy-checkbox"
            />
            <span className="taxonomy-tree__rank-badge">
              {rConfig ? rConfig.singular : node.rankKey}
            </span>
            <span className="taxonomy-tree__node-name">
              {node.rankKey === 'especie' || node.rankKey === 'genero' ? (
                <i>{node.name}</i>
              ) : node.rankKey === 'acessoGenbank' ? (
                <code>{node.name}</code>
              ) : (
                node.name
              )}
            </span>
            <span className="taxonomy-tree__count">({node.count})</span>
          </label>
        </div>

        {hasChildren && isExpanded && (
          <div className="taxonomy-tree__children">
            {node.children.map((child) => renderTreeNode(child, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="taxonomy-filter">
      {/* Header */}
      <div className="taxonomy-filter__header">
        <div className="taxonomy-filter__title-wrap">
          <Filter size={18} className="taxonomy-filter__icon" />
          <h3 className="taxonomy-filter__title">{title}</h3>
          {totalActiveFilters > 0 && (
            <span className="taxonomy-filter__badge">
              {totalActiveFilters} ativo{totalActiveFilters > 1 ? 's' : ''}
            </span>
          )}
        </div>

        <div className="taxonomy-filter__actions">
          <div className="taxonomy-filter__mode-toggle">
            <button
              type="button"
              className={`taxonomy-filter__mode-btn ${
                viewMode === 'tree' ? 'taxonomy-filter__mode-btn--active' : ''
              }`}
              onClick={() => setViewMode('tree')}
              title="Visão Hierárquica em Árvore"
            >
              <GitFork size={14} />
              <span>Árvore</span>
            </button>
            <button
              type="button"
              className={`taxonomy-filter__mode-btn ${
                viewMode === 'ranks' ? 'taxonomy-filter__mode-btn--active' : ''
              }`}
              onClick={() => setViewMode('ranks')}
              title="Visão por Níveis Nível a Nível"
            >
              <Layers size={14} />
              <span>Por Níveis</span>
            </button>
          </div>

          {totalActiveFilters > 0 && (
            <button
              type="button"
              className="taxonomy-filter__clear-btn"
              onClick={handleClearAll}
              title="Limpar filtros desta taxonomia"
            >
              <RotateCcw size={13} />
              Limpar Filtros
            </button>
          )}
        </div>
      </div>

      {/* Active Filter Chips */}
      {totalActiveFilters > 0 && (
        <div className="taxonomy-filter__chips">
          <span className="taxonomy-filter__chips-label">Filtros selecionados:</span>
          {ranks.map((rConfig) =>
            (selection[rConfig.key] || []).map((val) => (
              <span key={`${rConfig.key}-${val}`} className="taxonomy-chip">
                <span className="taxonomy-chip__rank">{rConfig.singular}:</span>
                <span className="taxonomy-chip__val">{val}</span>
                <button
                  type="button"
                  className="taxonomy-chip__remove"
                  onClick={() => removeItem(rConfig.key, val)}
                  title={`Remover ${val}`}
                >
                  <X size={12} />
                </button>
              </span>
            ))
          )}
        </div>
      )}

      {/* VIEW MODE: TREE */}
      {viewMode === 'tree' && (
        <div className="taxonomy-filter__tree-container">
          <div className="taxonomy-filter__tree-toolbar">
            <span className="taxonomy-filter__tree-info">
              Hierarquia: {ranks.map((r) => r.singular).join(' ➔ ')}
            </span>
            <div className="taxonomy-filter__tree-expand-controls">
              <button type="button" onClick={expandAllNodes} className="taxonomy-text-btn">
                Expandir Todos
              </button>
              <span className="taxonomy-divider">•</span>
              <button type="button" onClick={collapseAllNodes} className="taxonomy-text-btn">
                Recolher Todos
              </button>
            </div>
          </div>

          <div className="taxonomy-tree">
            {taxonomyTree.length > 0 ? (
              taxonomyTree.map((node) => renderTreeNode(node, 0))
            ) : (
              <div className="taxonomy-empty">Nenhum organismo disponível nesta categoria.</div>
            )}
          </div>
        </div>
      )}

      {/* VIEW MODE: RANKS ACCORDION */}
      {viewMode === 'ranks' && (
        <div className="taxonomy-filter__ranks-container">
          {/* Rank Tabs */}
          <div className="taxonomy-filter__tabs">
            {ranks.map((rConfig) => {
              const countSelected = (selection[rConfig.key] || []).length;
              const optionsCount = (availableOptionsByRank[rConfig.key] || []).length;
              const isCurrent = activeRankKey === rConfig.key;

              return (
                <button
                  key={rConfig.key}
                  type="button"
                  className={`taxonomy-tab ${isCurrent ? 'taxonomy-tab--active' : ''} ${
                    countSelected > 0 ? 'taxonomy-tab--has-selected' : ''
                  }`}
                  onClick={() => setActiveRankKey(rConfig.key)}
                >
                  <span className="taxonomy-tab__icon">{getRankIcon(rConfig.key)}</span>
                  <span className="taxonomy-tab__label">{rConfig.singular}</span>
                  {countSelected > 0 ? (
                    <span className="taxonomy-tab__badge">{countSelected}</span>
                  ) : (
                    <span className="taxonomy-tab__count">({optionsCount})</span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Active Rank Content */}
          {activeRankConfig && (
            <div className="taxonomy-filter__rank-content">
              <div className="taxonomy-filter__rank-header">
                <div className="taxonomy-filter__rank-title">
                  <span className="taxonomy-filter__rank-icon-wrap">
                    {getRankIcon(activeRankConfig.key)}
                  </span>
                  <h4>Seleção de {activeRankConfig.label}</h4>
                  <span className="taxonomy-filter__rank-sub">
                    ({(availableOptionsByRank[activeRankConfig.key] || []).length} disponível
                    {(availableOptionsByRank[activeRankConfig.key] || []).length !== 1 ? 'is' : ''})
                  </span>
                </div>

                {(selection[activeRankConfig.key] || []).length > 0 && (
                  <button
                    type="button"
                    className="taxonomy-text-btn taxonomy-text-btn--danger"
                    onClick={() => handleClearRank(activeRankConfig.key)}
                  >
                    Limpar {activeRankConfig.label}
                  </button>
                )}
              </div>

              {/* Rank Search */}
              {(availableOptionsByRank[activeRankConfig.key] || []).length > 5 && (
                <div className="taxonomy-filter__search-wrap">
                  <Search size={14} className="taxonomy-filter__search-icon" />
                  <input
                    type="text"
                    placeholder={`Filtrar listagem de ${activeRankConfig.label.toLowerCase()}...`}
                    value={rankSearch[activeRankConfig.key] || ''}
                    onChange={(e) =>
                      setRankSearch({ ...rankSearch, [activeRankConfig.key]: e.target.value })
                    }
                    className="taxonomy-filter__search-input"
                  />
                </div>
              )}

              {/* Checkbox Grid */}
              <div className="taxonomy-filter__checkbox-grid">
                {(availableOptionsByRank[activeRankConfig.key] || [])
                  .filter((opt) =>
                    opt.name
                      .toLowerCase()
                      .includes((rankSearch[activeRankConfig.key] || '').toLowerCase().trim())
                  )
                  .map((opt) => {
                    const isChecked = (selection[activeRankConfig.key] || []).includes(opt.name);
                    return (
                      <label
                        key={opt.name}
                        className={`taxonomy-checkbox-card ${
                          isChecked ? 'taxonomy-checkbox-card--selected' : ''
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => handleCheckboxChange(activeRankConfig.key, opt.name)}
                          className="taxonomy-checkbox"
                        />
                        <div className="taxonomy-checkbox-card__info">
                          <span className="taxonomy-checkbox-card__name">
                            {activeRankConfig.key === 'especie' || activeRankConfig.key === 'genero' ? (
                              <i>{opt.name}</i>
                            ) : activeRankConfig.key === 'acessoGenbank' ? (
                              <code>{opt.name}</code>
                            ) : (
                              opt.name
                            )}
                          </span>
                          {opt.parentInfo && (
                            <span className="taxonomy-checkbox-card__parent">
                              pertencente a {opt.parentInfo}
                            </span>
                          )}
                        </div>
                        <span className="taxonomy-checkbox-card__count">{opt.count}</span>
                      </label>
                    );
                  })}
                {(availableOptionsByRank[activeRankConfig.key] || []).length === 0 && (
                  <div className="taxonomy-empty">
                    Nenhum {activeRankConfig.singular.toLowerCase()} disponível com as seleções superiores atuais.
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TaxonomyFilter;
