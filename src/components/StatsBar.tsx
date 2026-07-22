import React from 'react';
import { Microscope, Bug, Dna, Activity, BookOpen, BarChart3, Binary } from 'lucide-react';
import { stats } from '../data/organisms';
import './StatsBar.css';

const statIcons: Record<string, React.ReactElement> = {
  microbe: <Microscope size={20} />,
  fungi: <Activity size={20} />,
  bacteria: <Binary size={20} />,
  ant: <Bug size={20} />,
  dna: <Dna size={20} />,
  chart: <BarChart3 size={20} />,
  book: <BookOpen size={20} />,
};

const StatsBar = () => {
  return (
    <section className="stats">
      <div className="stats__inner">
        {stats.map((stat, i) => (
          <div className="stats__item" key={i}>
            <div className="stats__icon">{statIcons[stat.icon] || <Microscope size={20} />}</div>
            <span className="stats__value">{stat.value}</span>
            <span className="stats__label">{stat.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default StatsBar;
