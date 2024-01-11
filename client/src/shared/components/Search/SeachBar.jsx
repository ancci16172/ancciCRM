import { FaSearch } from "react-icons/fa";

export function SearchBar() {
  return (
    <div className="border border-solid flex flex-1 rounded-md">
      <input type="text" className="w-full outline-none px-2" />
      <div className="border border-l p-2">
        <FaSearch />
      </div>
    </div>
  );
}
