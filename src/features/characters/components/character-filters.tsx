"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useState, useTransition } from "react";

interface CharacterFiltersProps {
  onFilterChange: (name: string) => void;
  defaultValue?: string;
}

const POPULAR_CHARACTERS = [
  { name: "Rick", label: "Rick" },
  { name: "Morty", label: "Morty" },
  { name: "Summer", label: "Summer" },
];

export function CharacterFilters({
  onFilterChange,
  defaultValue = "",
}: CharacterFiltersProps) {
  const [searchValue, setSearchValue] = useState(defaultValue);
  const [isPending, startTransition] = useTransition();

  const handleSearch = (value: string) => {
    setSearchValue(value);
    startTransition(() => {
      onFilterChange(value);
    });
  };

  const handleQuickFilter = (name: string) => {
    setSearchValue(name);
    startTransition(() => {
      onFilterChange(name);
    });
  };

  const handleClearFilters = () => {
    setSearchValue("");
    startTransition(() => {
      onFilterChange("");
    });
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search characters..."
            value={searchValue}
            onChange={(e) => handleSearch(e.target.value)}
            className="pl-9"
            disabled={isPending}
          />
        </div>
        <div className="flex flex-wrap gap-2">
          <span className="text-sm text-muted-foreground self-center mr-2">
            Popular:
          </span>
          {POPULAR_CHARACTERS.map((char) => (
            <Button
              key={char.name}
              variant={searchValue === char.name ? "default" : "outline"}
              size="sm"
              onClick={() => handleQuickFilter(char.name)}
              disabled={isPending}
            >
              {char.label}
            </Button>
          ))}
          {searchValue && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClearFilters}
              disabled={isPending}
            >
              Clear
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
