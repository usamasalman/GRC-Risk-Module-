import { Likelihood, Impact, Risk } from '../types';

export function getRiskScore(likelihood: Likelihood | number, impact: Impact | number): number {
  return likelihood * impact;
}

export function getRiskLevel(score: number): 'Low' | 'Moderate' | 'High' | 'Very High' {
  if (score <= 4) return 'Low';
  if (score <= 9) return 'Moderate';
  if (score <= 15) return 'High';
  return 'Very High';
}

export function getRiskColor(level: 'Low' | 'Moderate' | 'High' | 'Very High'): string {
  switch (level) {
    case 'Low': return 'bg-green-500';
    case 'Moderate': return 'bg-yellow-400';
    case 'High': return 'bg-orange-500';
    case 'Very High': return 'bg-red-600';
  }
}

export function getRiskTextColor(level: 'Low' | 'Moderate' | 'High' | 'Very High'): string {
  switch (level) {
    case 'Low': return 'text-green-700 bg-green-100';
    case 'Moderate': return 'text-yellow-800 bg-yellow-100';
    case 'High': return 'text-orange-800 bg-orange-100';
    case 'Very High': return 'text-red-800 bg-red-100';
  }
}
