import React from 'react';

function MenuButton({ children, onClick = () => {}, enabled = false }) {
  return (
    <button
      style={{
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        height: '100%',
        cursor: 'pointer',
        marginTop: 20,
        background: 'transparent',
        borderColor: 'transparent',
      }}
      onClick={onClick}
    >
      <div
        style={{
          width: 24,
          height: 24,
          background: !enabled ? '#6E7183' : '#DDE2FF',
        }}
      />
      <div
        style={{
          fontSize: 24,
          marginLeft: 13,
          color: !enabled ? '#6E7183' : '#DDE2FF',
        }}
      >
        {children}
      </div>
    </button>
  );
}

export default MenuButton;
