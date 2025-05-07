import React from 'react';

const LinkForm = () => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
      <input
        type="text"
        placeholder="Вметни го линкот"
        style={{
          borderRadius: '24px',
          border: 'none',
          padding: '16px',
          width: '400px',
          fontSize: '16px',
          textAlign: 'center',
          outline: 'none',
        }}
      />
      <button
        style={{
          borderRadius: '24px',
          background: '#4de1c1',
          color: '#222',
          border: 'none',
          padding: '12px 32px',
          fontWeight: 'bold',
          fontSize: '16px',
          cursor: 'pointer',
        }}
      >
        Скенирај
      </button>
    </div>
  );
};

export default LinkForm;
