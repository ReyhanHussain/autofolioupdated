import React from 'react';
import { Hero } from '../components/home/Hero';
import { Features } from '../components/home/Features';

export function Home() {
  return (
    <div className="min-h-screen">
      <Hero />
      <Features />
    </div>
  );
}