import React from 'react';

type SwitchProps = {
    checked: boolean;
    onChange: () => void;
    disabled?: boolean;
};

export default function Switch({ checked, onChange, disabled = false }: SwitchProps) {
    return (
        <button
            type="button"
            role="switch"
            aria-checked={checked}
            aria-disabled={disabled}
            disabled={disabled}
            onClick={onChange}
            className={`relative inline-flex h-7 w-12 items-center rounded-full border transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6F1A28] focus-visible:ring-offset-2 ${checked ? 'bg-[#6F1A28] border-[#6F1A28]' : 'bg-gray-300 border-gray-300'} ${disabled ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'}`}
        >
            <span
                className={`inline-block h-5 w-5 rounded-full bg-white shadow-sm transition-transform duration-200 ${checked ? 'translate-x-6' : 'translate-x-1'}`}
            />
        </button>
    );
}
