import { useEffect, useMemo, useState } from "react";
import type { CatalogHookResult, CategoryFilter, CosmosItem } from "../types/cosmos";

function normalizeText(text: string) : string {
    return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

export function useCosmosCatalog( items: CosmosItem[], pageSize: number = 6 ) : CatalogHookResult {
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>("all");
    const [selectedTag, setSelectedTag] = useState<string>("all");
    const [currentPage, setCurrentPage] = useState<number>(1);

    const avaliableTags = useMemo(()=> {
        const uniqueTags = new Set<string>(items.flatMap((item) => (Array.isArray(item.tags) ? item.tags : []))
                                                 .filter((tag): tag is string => Boolean(tag))
                                          );
              return Array.from(uniqueTags).sort((a, b) => a.localeCompare(b, "es"));                            
    }, [items]);

    const filteredItems = useMemo(() => {
       const normalizedQuery = normalizeText(searchQuery);
       
       return items.filter((item) => {
        const matchesCategory = selectedCategory === "all" || item.category === selectedCategory;
        if (!matchesCategory) return false;

        const itemTags = Array.isArray(item.tags) ? item.tags : [];
        const matchesTag = selectedTag === "all" || itemTags.includes(selectedTag);
        if(!matchesTag) return false;

        if(!normalizedQuery) return true;

        const normalizedTitle = normalizeText(item.title ?? "");
        const normalizedDescription = normalizeText(item.description ?? "");
        const normalizadTags = itemTags.map(normalizeText).join(" ");
        const normalizedMetadata = Object.values(item.metadata ?? {})
        .filter((val): val is string => typeof val === "string")
        .map(normalizeText)
        .join(" ")
    

        return  (
            normalizedTitle.includes(normalizedQuery) ||
            normalizedDescription.includes(normalizedQuery) ||
            normalizadTags.includes(normalizedQuery) ||
            normalizedMetadata.includes(normalizedQuery)
        );

       });
    }, [items, searchQuery, selectedCategory, selectedTag]);

    useEffect(() => {
        setCurrentPage(1);
    }, [searchQuery, selectedCategory, selectedTag]);

    const totalPages = Math.max(1, Math.ceil(filteredItems.length / pageSize));
    const safePage = Math.min(currentPage, totalPages);

    const paginatedItems = useMemo(() => {
        const startIndex = (safePage - 1) * pageSize;
        return filteredItems.slice(startIndex, startIndex + pageSize);
    }, [filteredItems, safePage, pageSize]);

    const resetFilters = () => {
        setSearchQuery("");
        setSelectedCategory("all");
        setSelectedTag("all");
    };

    return {
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        selectedTag,
        setSelectedTag,
        avaliableTags,
        filteredItems,
        paginatedItems,
        currentPage: safePage,
        setCurrentPage,
        totalPages,
        resetFilters,
    };

} 