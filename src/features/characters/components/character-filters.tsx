"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useState, useTransition, useRef, useEffect } from "react";

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
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const debouncedFilterChange = (value: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      startTransition(() => {
        onFilterChange(value);
      });
    }, 500);
  };

  const cancelDebouncedCalls = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      cancelDebouncedCalls();
    };
  }, []);

  const handleSearch = (value: string) => {
    setSearchValue(value);
    debouncedFilterChange(value);
  };

  const handleQuickFilter = (name: string) => {
    setSearchValue(name);
    cancelDebouncedCalls();
    startTransition(() => {
      onFilterChange(name);
    });
  };

  const handleClearFilters = () => {
    setSearchValue("");
    cancelDebouncedCalls();
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
