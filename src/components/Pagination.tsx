interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}
export function Pagination({
    currentPage,
    totalPages,
    onPageChange,
} : PaginationProps){
    if (totalPages <= 1) return;

    const pages = Array.from( {length: totalPages}, (_, index) => index + 1);
    return (
        <nav aria-label="Paginación de tarjetas" className="flex flex-wrap items-center justify-center gap-2 pt-2">
            <button
                type="button"
                disabled={currentPage <= 1}
                onClick={() => onPageChange(currentPage - 1)}
                className="rounded-xl bg-[#4A90E2] px-4 py-2 text-xs sm:text-sm font-bold text-white disabled:opacity-40 disabled:cursor-not-allowed transition cursor-pointer "
                >Anterior</button>
            {pages.map((page) => {
                const isCurrent = page === currentPage;
                return (
                    <button
                        key={page}
                        type="button"
                        onClick={() => onPageChange(page)}
                        aria-current={isCurrent ? "page" : undefined}
                        className={`h-9 w-9 rounded-xl text-xs sm:text-sm font-bold transition cursor-pointer ${
                            isCurrent 
                            ? "bg-[#F5C518] text-[#2C3E50] shadow-sm"
                            : "border border-[#E0E0E0] bg-white text-[#2C3E50] hover:bg-[#E0E0E0]/40"
                        }`}

                    >{page}</button>
                )
            })} 
            <button
             type="button"
             disabled={currentPage >= totalPages}
             onClick={() => onPageChange(currentPage + 1)}
             className="rounded-xl bg-[#4A90E2] hover:bg-[#357ABD] px-4 py-2 text-xs sm:text-sm font-bold text-white disabled:opacity-40 disabled:cursor-not-allowed transition cursor-pointer"
             >Siguiente</button>
        </nav>
    )
}