import React from 'react'
import type { SelectButtonProps } from '../../../types.d.ts'


const SelectImageButton: React.FC<SelectButtonProps> = ({ onClick, text }) => (
    <button
        onClick={onClick}
        className="button select-image-button"
        aria-label={text || "Select image"}
    >
        {text}
    </button>
);

export default SelectImageButton;
