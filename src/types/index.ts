export interface TaxonomyInfo {
  reino?: string;
  filo?: string;
  classe?: string;
  ordem?: string;
  superfamilia?: string;
  familia?: string;
  subfamilia?: string;
  genero: string;
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

export interface BaseOrganism {
  id: number;
  name: string;
  commonName: string;
  type: 'Bacteria' | 'Fungo' | 'Formiga';
  morphology: string;
  taxonomy: string;
  tags: string[];
  imageUrl?: string;
  color?: string;
  detail?: OrganismDetail;
  associatedAnts?: string[];
  associatedMicrobes?: string[];
  associatedBacteria?: string[];
  associatedFungi?: string[];
}

export interface BacteriaOrganism extends BaseOrganism {
  type: 'Bacteria';
  gramStain?: string;
  motility?: string;
  spores?: string;
  optimumTemperature?: string;
  antibioticProduction?: string;
}

export interface FungoOrganism extends BaseOrganism {
  type: 'Fungo';
  spores?: string;
  symbioticFunction?: string;
  symbioticRole?: string;
  myceliumType?: string;
  growthSubstrate?: string;
  enzymaticActivity?: string[];
  gongylidiaProduction?: string;
}

export interface FormigaOrganism extends BaseOrganism {
  type: 'Formiga';
  casteSystem?: string[];
  nestDepth?: string;
  colonySize?: string;
  agricultureType?: string;
  associatedBacteria?: string[];
  associatedFungi?: string[];
}

export type Organism = BacteriaOrganism | FungoOrganism | FormigaOrganism;

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

export type MicrobeTaxonomyRank = 'reino' | 'filo' | 'classe' | 'ordem' | 'familia' | 'genero' | 'especie' | 'acessoGenbank';
export type AntTaxonomyRank = 'genero' | 'especie' | 'acessoGenbank';

export type TaxonomySelectionState = Record<string, string[]>;