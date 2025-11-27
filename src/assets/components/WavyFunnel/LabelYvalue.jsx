import React from 'react';

export const LabelYValue = ({ data, setData }) => {
  // Permite editar label y value de cada elemento del array data
  const handleChange = (idx, field, value) => {
    const newData = data.map((item, i) =>
      i === idx
        ? { ...item, [field]: field === 'value' ? Number(value) : value }
        : item,
    );
    setData(newData);
  };

  return (
    <div style={{ marginBottom: 16 }}>
      {data.map((item, idx) => (
        <div
          key={idx}
          style={{
            display: 'flex',
            gap: 8,
            alignItems: 'center',
            marginBottom: 4,
          }}
        >
          <input
            type="text"
            value={item.label}
            onChange={(e) => handleChange(idx, 'label', e.target.value)}
            placeholder="Label"
            style={{ width: 100 }}
          />
          <input
            type="number"
            value={item.value}
            onChange={(e) => handleChange(idx, 'value', e.target.value)}
            placeholder="Value"
            style={{ width: 80 }}
          />
        </div>
      ))}
    </div>
  );
};

export default LabelYValue;
