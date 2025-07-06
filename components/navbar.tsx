"use client";

import React, { useState, ChangeEvent } from "react";
import { Funnel as FilterIcon, FunnelX as FilterXIcon } from "lucide-react";
import Image from "next/image";
import { Input } from "./ui/input";

interface NavBarProps {
  onNameFilterChange: (value: string) => void;
  // onTypeFilterChange: (types: string[]) => void;
  //types: string[];
}

export default function NavBar({ onNameFilterChange }: NavBarProps) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");

  const toggle = () => setOpen((v) => !v);

  const handleName = (e: ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value;
    setName(v);
    onNameFilterChange(v);
  };

  return (
    <nav className="bg-background text-foreground shadow-sm ">
      <div className="max-w-7xl mx-auto px-8 py-4 flex items-center justify-between">
        {/* Logo + Título */}
        <div className="flex items-center space-x-2">
          <Image src="/logo.svg" alt="Logo" width={32} height={32} />
          <span className="text-2xl font-bold">Pokédex</span>
        </div>
        {/* Ícone de filtro */}
        <button
          onClick={toggle}
          aria-label="Alternar filtros"
          className="p-2 rounded hover:bg-foreground/10 transition"
        >
          {open ? (
            <FilterXIcon size={24} className="text-foreground" />
          ) : (
            <FilterIcon size={24} className="text-foreground" />
          )}
        </button>
      </div>

      {/* Painel de filtros */}
      {open && (
        <div className="border-t border-foreground/20 bg-background px-8 py-4 flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-6">
          <Input
            type="text"
            placeholder="Filtrar por nome"
            value={name}
            onChange={handleName}
            className="w-full md:w-1/3 bg-background border border-foreground/30 rounded py-2 px-3 focus:outline-none"
          />
        </div>
      )}
    </nav>
  );
}
