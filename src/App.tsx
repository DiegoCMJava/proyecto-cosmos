import cosmosItemsRaw from "./data/cosmosItems.json";
import type { CosmosItem } from "./types/cosmos";
import { useCosmosCatalog } from "./hooks/useCosmosCatalog";
import { Header } from "./components/Header";
import { FilterBar } from "./components/FilterBar";
import { CosmosCard } from "./components/CosmoCard";
import { Pagination } from "./components/Pagination";

const cosmosItems: CosmosItem[] = cosmosItemsRaw as CosmosItem[];
const CARDS_PER_PAGE = 6;

export default function App() {

  const {
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    selectedTag,
    setSelectedTag,
    avaliableTags,
    filteredItems,
    paginatedItems,
    currentPage,
    setCurrentPage,
    totalPages,
    resetFilters,
   } = useCosmosCatalog(cosmosItems, CARDS_PER_PAGE)
  

  return (
    <div className="min-h-screen w-full flex flex-col cosmos-bg text-[#2C3E50]">
      <Header totalCount={filteredItems.length}/>
      <main className="w-full max-w-7xl mx-auto flex-1 px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        <FilterBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          selectedTag={selectedTag}
          onTagChange={setSelectedTag}
          avaliableTags={avaliableTags}
          onResetFilters={resetFilters}
         />
         {paginatedItems.length === 0 ? (
          <div className="rounded-2xl border border-[#E0E0E0] bg-white p-8 text-center space-y-3 shadow-sm">
          <p className="">No se encontraron resultados con los filtros seleccionados.</p>
          <button type="button" className="rounded-xl bg-[#4A90E2] hover:bg-[#357ABD] px-4 py-2 text-xs sm:text-sm font-bold text-white transition cursor-pointer">Mostrar todos los recursos</button>
        </div>
         ) : (
          <section aria-label="Catálogo general" className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {paginatedItems.map((item) => (
              <CosmosCard
              key={item.id}
              item={item}
              onSelectTag={(tag) => setSelectedTag(tag)} />
            ))}
          </section>
         )}
        <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage} />
      </main>
      <footer className="w-full bg-[#4A90E2] text-white py-5 px-6 mt-auto text-center text-xs shadow-inner" >
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-2">
          <p className="font-medium">© 2026 ProyectoCosmos</p>
        </div>
      </footer>
    </div>
  )
}


