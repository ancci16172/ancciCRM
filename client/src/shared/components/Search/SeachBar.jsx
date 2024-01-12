import { FaSearch } from "react-icons/fa";

export function SearchBar({onInput,placeholder}) {
  return (
    <div className="border border-solid flex flex-1 rounded-md">
      <input type="text" placeholder={placeholder} className="w-full outline-none px-2" onInput={onInput}/>
      <div className="border border-l p-2">
        <FaSearch />
      </div>
    </div>
  );
}
