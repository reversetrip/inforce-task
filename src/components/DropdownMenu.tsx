import React, { useState, useEffect } from 'react';
import './styles/dropdownMenu.scss';

type DropdownProps = {
  modes: string[];
  onMenuOption: (mode: string) => void;
};

export function DropdownMenu({ modes, onMenuOption }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedMode, setSelectedMode] = useState('');

  const closeOnOutsideClick = () => setIsOpen(false);

  useEffect(() => {
    document.body.addEventListener('click', closeOnOutsideClick);
    return function cleanup() {
      document.body.removeEventListener('click', closeOnOutsideClick);
    }
  }, []);

  function handleDropdownClick(e: React.MouseEvent) {
    setIsOpen(!isOpen);
    e.stopPropagation();
  }

  function handleOptionClick(mode: string) {
    setSelectedMode(mode);
    onMenuOption(mode);
    setIsOpen(!isOpen);
  };

  return (
    <div className='dropdownMenu'>
      <button className='dropdownMenu__toggle' onClick={handleDropdownClick}>
        {selectedMode || 'Sort mode'}
      </button>
      {isOpen && (
        <ul className='dropdownMenu__options'>
          {modes.map((mode) => (
            <li key={mode} onClick={() => handleOptionClick(mode)}>
              {mode}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
