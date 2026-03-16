import Select from 'react-select';

const Dropdown = ({ items, selectedItem, onChange, isLoading, placeholder }) => {
  
  const options = items.map((item) => ({
    value: item.id,
    label: item.name,
  }));

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