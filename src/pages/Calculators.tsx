import React, { useState } from 'react';
import { CalculatorGrid } from '../components/calculators/CalculatorGrid';
import { SpecialtyTabs } from '../components/calculators/SpecialtyTabs';
import { GlobalSearch } from '../components/search/GlobalSearch';
import { medicalCalculators } from '../data/calculators';
import { specialties } from '../data/specialties';
import { MedicalCalculator } from '../types/calculator';

export default function Calculators() {
  const [selectedSpecialty, setSelectedSpecialty] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCalculators = medicalCalculators.filter(calc => {
    const matchesSpecialty = !selectedSpecialty || calc.category === selectedSpecialty;
    const matchesSearch = !searchQuery || 
      calc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      calc.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSpecialty && matchesSearch;
  });

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setSelectedSpecialty(null);
  };

  return (
    <div className="space-y-8">
      <div className="text-center max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Calculadoras Médicas
        </h1>
        <p className="text-lg text-gray-600">
          Acesse calculadoras e scores validados para suporte à decisão clínica
        </p>
      </div>

      <div className="mb-8">
        <GlobalSearch onSearch={handleSearch} />
      </div>

      <SpecialtyTabs
        specialties={specialties}
        selectedSpecialty={selectedSpecialty}
        onSelect={setSelectedSpecialty}
      />

      <CalculatorGrid 
        calculators={filteredCalculators}
        specialty={selectedSpecialty}
      />
    </div>
  );
}