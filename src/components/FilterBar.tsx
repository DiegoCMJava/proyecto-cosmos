import type { CategoryFilter } from "../types/cosmos"

interface CategoryOption {
    value: CategoryFilter;
    label: string;
}

const CATEGORY_OPTIONS: CategoryOption[] = [
    { value: "all", label: "Todos" },
    { value: "game", label: "Juegos" },
    { value: "tool", label: "Herramientas" },
];

interface FilterBarProps {
    searchQuery: string;
    onSearchChange: (value: string) => void;
    selectedCategory: CategoryFilter;
    onCategoryChange: (value: CategoryFilter) => void;
    selectedTag: string;
    onTagChange: (value: string) => void;
    avaliableTags: string[];
    onResetFilters: () => void;
}
export function FilterBar({searchQuery, onSearchChange, selectedCategory, onCategoryChange, selectedTag, onTagChange, avaliableTags, onResetFilters}: FilterBarProps){
    const hasActiveFilters = searchQuery.trim() !== "" || selectedCategory !== "all" || selectedTag !== "all";
    return (
        <section aria-label="Filtros del catálogo" className="rounded-2xl border border-[#E0E0E0] bg-white/90 backdrop-blur-sm p-4 sm:p-5 shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
                <div className="md:col-span-5">
                    <label htmlFor="name-filter" className="sr-only">
                        Buscar por nombre
                    </label>
                    <input id="name-filter"
                           type="search"
                           value={searchQuery}
                           onChange={(e) => onSearchChange(e.target.value)}
                           placeholder="Buscar por nombre o palabra clave..."
                           className="w-full rounded-xl border border-[#E0E0E0] bg-[#FAFAFA] px-4 py-2.5 text-sm text-[#2C3E50] placeholder:text-[#5A6B7C]/70 focus:border-[#4A90E2] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#4A90E2]/20" />
                </div>
                <div className="md:col-span-4 flex flex-wrap gap-2">
                    {CATEGORY_OPTIONS.map((option) => {
                        const isSelected = selectedCategory === option.value;
                        return (
                            <button 
                                key={option.value}
                                type="button"
                                onClick={() => onCategoryChange(option.value)}
                                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
                                    isSelected 
                                    ? "bg-[#4A90E2] text-white shadow-sm"
                                    : "bg-[#FAFAFA] text-[#2C3E50] border border-[#E0E0E0] hover:bg-[#E0E0E0]/50"
                                }`} 
                                >{option.label}</button>
                        );
                    })}  
                </div>
                <div className="md:col-span-3 flex items-center gap-2">
                    <label htmlFor="tag-filter" className="sr-only">
                        Filtrar por etiqueta
                    </label>
                     <select
                        id="tag-filter"
                        value={selectedTag}
                        onChange={(e) => onTagChange(e.target.value)}
                        className="w-full rounded-xl border border-[#E0E0E0] bg-[#FAFAFA] px-3.5 py-2.5 text-sm font-medium text-[#2C3E50] focus:border-[#4A90E2] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#4A90E2]/20"
                     >
                        <option value="all">Todas las etiquetas</option>
                        {avaliableTags.map((tag) => (
                            <option key={tag} value={tag}>
                                {tag}
                            </option>
                        ))}
                     </select>
                     {hasActiveFilters && (
                        <button 
                            type="button"
                            onClick={onResetFilters}
                            className="shrink-0 rounded-xl bg-[#F5C518]/35 hover:bg-[#F5C518]/55 px-3 py-2.5 text-xs font-bold text-[#2C3E50] transition cursor-pointer"
                        >Limpiar</button>
                     )}
                </div>
            </div>
        </section>
    )
}


