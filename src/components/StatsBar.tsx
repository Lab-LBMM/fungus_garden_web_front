import React from 'react';
import { Microscope, Bug, Dna, Activity, BookOpen, BarChart3, Binary, Sparkles } from 'lucide-react';
import { stats } from '../data/organisms';
import type { Stat } from '../types';
import './StatsBar.css';

const statIconsMap: Record<string, React.ReactElement> = {
  microbe: <Microscope size={20} />,
  fungi: <Activity size={20} />,
  bacteria: <Binary size={20} />,
  ant: <Bug size={20} />,
  dna: <Dna size={20} />,
  chart: <BarChart3 size={20} />,
  book: <BookOpen size={20} />,
};

const fallbackIconsList: React.ReactElement[] = [
  <Microscope size={20} key="1" />,
  <Activity size={20} key="2" />,
  <Binary size={20} key="3" />,
  <Bug size={20} key="4" />,
  <Dna size={20} key="5" />,
  <BarChart3 size={20} key="6" />,
  <BookOpen size={20} key="7" />,
  <Sparkles size={20} key="8" />,
];

const getStatIcon = (stat: Stat, index: number): React.ReactElement => {
  if (stat.icon && statIconsMap[stat.icon.toLowerCase()]) {
    return statIconsMap[stat.icon.toLowerCase()];
  }

  const labelLower = stat.label.toLowerCase();
  if (labelLower.includes('fungo')) return <Activity size={20} />;
  if (labelLower.includes('bactéria') || labelLower.includes('bacteria')) return <Binary size={20} />;
  if (labelLower.includes('formiga')) return <Bug size={20} />;
  if (labelLower.includes('dna') || labelLower.includes('genoma')) return <Dna size={20} />;
  if (labelLower.includes('referência') || labelLower.includes('livro') || labelLower.includes('artigo')) return <BookOpen size={20} />;
  if (labelLower.includes('média') || labelLower.includes('tamanho') || labelLower.includes('gráfico')) return <BarChart3 size={20} />;
  if (labelLower.includes('organismo') || labelLower.includes('catalogado')) return <Microscope size={20} />;

  return fallbackIconsList[index % fallbackIconsList.length];
};

const StatsBar = () => {
  return (
    <section className="stats">
      <div className="stats__inner">
        {stats.map((stat, i) => (
          <div className="stats__item" key={i}>
            <div className="stats__icon">{getStatIcon(stat, i)}</div>
            <span className="stats__value">{stat.value}</span>
            <span className="stats__label">{stat.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default StatsBar;
