import { useState } from "react";
import { FaCaretDown } from "react-icons/fa";

const TeaCategoryDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);

  const categories = [
    "All Tea Types",
    "Green Tea",
    "Black Tea",
    "Herbal Tea",
    "Oolong Tea",
    "White Tea",
    "Chai Tea",
    "Matcha",
  ];

  return (
    <div className="relative">
      {/* Dropdown Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center bg-gray-200 text-black px-4 py-2  rounded-l-md border border-gray-300"
      > All <FaCaretDown className="ml-2" />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <ul className="absolute left-0 top-full w-48 bg-gray-700 border border-gray-700 shadow-lg rounded-md z-50">
          {categories.map((category, index) => (
            <li
              key={index}
              className="px-4 text-black py-2 hover:bg-gray-900 rounded cursor-pointer"
              onClick={() => setIsOpen(false)}
            >
              {category}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TeaCategoryDropdown;
