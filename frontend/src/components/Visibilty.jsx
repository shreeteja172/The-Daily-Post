import { useState } from "react";
import { ChevronDown } from "lucide-react";

const VisibilityDropdown = ({ visibility, setVisibility }) => {
  const [isOpen, setIsOpen] = useState(false);

  const options = [
    { label: "Public", value: "public" },
    { label: "Private", value: "private" },
  ];

  const selectedLabel = options.find((opt) => opt.value === visibility)?.label ?? "Select";

  return (
    <div className="relative inline-block text-left">
      <label className="block mb-1 text-emerald-300 text-sm font-medium">
        Visibility
      </label>

      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center justify-between w-48 px-4 py-2 bg-black/40 border border-emerald-500/30 text-white rounded-lg shadow-sm hover:bg-emerald-500/10 transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500"
      >
        <span>{selectedLabel}</span>
        <ChevronDown className={`w-4 h-4 ml-2 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <div
          className="absolute z-10 mt-2 w-48 bg-black/90 border border-emerald-500/20 rounded-md shadow-lg backdrop-blur-sm"
        >
          {options.map((option) => (
            <button
              key={option.value}
              onClick={() => {
                setVisibility(option.value);
                setIsOpen(false);
              }}
              className={`w-full text-left px-4 py-2 text-sm text-emerald-300 hover:bg-emerald-500/20 transition-all ${
                visibility === option.value ? "bg-emerald-500/10" : ""
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default VisibilityDropdown;