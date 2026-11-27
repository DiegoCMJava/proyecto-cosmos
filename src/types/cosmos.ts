export type CosmosCategory = "game" | "tool";

export type CategoryFilter = "all" | CosmosCategory;

export interface CosmosMetadata {
    agency?: string;
    topic?: string;
    accessType?: string;
    status?: string;
    platform?: string;
    [key: string]: string | undefined;
}

export interface CosmosItem {
    id: string;
    title: string;
    description: string;
    url: string;
    imgurl: string;
    category: CosmosCategory;
    tags: string[];
    metadata?: CosmosMetadata;
}

export interface CatalogHookResult {
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    selectedCategory: CategoryFilter;
    setSelectedCategory: (category: CategoryFilter) => void;
    selectedTag: string;
    setSelectedTag: (tag: string) => void;
    avaliableTags: string[];
    filteredItems: CosmosItem[];
    paginatedItems: CosmosItem[];
    currentPage : number;
    setCurrentPage: (page: number) => void;
    totalPages: number;
    resetFilters: () => void;   
}