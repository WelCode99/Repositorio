import React, { useState } from 'react';
import { Search, Grid, List, Filter } from 'lucide-react';
import { MedicationGrid } from '../components/pharmacy/MedicationGrid';
import { MedicationList } from '../components/pharmacy/MedicationList';
import { FilterPanel } from '../components/pharmacy/FilterPanel';
import { SearchBar } from '../components/pharmacy/SearchBar';
import { ViewToggle } from '../components/pharmacy/ViewToggle';
import { useMediaQuery } from '../hooks/useMediaQuery';
import { cn } from '../lib/utils';

export default function PharmacologyPage() {
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const isMobile = useMediaQuery('(max-width: 768px)');

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <header className="bg-gradient-to-r from-primary/90 to-primary p-6 text-white">
        <div className="max-w-7xl mx-auto space-y-4">
          <h1 className="text-3xl font-bold">Biblioteca Farmacológica</h1>
          <p className="text-primary-foreground/90">
            Base de dados farmacológica baseada em evidências
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-col space-y-4">
          <div className="flex items-center space-x-4">
            <SearchBar
              className="flex-1"
              placeholder="Buscar por nome, categoria ou indicação..."
            />
            <ViewToggle
              view={view}
              onViewChange={setView}
              className="hidden md:flex"
            />
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
              aria-label="Toggle filters"
            >
              <Filter className="w-5 h-5" />
            </button>
          </div>

          <div className="flex gap-6">
            <FilterPanel
              isOpen={isFilterOpen}
              onClose={() => setIsFilterOpen(false)}
              className={cn(
                "transition-all duration-300",
                isMobile
                  ? "fixed inset-y-0 left-0 z-50 w-80 bg-white dark:bg-gray-800 shadow-xl"
                  : "w-64"
              )}
            />

            <div className="flex-1">
              {view === 'grid' ? (
                <MedicationGrid medications={[]} />
              ) : (
                <MedicationList medications={[]} />
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}