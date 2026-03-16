import React from 'react';
import Select from 'react-select';

// Recebe as props: lista original, item selecionado, função de mudança e estado de carregamento
const Dropdown = ({ items, selectedItem, onChange, isLoading, placeholder }) => {
  
  // Mapeia os itens para o formato que o react-select exige
  const options = items.map((item) => ({
    value: item.id,
    label: item.name,
  }));

  // Converte o item selecionado de volta para o formato do componente
  const currentValue = selectedItem 
    ? { value: selectedItem.id, label: selectedItem.name } 
    : null;

  return (
    <Select
      className="select-container"
      classNamePrefix="select"
      isLoading={isLoading}
      options={options}
      value={currentValue}
      onChange={(option) => {
        // Retorna o objeto original completo para o componente pai
        const originalItem = items.find(i => i.id === option?.value);
        onChange(originalItem || null);
      }}
      isSearchable
      placeholder={placeholder || "Selecione..."}
      noOptionsMessage={() => "Nenhum resultado encontrado"}
    />
  );
};

export default Dropdown;