import { Search } from "lucide-react";
import { Input } from "./Input";

export function SearchBar() {
  return (
    <div className="relative mb-6 w-full">
    <span className="absolute left-2 top-1/2 -translate-y-1/2 rotate-90 text-gray-500/90"><Search /></span>
    <Input type="text" placeholder="Search for room" inputClassName="w-full pl-10 py-2" />
  </div>
  )
}