export interface ASVItem {
  id: string;
  sequence: string;
  length: number;
  taxonomy: string;
  organismName: string;
  type: 'Bacteria' | 'Fungo' | 'Formiga' | 'Outros';
  count: number;
  relativeAbundance: number;
  confidence: number;
  organismId?: number;
  description?: string;
}

export interface SeqRun {
  id: string;
  title: string;
  date: string;
  targetRegion: '16S V4' | '16S V3-V4' | 'ITS1' | 'ITS2' | '18S rRNA' | '16S Full Length' | 'Metagenoma Shotgun';
  platform: 'Illumina MiSeq' | 'Illumina NovaSeq 6000' | 'Oxford Nanopore GridION' | 'PacBio Sequel II';
  sampleSource: string;
  environment: string;
  totalReads: number;
  totalAsvs: number;
  shannonIndex: number;
  chao1Index: number;
  description: string;
  asvs: ASVItem[];
}

export const seqRunsData: SeqRun[] = [
  {
    id: 'SEQRUN-2024-16S-01',
    title: 'Amplicon 16S V4 - Microbioma Cuticular de Atta sexdens',
    date: '12/04/2024',
    targetRegion: '16S V4',
    platform: 'Illumina MiSeq',
    sampleSource: 'Atta sexdens (Formiga-cortadeira) - Colônia Laboratorial LBMM',
    environment: 'Cutícula Torácica de Operárias Maiores (Soldados)',
    totalReads: 185420,
    totalAsvs: 36,
    shannonIndex: 3.15,
    chao1Index: 42.0,
    description: 'Sequenciamento da região hipervariável V4 do gene 16S rRNA para identificação das bactérias actinomicetos simbiontes associadas à estrutura da cutícula corporal das formigas.',
    asvs: [
      {
        id: 'ASV_16S_001',
        sequence: 'TACGGRAGGTCCAGCGTTATCCGGATTTATTGGGCGTAAAGCGAGCGCAGGCGGTTTGATAAGTCTGAAGTTAAAGGCTGTGGCTCAACCATAGTACGCTTTGGAAACTGTCAAACTTGAGTGCAGAAGAGGAGAGTGGAATTCCATGTGTAGCGGTGAAATGCGTAGATATATGGAGGAACACCAGTGGCGAAGGCGACTCTCTGGACTGTAACTGACGCTGAGGCTCGAAAGCGTGGGGAGCAAACAGG',
        length: 253,
        taxonomy: 'k__Bacteria; p__Actinomycetota; c__Actinomycetes; o__Propionibacteriales; f__Nocardiaceae; g__Pseudonocardia; s__Pseudonocardia_formicarum',
        organismName: 'Pseudonocardia formicarum',
        type: 'Bacteria',
        count: 78800,
        relativeAbundance: 42.50,
        confidence: 99.8,
        description: 'Bactéria actinomiceto mutualista primária, responsável pela síntese de metabólitos secundários antifúngicos (dentamicina) que protegem a colônia contra mico-patógenos.'
      },
      {
        id: 'ASV_16S_002',
        sequence: 'TACGTAGGGTCCAGCGTTATCCGGATTTATTGGGCGTAAAGCGAGCGCAGGCGGTCTTTTAAGTCTGATGTGAAAGCCCACGGCTCAACCGTGGAGGGTCATTGGAAACTGGAAGACTTGAGTACAGAAGAGGAGAGTGGAATTCCATGTGTAGCGGTGAAATGCGTAGATATATGGAGGAACACCAGTGGCGAAGGCGACTCTCTGGACTGTAACTGACGCTGAGGCTCGAAAGCGTGGGGAGCAAACAGG',
        length: 254,
        taxonomy: 'k__Bacteria; p__Actinomycetota; c__Actinomycetes; o__Streptomycetales; f__Streptomycetaceae; g__Streptomyces; s__Streptomyces_albidoflavus',
        organismName: 'Streptomyces albidoflavus',
        type: 'Bacteria',
        count: 38900,
        relativeAbundance: 20.98,
        confidence: 99.4,
        description: 'Simbionte bacteriano secundário produtor de candicidina e antimicina, auxiliando na defesa do jardim fúngico.'
      },
      {
        id: 'ASV_16S_003',
        sequence: 'TACGTAGGGTCAAGCGTTATCCGGATTTATTGGGCGTAAAGCGAGCGCAGGCGGTTTGATAAGTCTGAAGTTAAAGGCTGTGGCTCAACCATAGTACGCTTTGGAAACTGTCAAACTTGAGTGCAGAAGAGGAGAGTGGAATTCCATGTGTAGCGGTGAAATGCGTAGATATATGGAGGAACACCAGTGGCGAAGGCGACTCTCTGGACTGTAACTGACGCTGAGGCTCGAAAGCGTGGGGAGCAAACAGG',
        length: 253,
        taxonomy: 'k__Bacteria; p__Actinomycetota; c__Actinomycetes; o__Propionibacteriales; f__Propionibacteriaceae; g__Cutibacterium; s__Cutibacterium_acnes',
        organismName: 'Cutibacterium acnes',
        type: 'Bacteria',
        count: 22100,
        relativeAbundance: 11.92,
        confidence: 98.9,
        description: 'Bactéria comensal frequentemente isolada do exoesqueleto de insetos sociais.'
      },
      {
        id: 'ASV_16S_004',
        sequence: 'TACGGRAGGTCCAGCGTTATCCGGATTTATTGGGCGTAAAGCGAGCGCAGGCGGTTTGATAAGTCTGAAGTTAAAGGCTGTGGCTCAACCATAGTACGCTTTGGAAACTGTCAAACTTGAGTGCAGAAGAGGAGAGTGGAATTCCATGTGTAGCGGTGAAATGCGTAGATATATGGAGGAACACCAGTGGCGAAGGCGACTCTCTGGACTGTAACTGACGCTGAGGCTCGAAAGCGTGGGGAGCAAACAGG',
        length: 252,
        taxonomy: 'k__Bacteria; p__Pseudomonadota; c__Alphaproteobacteria; o__Rickettsiales; f__Anaplasmataceae; g__Wolbachia; s__Wolbachia_pipientis',
        organismName: 'Wolbachia pipientis',
        type: 'Bacteria',
        count: 15400,
        relativeAbundance: 8.31,
        confidence: 99.7,
        description: 'Endosimbionte reprodutivo intracelular comum em populações de artrópodes.'
      },
      {
        id: 'ASV_16S_005',
        sequence: 'TACGGAGGGAACGAGCGTTAATCGGAATTACTGGGCGTAAAGCGCACGCAGGCGGTTTGTTAAGTCAGATGTGAAATCCCCGGGCTCAACCTGGGAACTGCATCTGATACTGGCAAGCTTGAGTCTCGTAGAGGGGGGTAGAATTCCAGGTGTAGCGGTGAAATGCGTAGAGATCTGGAGGAATACCGGTGGCGAAGGCGGCCCCCTGGACGAAGACTGACGCTCAGGTGCGAAAGCGTGGGGAGCAAACAGG',
        length: 253,
        taxonomy: 'k__Bacteria; p__Pseudomonadota; c__Gammaproteobacteria; o__Enterobacterales; f__Enterobacteriaceae; g__Escherichia; s__Escherichia_coli',
        organismName: 'Escherichia coli',
        type: 'Bacteria',
        count: 9200,
        relativeAbundance: 4.96,
        confidence: 100.0,
        organismId: 1,
        description: 'Transiente entérico Gram-negativo identificado no microbioma exógeno.'
      },
      {
        id: 'ASV_16S_006',
        sequence: 'TACGTAGGTGGCAAGCGTTATCCGGAATTATTGGGCGTAAAGCGCGCGCAGGCGGTTTCTTAAGTCTGATGTGAAAGCCCACGGCTCAACCGTGGAGGGTCATTGGAAACTGGGGAACTTGAGTACAGAAGAGGAGAGTGGAATTCCATGTGTAGCGGTGAAATGCGTAGATATATGGAGGAACACCAGTGGCGAAGGCGACTCTCTGGACTGTAACTGACGCTGAGGCTCGAAAGCGTGGGGAGCAAACAGG',
        length: 253,
        taxonomy: 'k__Bacteria; p__Bacillota; c__Bacilli; o__Bacillales; f__Bacillaceae; g__Bacillus; s__Bacillus_subtilis',
        organismName: 'Bacillus subtilis',
        type: 'Bacteria',
        count: 7100,
        relativeAbundance: 3.83,
        confidence: 99.1,
        organismId: 3,
        description: 'Bactéria formadora de endósporos com papel antagônico contra fungos competidores de degradação foliar.'
      },
      {
        id: 'ASV_16S_007',
        sequence: 'TACGTAGGGTCCAGCGTTATCCGGATTTATTGGGCGTAAAGCGAGCGCAGGCGGTTTGATAAGTCTGAAGTTAAAGGCTGTGGCTCAACCATAGTACGCTTTGGAAACTGTCAAACTTGAGTGCAGAAGAGGAGAGTGGAATTCCATGTGTAGCGGTGAAATGCGTAGATATATGGAGGAACACCAGTGGCGAAGGCGACTCTCTGGACTGTAACTGACGCTGAGGCTCGAAAGCGTGGGGAGCAAACAGG',
        length: 254,
        taxonomy: 'k__Bacteria; p__Pseudomonadota; c__Betaproteobacteria; o__Burkholderiales; f__Burkholderiaceae; g__Burkholderia; s__Burkholderia_fungorum',
        organismName: 'Burkholderia fungorum',
        type: 'Bacteria',
        count: 5600,
        relativeAbundance: 3.02,
        confidence: 97.8,
        description: 'Degradador de matéria orgânica vegetal trazida pelas formigas para o ninho.'
      },
      {
        id: 'ASV_16S_008',
        sequence: 'TACGTAGGTGGCAAGCGTTATCCGGAATTATTGGGCGTAAAGCGCGCGCAGGCGGTTTCTTAAGTCTGATGTGAAAGCCCACGGCTCAACCGTGGAGGGTCATTGGAAACTGGGGAACTTGAGTACAGAAGAGGAGAGTGGAATTCCATGTGTAGCGGTGAAATGCGTAGATATATGGAGGAACACCAGTGGCGAAGGCGACTCTCTGGACTGTAACTGACGCTGAGGCTCGAAAGCGTGGGGAGCAAACAGG',
        length: 253,
        taxonomy: 'k__Bacteria; p__Bacillota; c__Bacilli; o__Bacillales; f__Staphylococcaceae; g__Staphylococcus; s__Staphylococcus_aureus',
        organismName: 'Staphylococcus aureus',
        type: 'Bacteria',
        count: 4500,
        relativeAbundance: 2.43,
        confidence: 99.6,
        organismId: 2,
        description: 'Bactéria gram-positiva ambiental detectada em baixa abundância nas amostras de ninho.'
      }
    ]
  },
  {
    id: 'SEQRUN-2024-ITS-02',
    title: 'Amplicon ITS2 - Metabarcoding Fúngico do Jardim de Acromyrmex subterraneus',
    date: '28/05/2024',
    targetRegion: 'ITS2',
    platform: 'Illumina NovaSeq 6000',
    sampleSource: 'Jardim de Fungos (Camada Mediana e Esferas de Gongilídios) - Rio Claro / SP',
    environment: 'Ninho Subterrâneo Nativo de Acromyrmex subterraneus',
    totalReads: 310800,
    totalAsvs: 28,
    shannonIndex: 2.48,
    chao1Index: 31.5,
    description: 'Sequenciamento do espaçador transcrito interno ITS2 para caracterizar o perfil de espécies fúngicas mutualistas, fungos parasitas (Escovopsis) e leveduras oportunistas no jardim de fungos.',
    asvs: [
      {
        id: 'ASV_ITS_001',
        sequence: 'AACTTTCAACAACGGATCTCTTGGCTCTCGCATCGATGAAGAACGCAGCGAAATGCGATAAGTAATGTGAATTGCAGAATTCAGTGAATCATCGAATCTTTGAACGCACATTGCGCCCCTTGGTATTCCATAGGGCATGCCTGTTCGAGCGTCATTTACACCCTCAAGCTCTGCTTGGTGTTGGGTGTTTGTCTCGCCTTTGCGCGCAGACTCGCCTTAAAATAATTGGCAGCCGGCCTACTGGTCTTCGGAGCGCAGCACATTTTT',
        length: 312,
        taxonomy: 'k__Fungi; p__Basidiomycota; c__Agaricomycetes; o__Agaricales; f__Agaricaceae; g__Leucocoprinus; s__Leucocoprinus_gongylophorus',
        organismName: 'Leucocoprinus gongylophorus',
        type: 'Fungo',
        count: 198900,
        relativeAbundance: 64.00,
        confidence: 99.9,
        description: 'Cultivar fúngico simbionte obrigatório das formigas atíneas. Produz estruturas nutritivas chamadas gongilídios (staphylae) que alimentam a rainha e larvas da colônia.'
      },
      {
        id: 'ASV_ITS_002',
        sequence: 'AACTTTCAACAACGGATCTCTTGGCTCTCGCATCGATGAAGAACGCAGCGAAATGCGATAAGTAATGTGAATTGCAGAATTCAGTGAATCATCGAATCTTTGAACGCACATTGCGCCCCCTGGTATTCCGGAGGGCATGCCTGTTCGAGCGTCATTTCAACCCTCAAGCCCCGGGGGTTTGGTGTTGGGGATCGGCTCTGCCTTCGCAGGCAGACTCGCCTTAAAATCAGTGGCGGCCGGCCTACTGGTCCTCGGAGCGCAGCACATTT',
        length: 308,
        taxonomy: 'k__Fungi; p__Ascomycota; c__Sordariomycetes; o__Hypocreales; f__Hypocreaceae; g__Escovopsis; s__Escovopsis_weberi',
        organismName: 'Escovopsis weberi',
        type: 'Fungo',
        count: 46620,
        relativeAbundance: 15.00,
        confidence: 99.5,
        description: 'Fungo micro-patógeno necrotrófico especializado que ataca o cultivar Leucocoprinus gongylophorus, capaz de colapsar a colônia se não for controlado pelas formigas e metabólitos de Pseudonocardia.'
      },
      {
        id: 'ASV_ITS_003',
        sequence: 'AACTTTCAACAACGGATCTCTTGGCTCTCGCATCGATGAAGAACGCAGCGAAATGCGATAAGTAATGTGAATTGCAGAATTCAGTGAATCATCGAATCTTTGAACGCACATTGCGCCCCTTGGTATTCCATAGGGCATGCCTGTTCGAGCGTCATTTCACCCTCAAGCTCTGCTTGGTGTTGGGTGTTTGTCTCGCCTTTGCGCGCAGACTCGCCTTAAAATAATTGGCAGCCGGCCTACTGGTCTTCGGAGCGCAGCACATTT',
        length: 295,
        taxonomy: 'k__Fungi; p__Ascomycota; c__Sordariomycetes; o__Hypocreales; f__Hypocreaceae; g__Trichoderma; s__Trichoderma_harzianum',
        organismName: 'Trichoderma harzianum',
        type: 'Fungo',
        count: 24860,
        relativeAbundance: 8.00,
        confidence: 98.7,
        description: 'Fungo filamentoso endofítico mycoparasita de solo presente em baixas densidades nos resíduos vegetais.'
      },
      {
        id: 'ASV_ITS_004',
        sequence: 'AACTTTCAACAACGGATCTCTTGGCTCTCGCATCGATGAAGAACGCAGCGAAATGCGATAAGTAATGTGAATTGCAGAATTCAGTGAATCATCGAATCTTTGAACGCACATTGCGCCCCCTGGTATTCCGGAGGGCATGCCTGTTCGAGCGTCATTTCAACCCTCAAGCCCCGGGGGTTTGGTGTTGGGGATCGGCTCTGCCTTCGCAGGCAGACTCGCCTTAAAATCAGTGGCGGCCGGCCTACTGGTCCTCGGAGCGCAGCACATTTTTT',
        length: 315,
        taxonomy: 'k__Fungi; p__Ascomycota; c__Sordariomycetes; o__Hypocreales; f__Nectriaceae; g__Fusarium; s__Fusarium_oxysporum',
        organismName: 'Fusarium oxysporum',
        type: 'Fungo',
        count: 18650,
        relativeAbundance: 6.00,
        confidence: 97.9,
        description: 'Patógeno vegetal introduzido acidentalmente via forrageamento de folhas frescas pelas formigas.'
      },
      {
        id: 'ASV_ITS_005',
        sequence: 'AACTTTCAACAACGGATCTCTTGGCTCTCGCATCGATGAAGAACGCAGCGAAATGCGATAAGTAATGTGAATTGCAGAATTCAGTGAATCATCGAATCTTTGAACGCACATTGCGCCCCTTGGTATTCCATAGGGCATGCCTGTTCGAGCGTCATTTACACCCTCAAGCTCTGCTTGGTGTTGGGTGTTTGTCTCGCCTTTGCGCGCAGACTCGCCTTAAAATAATTGGCAGCCGGCCTACTGGTCTTCGGAGCGCAGC',
        length: 302,
        taxonomy: 'k__Fungi; p__Ascomycota; c__Eurotiomycetes; o__Eurotiales; f__Aspergillaceae; g__Aspergillus; s__Aspergillus_niger',
        organismName: 'Aspergillus niger',
        type: 'Fungo',
        count: 12430,
        relativeAbundance: 4.00,
        confidence: 99.2,
        description: 'Fungo saprófita produtor de esporos que tenta colonizar regiões senescentes do jardim de fungos.'
      },
      {
        id: 'ASV_ITS_006',
        sequence: 'AACTTTCAACAACGGATCTCTTGGCTCTCGCATCGATGAAGAACGCAGCGAAATGCGATAAGTAATGTGAATTGCAGAATTCAGTGAATCATCGAATCTTTGAACGCACATTGCGCCCCTTGGTATTCCATAGGGCATGCCTGTTCGAGCGTCATTTACACCCTCAAGCTCTGCTTGGTGTTGGGTGTTTGTCTCGCCTTTGCGCGCAGACTCGCCTTAAAATAATTGGCAGCCGGCCT',
        length: 288,
        taxonomy: 'k__Fungi; p__Ascomycota; c__Saccharomycetes; o__Saccharomycetales; f__Debaryomycetaceae; g__Candida; s__Candida_albicans',
        organismName: 'Candida albicans',
        type: 'Fungo',
        count: 9340,
        relativeAbundance: 3.00,
        confidence: 98.5,
        description: 'Levedura oportunista adaptada a ambientes ricos em açúcares e exsudatos vegetais.'
      }
    ]
  },
  {
    id: 'SEQRUN-2023-METAG-03',
    title: 'Metagenômica Shotgun - Jardim Metabólico de Atta cephalotes (Camada Ativa)',
    date: '15/11/2023',
    targetRegion: 'Metagenoma Shotgun',
    platform: 'PacBio Sequel II',
    sampleSource: 'Atta cephalotes - Amostra de Jardim Fúngico de Floresta Tropical (Manaus/AM)',
    environment: 'Região de Alta Atividade Enzimática (Topo do Jardim Fúngico)',
    totalReads: 520000,
    totalAsvs: 64,
    shannonIndex: 3.85,
    chao1Index: 72.0,
    description: 'Sequenciamento metagenômico completo por leituras longas para mapear contigs de alta fidelidade (HiFi), genomas reconstruídos (MAGs) e diversidade de genes de degradação de lignocelulose.',
    asvs: [
      {
        id: 'ASV_META_001',
        sequence: 'TACGGRAGGTCCAGCGTTATCCGGATTTATTGGGCGTAAAGCGAGCGCAGGCGGTTTGATAAGTCTGAAGTTAAAGGCTGTGGCTCAACCATAGTACGCTTTGGAAACTGTCAAACTTGAGTGCAGAAGAGGAGAGTGGAATTCCATGTGTAGCGGTGAAATGCGTAGATATATGGAGGAACACCAGTGGCGAAGGCGACTCTCTGGACTGTAACTGACGCTGAGGCTCGAAAGCGTGGGGAGCAAACAGG',
        length: 1420,
        taxonomy: 'k__Bacteria; p__Actinomycetota; c__Actinomycetes; o__Propionibacteriales; f__Nocardiaceae; g__Pseudonocardia; s__Pseudonocardia_sp_B12',
        organismName: 'Pseudonocardia sp. B12',
        type: 'Bacteria',
        count: 140400,
        relativeAbundance: 27.00,
        confidence: 99.9,
        description: 'Contig metagenômico completo do operon de biossíntese do peptídeo antimicrobiano isolado de Atta cephalotes.'
      },
      {
        id: 'ASV_META_002',
        sequence: 'AACTTTCAACAACGGATCTCTTGGCTCTCGCATCGATGAAGAACGCAGCGAAATGCGATAAGTAATGTGAATTGCAGAATTCAGTGAATCATCGAATCTTTGAACGCACATTGCGCCCCTTGGTATTCCATAGGGCATGCCTGTTCGAGCGTCATTTACACCCTCAAGCTCTGCTTGGTGTTGGGTGTTTGTCTCGCCTTTGCGCGCAGACTCGCCTTAAAATAATTGGCAGCCGGCCTACTGGTCTTCGGAGCGCAGCACATTTTT',
        length: 1550,
        taxonomy: 'k__Fungi; p__Basidiomycota; c__Agaricomycetes; o__Agaricales; f__Agaricaceae; g__Leucocoprinus; s__Leucocoprinus_gongylophorus',
        organismName: 'Leucocoprinus gongylophorus',
        type: 'Fungo',
        count: 119600,
        relativeAbundance: 23.00,
        confidence: 100.0,
        description: 'Sequência contínua do locus 18S-ITS1-5.8S-ITS2-28S do cultivar fúngico da colônia.'
      },
      {
        id: 'ASV_META_003',
        sequence: 'TACGGAGGGAACGAGCGTTAATCGGAATTACTGGGCGTAAAGCGCACGCAGGCGGTTTGTTAAGTCAGATGTGAAATCCCCGGGCTCAACCTGGGAACTGCATCTGATACTGGCAAGCTTGAGTCTCGTAGAGGGGGGTAGAATTCCAGGTGTAGCGGTGAAATGCGTAGAGATCTGGAGGAATACCGGTGGCGAAGGCGGCCCCCTGGACGAAGACTGACGCTCAGGTGCGAAAGCGTGGGGAGCAAACAGG',
        length: 1380,
        taxonomy: 'k__Bacteria; p__Pseudomonadota; c__Gammaproteobacteria; o__Enterobacterales; f__Enterobacteriaceae; g__Klebsiella; s__Klebsiella_pneumoniae',
        organismName: 'Klebsiella pneumoniae',
        type: 'Bacteria',
        count: 67600,
        relativeAbundance: 13.00,
        confidence: 98.8,
        description: 'Bactéria fixadora de nitrogênio (nifH+) presente na matriz do ninho garantindo o suprimento proteico do jardim.'
      },
      {
        id: 'ASV_META_004',
        sequence: 'TACGTAGGGTCCAGCGTTATCCGGATTTATTGGGCGTAAAGCGAGCGCAGGCGGTCTTTTAAGTCTGATGTGAAAGCCCACGGCTCAACCGTGGAGGGTCATTGGAAACTGGAAGACTTGAGTACAGAAGAGGAGAGTGGAATTCCATGTGTAGCGGTGAAATGCGTAGATATATGGAGGAACACCAGTGGCGAAGGCGACTCTCTGGACTGTAACTGACGCTGAGGCTCGAAAGCGTGGGGAGCAAACAGG',
        length: 1490,
        taxonomy: 'k__Bacteria; p__Actinomycetota; c__Actinomycetes; o__Streptomycetales; f__Streptomycetaceae; g__Streptomyces; s__Streptomyces_coelicolor',
        organismName: 'Streptomyces coelicolor',
        type: 'Bacteria',
        count: 57200,
        relativeAbundance: 11.00,
        confidence: 99.3,
        description: 'Produtor de antibióticos com ampla gama metabólica e capacidade de degradar quitina fúngica senescente.'
      },
      {
        id: 'ASV_META_005',
        sequence: 'AACTTTCAACAACGGATCTCTTGGCTCTCGCATCGATGAAGAACGCAGCGAAATGCGATAAGTAATGTGAATTGCAGAATTCAGTGAATCATCGAATCTTTGAACGCACATTGCGCCCCCTGGTATTCCGGAGGGCATGCCTGTTCGAGCGTCATTTCAACCCTCAAGCCCCGGGGGTTTGGTGTTGGGGATCGGCTCTGCCTTCGCAGGCAGACTCGCCTTAAAATCAGTGGCGGCCGGCCTACTGGTCCTCGGAGCGCAGCACATTT',
        length: 1320,
        taxonomy: 'k__Fungi; p__Ascomycota; c__Sordariomycetes; o__Hypocreales; f__Hypocreaceae; g__Escovopsis; s__Escovopsis_microspora',
        organismName: 'Escovopsis microspora',
        type: 'Fungo',
        count: 46800,
        relativeAbundance: 9.00,
        confidence: 98.6,
        description: 'Espécie parasita variante com micro-esporos isolada em formigueiros amazônicos.'
      },
      {
        id: 'ASV_META_006',
        sequence: 'TACGTAGGTGGCAAGCGTTATCCGGAATTATTGGGCGTAAAGCGCGCGCAGGCGGTTTCTTAAGTCTGATGTGAAAGCCCACGGCTCAACCGTGGAGGGTCATTGGAAACTGGGGAACTTGAGTACAGAAGAGGAGAGTGGAATTCCATGTGTAGCGGTGAAATGCGTAGATATATGGAGGAACACCAGTGGCGAAGGCGACTCTCTGGACTGTAACTGACGCTGAGGCTCGAAAGCGTGGGGAGCAAACAGG',
        length: 1410,
        taxonomy: 'k__Bacteria; p__Bacillota; c__Bacilli; o__Lactobacillales; f__Lactobacillaceae; g__Lactobacillus; s__Lactobacillus_plantarum',
        organismName: 'Lactobacillus plantarum',
        type: 'Bacteria',
        count: 36400,
        relativeAbundance: 7.00,
        confidence: 99.1,
        description: 'Bactéria lática que reduz o pH do substrato vegetal facilitando a ação de pectinases fúngicas.'
      },
      {
        id: 'ASV_META_007',
        sequence: 'TACGTAGGGTCAAGCGTTATCCGGATTTATTGGGCGTAAAGCGAGCGCAGGCGGTTTGATAAGTCTGAAGTTAAAGGCTGTGGCTCAACCATAGTACGCTTTGGAAACTGTCAAACTTGAGTGCAGAAGAGGAGAGTGGAATTCCATGTGTAGCGGTGAAATGCGTAGATATATGGAGGAACACCAGTGGCGAAGGCGACTCTCTGGACTGTAACTGACGCTGAGGCTCGAAAGCGTGGGGAGCAAACAGG',
        length: 1280,
        taxonomy: 'k__Bacteria; p__Mycoplasmatota; c__Molicutes; o__Entomoplasmatales; f__Entomoplasmataceae; g__Entomoplasma; s__Entomoplasmatales_symbiont',
        organismName: 'Entomoplasmatales symbiont',
        type: 'Bacteria',
        count: 31200,
        relativeAbundance: 6.00,
        confidence: 96.5,
        description: 'Bactéria sem parede celular associada ao fluido do trato digestivo médio das formigas trabalhadoras.'
      }
    ]
  },
  {
    id: 'SEQRUN-2024-NANO-04',
    title: 'Nanopore Long-Reads 16S - Trato Intestinal de Larvas de Acromyrmex octospinosus',
    date: '05/02/2024',
    targetRegion: '16S Full Length',
    platform: 'Oxford Nanopore GridION',
    sampleSource: 'Larvas de 3º Ínstar de Acromyrmex octospinosus - Ninho de Laboratório',
    environment: 'Intestino Médio e Posterior de Larvas Alimentadas com Gongilídios',
    totalReads: 94500,
    totalAsvs: 19,
    shannonIndex: 2.15,
    chao1Index: 22.0,
    description: 'Sequenciamento de comprimento total do gene 16S (~1.500 bp) via Oxford Nanopore para resolução de espécie sem ambiguidade nas bactérias do trato digestivo larval.',
    asvs: [
      {
        id: 'ASV_NANO_001',
        sequence: 'AGAGTTTGATCCTGGCTCAGGACGAACGCTGGCGGCGCGCCTAACACATGCAAGTCGAACGAAACTTTAGGTTGCTTGCAACCTTAAAGTGAGTGGCGAACGGGTGAGTAACACGTGGGTAACCTGCCCATAAGACTGGGATAACTCCGGGAAACCGGGGCTAATACCGGATAACATTTTGAACCGCATGGTTCGAAATTGAAAGGCGGCTTCGGCTGTCACTTATGGATGGACCCGCGTCAGATTAGCTAGTTGGTGAGGTAATGGCTCACCAAGGCGACGATCTGTAGCTGGTCTGAGAGGATGATCAGCCACACTGGGACTGAGACACGGCCCAGACTCCTACGGGAGGCAGCAGTGGGGAATATTGCACAATGGGCGAAAGCCTGATGCAGCCATGCCGCGTGTATGAAGAAGGCCTTCGGGTTGTAAAGTACTTTCAGCGGGGAGGAAGGGAGTAAAGTTAATACCTTTGCTCATTGACGTTACCCGCAGAAGAAGCACCGGCTAACTCCGTGCCAGCAGCCGCGGTAATACGGAGGGTGCAAGCGTTAATCGGAATTACTGGGCGTAAAGCGCACGCAGGCGGTTTGTTAAGTCAGATGTGAAATCCCCGGGCTCAACCTGGGAACTGCATCTGATACTGGCAAGCTTGAGTCTCGTAGAGGGGGGTAGAATTCCAGGTGTAGCGGTGAAATGCGTAGAGATCTGGAGGAATACCGGTGGCGAAGGCGGCCCCCTGGACGAAGACTGACGCTCAGGTGCGAAAGCGTGGGGAGCAAACAGGATTAGATACCCTGGTAGTCCACGCCGTAAACGATGAGTGCTAAGTGTTAGGGGGTTTCCGCCCCTTAGTGCTGCAGCTAACGCATTAAGCACTCCGCCTGGGGAGTACGGCCGCAAGGTTAAAACTCAAATGAATTGACGGGGGCCCGCACAAGCGGTGGAGCATGTGGTTTAATTCGAAGCAACGCGAAGAACCTTACCAGGTCTTGACATCCTCTGACAACCCTAGAGATAGGGCGTTCCCCTTCGGGGACAGAGTGACAGGTGCTGCATGGCTGTCGTCAGCTCGTGTCGTGAGATGTTGGGTTAAGTCCCGCAACGAGCGCAACCCTTGATCTTAGTTGCCAGCATTCAGTTGGGCACTCTAAGGTGACTGCCGGTGACAAACCGGAGGAAGGTGGGGATGACGTCAAGTCATCATGGCCCTTACGACCTGGGCTACACACGTGCTACAATGGCATATACAAAGAGAAGCGACCTCGCGAGAGCAAGCGGAACTCATAAAGTATGTCGTAGTCCGGATTGGAGTCTGCAACTCGACTCCATGAAGTCGGAATCGCTAGTAATCGTAGATCAGAATGCTACGGTGAATACGTTCCCGGGCCTTGTACACACCGCCCGTCACACCATGGGAGTGGGTTGCAAAAGAAGTAGGTAGCTTAACCTTCGGGAGGGCGCTTACCACTTTGTGATTCATGACTGGGGTGAAGTCGTAACAAGGTAACCGTAGGGGAACCTGCGGTTGGATCACCTCCTT',
        length: 1540,
        taxonomy: 'k__Bacteria; p__Pseudomonadota; c__Alphaproteobacteria; o__Acetobacterales; f__Acetobacteraceae; g__Commensalibacter; s__Commensalibacter_ant_1',
        organismName: 'Commensalibacter ant-1',
        type: 'Bacteria',
        count: 45360,
        relativeAbundance: 48.00,
        confidence: 98.2,
        description: 'Bactéria acética simbionte intestinal primária que consome açúcares e secreta ácidos orgânicos protetores.'
      },
      {
        id: 'ASV_NANO_002',
        sequence: 'AGAGTTTGATCCTGGCTCAGGACGAACGCTGGCGGCGCGCCTAACACATGCAAGTCGAACGAAACTTTAGGTTGCTTGCAACCTTAAAGTGAGTGGCGAACGGGTGAGTAACACGTGGGTAACCTGCCCATAAGACTGGGATAACTCCGGGAAACCGGGGCTAATACCGGATAACATTTTGAACCGCATGGTTCGAAATTGAAAGGCGGCTTCGGCTGTCACTTATGGATGGACCCGCGTCAGATTAGCTAGTTGGTGAGGTAATGGCTCACCAAGGCGACGATCTGTAGCTGGTCTGAGAGGATGATCAGCCACACTGGGACTGAGACACGGCCCAGACTCCTACGGGAGGCAGCAGTGGGGAATATTGCACAATGGGCGAAAGCCTGATGCAGCCATGCCGCGTGTATGAAGAAGGCCTTCGGGTTGTAAAGTACTTTCAGCGGGGAGGAAGGGAGTAAAGTTAATACCTTTGCTCATTGACGTTACCCGCAGAAGAAGCACCGGCTAACTCCGTGCCAGCAGCCGCGGTAATACGGAGGGTGCAAGCGTTAATCGGAATTACTGGGCGTAAAGCGCACGCAGGCGGTTTGTTAAGTCAGATGTGAAATCCCCGGGCTCAACCTGGGAACTGCATCTGATACTGGCAAGCTTGAGTCTCGTAGAGGGGGGTAGAATTCCAGGTGTAGCGGTGAAATGCGTAGAGATCTGGAGGAATACCGGTGGCGAAGGCGGCCCCCTGGACGAAGACTGACGCTCAGGTGCGAAAGCGTGGGGAGCAAACAGGATTAGATACCCTGGTAGTCCACGCCGTAAACGATGAGTGCTAAGTGTTAGGGGGTTTCCGCCCCTTAGTGCTGCAGCTAACGCATTAAGCACTCCGCCTGGGGAGTACGGCCGCAAGGTTAAAACTCAAATGAATTGACGGGGGCCCGCACAAGCGGTGGAGCATGTGGTTTAATTCGAAGCAACGCGAAGAACCTTACCAGGTCTTGACATCCTCTGACAACCCTAGAGATAGGGCGTTCCCCTTCGGGGACAGAGTGACAGGTGCTGCATGGCTGTCGTCAGCTCGTGTCGTGAGATGTTGGGTTAAGTCCCGCAACGAGCGCAACCCTTGATCTTAGTTGCCAGCATTCAGTTGGGCACTCTAAGGTGACTGCCGGTGACAAACCGGAGGAAGGTGGGGATGACGTCAAGTCATCATGGCCCTTACGACCTGGGCTACACACGTGCTACAATGGCATATACAAAGAGAAGCGACCTCGCGAGAGCAAGCGGAACTCATAAAGTATGTCGTAGTCCGGATTGGAGTCTGCAACTCGACTCCATGAAGTCGGAATCGCTAGTAATCGTAGATCAGAATGCTACGGTGAATACGTTCCCGGGCCTTGTACACACCGCCCGTCACACCATGGGAGTGGGTTGCAAAAGAAGTAGGTAGCTTAACCTTCGGGAGGGCGCTTACCACTTTGTGATTCATGACTGGGGTGAAGTCGTAACAAGGTAACC',
        length: 1520,
        taxonomy: 'k__Bacteria; p__Bacillota; c__Bacilli; o__Lactobacillales; f__Lactobacillaceae; g__Lactobacillus; s__Lactobacillus_kunkeei',
        organismName: 'Lactobacillus kunkeei',
        type: 'Bacteria',
        count: 22680,
        relativeAbundance: 24.00,
        confidence: 98.9,
        description: 'Simbionte frutofílico adaptado à digestão de polens e exsudatos armazenados pelas formigas.'
      },
      {
        id: 'ASV_NANO_003',
        sequence: 'AGAGTTTGATCCTGGCTCAGGACGAACGCTGGCGGCGCGCCTAACACATGCAAGTCGAACGAAACTTTAGGTTGCTTGCAACCTTAAAGTGAGTGGCGAACGGGTGAGTAACACGTGGGTAACCTGCCCATAAGACTGGGATAACTCCGGGAAACCGGGGCTAATACCGGATAACATTTTGAACCGCATGGTTCGAAATTGAAAGGCGGCTTCGGCTGTCACTTATGGATGGACCCGCGTCAGATTAGCTAGTTGGTGAGGTAATGGCTCACCAAGGCGACGATCTGTAGCTGGTCTGAGAGGATGATCAGCCACACTGGGACTGAGACACGGCCCAGACTCCTACGGGAGGCAGCAGTGGGGAATATTGCACAATGGGCGAAAGCCTGATGCAGCCATGCCGCGTGTATGAAGAAGGCCTTCGGGTTGTAAAGTACTTTCAGCGGGGAGGAAGGGAGTAAAGTTAATACCTTTGCTCATTGACGTTACCCGCAGAAGAAGCACCGGCTAACTCCGTGCCAGCAGCCGCGGTAATACGGAGGGTGCAAGCGTTAATCGGAATTACTGGGCGTAAAGCGCACGCAGGCGGTTTGTTAAGTCAGATGTGAAATCCCCGGGCTCAACCTGGGAACTGCATCTGATACTGGCAAGCTTGAGTCTCGTAGAGGGGGGTAGAATTCCAGGTGTAGCGGTGAAATGCGTAGAGATCTGGAGGAATACCGGTGGCGAAGGCGGCCCCCTGGACGAAGACTGACGCTCAGGTGCGAAAGCGTGGGGAGCAAACAGGATTAGATACCCTGGTAGTCCACGCCGTAAACGATGAGTGCTAAGTGTTAGGGGGTTTCCGCCCCTTAGTGCTGCAGCTAACGCATTAAGCACTCCGCCTGGGGAGTACGGCCGCAAGGTTAAAACTCAAATGAATTGACGGGGGCCCGCACAAGCGGTGGAGCATGTGGTTTAATTCGAAGCAACGCGAAGAACCTTACCAGGTCTTGACATCCTCTGACAACCCTAGAGATAGGGCGTTCCCCTTCGGGGACAGAGTGACAGGTGCTGCATGGCTGTCGTCAGCTCGTGTCGTGAGATGTTGGGTTAAGTCCCGCAACGAGCGCAACCCTTGATCTTAGTTGCCAGCATTCAGTTGGGCACTCTAAGGTGACTGCCGGTGACAAACCGGAGGAAGGTGGGGATGACGTCAAGTCATCATGGCCCTTACGACCTGGGCTACACACGTGCTACAATGGCATATACAAAGAGAAGCGACCTCGCGAGAGCAAGCGGAACTCATAAAGTATGTCGTAGTCCGGATTGGAGTCTGCAACTCGACTCCATGAAGTCGGAATCGCTAGTAATCGTAGATCAGAATGCTACGGTGAATACGTTCCCGGGCCTTGTACACACCGCCCGTCACACCATGGGAGTGGGTTGCAAAAGAAGTAGGTAGCTTAACCTTCGGGAGGG',
        length: 1515,
        taxonomy: 'k__Bacteria; p__Bacillota; c__Bacilli; o__Lactobacillales; f__Lactobacillaceae; g__Fructobacillus; s__Fructobacillus_fructosus',
        organismName: 'Fructobacillus fructosus',
        type: 'Bacteria',
        count: 14175,
        relativeAbundance: 15.00,
        confidence: 97.6,
        description: 'Bactéria homofermentativa exigente de frutose presente no alimento ingerido pelas larvas.'
      },
      {
        id: 'ASV_NANO_004',
        sequence: 'AGAGTTTGATCCTGGCTCAGGACGAACGCTGGCGGCGCGCCTAACACATGCAAGTCGAACGAAACTTTAGGTTGCTTGCAACCTTAAAGTGAGTGGCGAACGGGTGAGTAACACGTGGGTAACCTGCCCATAAGACTGGGATAACTCCGGGAAACCGGGGCTAATACCGGATAACATTTTGAACCGCATGGTTCGAAATTGAAAGGCGGCTTCGGCTGTCACTTATGGATGGACCCGCGTCAGATTAGCTAGTTGGTGAGGTAATGGCTCACCAAGGCGACGATCTGTAGCTGGTCTGAGAGGATGATCAGCCACACTGGGACTGAGACACGGCCCAGACTCCTACGGGAGGCAGCAGTGGGGAATATTGCACAATGGGCGAAAGCCTGATGCAGCCATGCCGCGTGTATGAAGAAGGCCTTCGGGTTGTAAAGTACTTTCAGCGGGGAGGAAGGGAGTAAAGTTAATACCTTTGCTCATTGACGTTACCCGCAGAAGAAGCACCGGCTAACTCCGTGCCAGCAGCCGCGGTAATACGGAGGGTGCAAGCGTTAATCGGAATTACTGGGCGTAAAGCGCACGCAGGCGGTTTGTTAAGTCAGATGTGAAATCCCCGGGCTCAACCTGGGAACTGCATCTGATACTGGCAAGCTTGAGTCTCGTAGAGGGGGGTAGAATTCCAGGTGTAGCGGTGAAATGCGTAGAGATCTGGAGGAATACCGGTGGCGAAGGCGGCCCCCTGGACGAAGACTGACGCTCAGGTGCGAAAGCGTGGGGAGCAAACAGGATTAGATACCCTGGTAGTCCACGCCGTAAACGATGAGTGCTAAGTGTTAGGGGGTTTCCGCCCCTTAGTGCTGCAGCTAACGCATTAAGCACTCCGCCTGGGGAGTACGGCCGCAAGGTTAAAACTCAAATGAATTGACGGGGGCCCGCACAAGCGGTGGAGCATGTGGTTTAATTCGAAGCAACGCGAAGAACCTTACCAGGTCTTGACATCCTCTGACAACCCTAGAGATAGGGCGTTCCCCTTCGGGGACAGAGTGACAGGTGCTGCATGGCTGTCGTCAGCTCGTGTCGTGAGATGTTGGGTTAAGTCCCGCAACGAGCGCAACCCTTGATCTTAGTTGCCAGCATTCAGTTGGGCACTCTAAGGTGACTGCCGGTGACAAACCGGAGGAAGGTGGGGATGACGTCAAGTCATCATGGCCCTTACGACCTGGGCTACACACGTGCTACAATGGCATATACAAAGAGAAGCGACCTCGCGAGAGCAAGCGGAACTCATAAAGTATGTCGTAGTCCGGATTGGAGTCTGCAACTCGACTCCATGAAGTCGGAATCGCTAGTAATCGTAGATCAGAATGCTACGGTGAATACGTTCCCGGGCCTTGTACACACCGCCCGTCACACCATGGGAGTGGGTTGCAAAAGAAGTAGGTAGCTTAACCTTCGGGAGGGCGCTTACCACTTTGTGATTCATGACTGGGGTGAAGTCGTAACAAGGTAACCGTAGGGGAACCT',
        length: 1530,
        taxonomy: 'k__Bacteria; p__Actinomycetota; c__Actinomycetes; o__Bifidobacteriales; f__Bifidobacteriaceae; g__Bifidobacterium; s__Bifidobacterium_asteroides',
        organismName: 'Bifidobacterium asteroides',
        type: 'Bacteria',
        count: 7560,
        relativeAbundance: 8.00,
        confidence: 98.0,
        description: 'Probiótico comensal associado à proteção de mucosa epitelial larval.'
      },
      {
        id: 'ASV_NANO_005',
        sequence: 'AGAGTTTGATCCTGGCTCAGGACGAACGCTGGCGGCGCGCCTAACACATGCAAGTCGAACGAAACTTTAGGTTGCTTGCAACCTTAAAGTGAGTGGCGAACGGGTGAGTAACACGTGGGTAACCTGCCCATAAGACTGGGATAACTCCGGGAAACCGGGGCTAATACCGGATAACATTTTGAACCGCATGGTTCGAAATTGAAAGGCGGCTTCGGCTGTCACTTATGGATGGACCCGCGTCAGATTAGCTAGTTGGTGAGGTAATGGCTCACCAAGGCGACGATCTGTAGCTGGTCTGAGAGGATGATCAGCCACACTGGGACTGAGACACGGCCCAGACTCCTACGGGAGGCAGCAGTGGGGAATATTGCACAATGGGCGAAAGCCTGATGCAGCCATGCCGCGTGTATGAAGAAGGCCTTCGGGTTGTAAAGTACTTTCAGCGGGGAGGAAGGGAGTAAAGTTAATACCTTTGCTCATTGACGTTACCCGCAGAAGAAGCACCGGCTAACTCCGTGCCAGCAGCCGCGGTAATACGGAGGGTGCAAGCGTTAATCGGAATTACTGGGCGTAAAGCGCACGCAGGCGGTTTGTTAAGTCAGATGTGAAATCCCCGGGCTCAACCTGGGAACTGCATCTGATACTGGCAAGCTTGAGTCTCGTAGAGGGGGGTAGAATTCCAGGTGTAGCGGTGAAATGCGTAGAGATCTGGAGGAATACCGGTGGCGAAGGCGGCCCCCTGGACGAAGACTGACGCTCAGGTGCGAAAGCGTGGGGAGCAAACAGGATTAGATACCCTGGTAGTCCACGCCGTAAACGATGAGTGCTAAGTGTTAGGGGGTTTCCGCCCCTTAGTGCTGCAGCTAACGCATTAAGCACTCCGCCTGGGGAGTACGGCCGCAAGGTTAAAACTCAAATGAATTGACGGGGGCCCGCACAAGCGGTGGAGCATGTGGTTTAATTCGAAGCAACGCGAAGAACCTTACCAGGTCTTGACATCCTCTGACAACCCTAGAGATAGGGCGTTCCCCTTCGGGGACAGAGTGACAGGTGCTGCATGGCTGTCGTCAGCTCGTGTCGTGAGATGTTGGGTTAAGTCCCGCAACGAGCGCAACCCTTGATCTTAGTTGCCAGCATTCAGTTGGGCACTCTAAGGTGACTGCCGGTGACAAACCGGAGGAAGGTGGGGATGACGTCAAGTCATCATGGCCCTTACGACCTGGGCTACACACGTGCTACAATGGCATATACAAAGAGAAGCGACCTCGCGAGAGCAAGCGGAACTCATAAAGTATGTCGTAGTCCGGATTGGAGTCTGCAACTCGACTCCATGAAGTCGGAATCGCTAGTAATCGTAGATCAGAATGCTACGGTGAATACGTTCCCGGGCCTTGTACACACCGCCCGTCACACCATGGGAGTGGGTTGCAAAAGAAGTAGGTAGCTTAACCTTC',
        length: 1490,
        taxonomy: 'k__Bacteria; p__Mycoplasmatota; c__Molicutes; o__Entomoplasmatales; f__Spiroplasmataceae; g__Spiroplasma; s__Spiroplasma_apis',
        organismName: 'Spiroplasma apis',
        type: 'Bacteria',
        count: 4725,
        relativeAbundance: 5.00,
        confidence: 96.8,
        description: 'Endosimbionte móvel espiralado persistente em populações de formigas silvestres.'
      }
    ]
  }
];
