interface HeaderProps {
    totalCount: number;
}
export function Header({ totalCount } : HeaderProps){
    return (
        <header className="w-full bg-[#4A90E2] text-white px-4 sm:px-8 py-4 sticky top-0 z-50 shadow-md">
            <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center jsutify-between gap-3">
                <div>
                    <div className="flex items-center gap-2">
                        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">Proyecto<span className="text-[#F5C518]">Cosmos</span></h1>
                    </div>
                    <p className="text-xs sm:text-sm text-white/95 font-medium">
                        el Universo a un clic de distancia
                    </p>
                </div>
                <span className="self-start sm:self-auto rounded-full bg-white/15 px-3.5 py-1 text-xs font-semibold">
                    {totalCount === 1 ? "1 recurso visible" : `${totalCount} recursos visibles`}
                </span>
            </div>
        </header>
    )
}