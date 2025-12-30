import { useState, type JSX } from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { FaChevronUp } from 'react-icons/fa';
interface DropdownMenuProps {
  buttonLabel: string;
  items: {
    title: string;
    url?: string;
    icon?: JSX.Element;
    action?: () => void;
  }[];
}
export const DropdownMenu = ({ buttonLabel, items }: DropdownMenuProps) => {
  const [open, setOpen] = useState(false);
  const handleToggle = () => {
    setOpen((prev) => !prev);
  };

  const handleItemClick = (action?: () => void) => {
    if (action) action();
    setOpen(false);
  };
  return (
    <div className="relative z-50">
      <button
        type="button"
        className="bg-slate-300 w-11 h-11 rounded-full hover:bg-slate-400/30 items-center flex justify-center cursor-pointer"
        onClick={handleToggle}
      >
        {buttonLabel}
        <span className="">
          {open ? <FaChevronUp /> : <BsThreeDotsVertical />}
        </span>
      </button>
      {open && (
        <div className="absolute right-1 translate-x-1 top-12 cursor-pointer">
          <ul className="w-56 h-auto shadow-md rounded-md p-1 border border-slate-300 bg-white">
            {items.map((item, index) => (
              <li
                key={index}
                className={`relative flex items-center gap-4 px-4 py-4 text-sm hover:bg-indigo-100 rounded-md`}
                onClick={() => handleItemClick(item.action)}
              >
                {item.icon && <span>{item.icon}</span>}
                {item.title}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
