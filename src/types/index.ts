export interface TaxonomyInfo {
  reino: string;
  filo: string;
  classe: string;
  ordem: string;
  superfamilia?: string;
  familia: string;
  subfamilia?: string;
  genero?: string;
  especie: string;
  acessoGenbank?: string;
}

export interface OrganismDetail {
  genomeSize: number;
  gcContent: number;
  geneCount: number;
  description: string;
  habitat: string;
  taxonomyInfo: TaxonomyInfo;
  references: string[];
  genbankAccession?: string;
  heroImageUrl?: string;
}

export interface Organism {
  id: number;
  name: string;
  commonName: string;
  type: 'Bacteria' | 'Fungi' | 'Formiga';
  morphology: string;
  gramStain?: string;
  motility?: string;
  spores?: string;
  taxonomy: string;
  tags: string[];
  imageUrl?: string;
  color?: string;
  detail?: OrganismDetail;
}

export interface MorphologyCategory {
  name: string;
  count: number;
  imageUrl: string;
}

export interface Stat {
  label: string;
  value: string;
  icon: string;
}

export type MicrobeTaxonomyRank = 'reino' | 'filo' | 'classe' | 'ordem' | 'familia' | 'genero' | 'especie';
export type AntTaxonomyRank = 'reino' | 'filo' | 'classe' | 'ordem' | 'superfamilia' | 'familia' | 'subfamilia' | 'especie';

export type TaxonomySelectionState = Record<string, string[]>;