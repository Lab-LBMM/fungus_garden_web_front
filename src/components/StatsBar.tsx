import React from 'react';
import { stats } from '../data/organisms';
import './StatsBar.css';

const iconMap: Record<string, string> = {
  '🦠': 'M',
  '🍄': 'F',
  '🔬': 'B',
  '🧬': 'G',
  '📊': '~',
  '📚': 'R',
};

const svgIcons: { [key: number]: React.ReactElement } = {
  0: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <circle cx="12" cy="12" r="3"/><circle cx="12" cy="12" r="8" strokeDasharray="2 3"/>
      <line x1="12" y1="4" x2="12" y2="2"/><line x1="12" y1="22" x2="12" y2="20"/>
    </svg>
  ),
  1: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M12 2C8 2 5 6 5 10c0 5 4 8 7 12 3-4 7-7 7-12 0-4-3-8-7-8z"/>
    </svg>
  ),
  2: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="2" y="8" width="20" height="8" rx="4"/>
      <circle cx="6" cy="12" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="18" cy="12" r="2"/>
    </svg>
  ),
  3: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M8 3l8 0M10 3c0 9 4 14 4 14M14 3c0 9-4 14-4 14"/>
    </svg>
  ),
  4: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
    </svg>
  ),
  5: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M4 19.5A2.5 2.5 0 016.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/>
    </svg>
  ),
};

const StatsBar = () => {
  return (
    <section className="stats">
      <div className="stats__inner">
        {stats.map((stat, i) => (
          <div className="stats__item" key={i}>
            <div className="stats__icon">{svgIcons[i] ?? iconMap[stat.icon]}</div>
            <span className="stats__value">{stat.value}</span>
            <span className="stats__label">{stat.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default StatsBar;
