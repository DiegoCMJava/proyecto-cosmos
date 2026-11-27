import { useState } from "react";
import type { CosmosCategory, CosmosItem } from "../types/cosmos";

const FALLBACK_IMAGE = "https://i.ibb.co/CxDkXM7/logo-proximamente.png";

const CATEGORY_BADGES: Record< CosmosCategory, { label: string; classes: string } > = {
    game: { label: "Juego", classes: "bg-[#F5C518] text-[#2C3E50]" },
    tool: { label: "Herramienta", classes: "bg-[#50E3C2] text-[#2C3E50]"},
};

const METADATA_LABELS: Record<string, string> = {
    agency: "Agencia",
    topic: "Temática",
    accessType: "Acceso",
    status: "Estado",
    platform: "Plataforma",
};

interface CosmosCardProps {
    item: CosmosItem;
    onSelectTag?: (tag: string) => void;
}

export function CosmosCard({ item, onSelectTag }: CosmosCardProps){
    const [imgError, setImgError] = useState<boolean>(false);

    const isUpcoming = 
        !item.url || item.url === "#" || item.title.toLowerCase().includes("próximamente") || item.metadata?.status?.toLowerCase() === "próximamente";

    const imageUrl = !imgError && item.imgurl ? item.imgurl : FALLBACK_IMAGE;
    const badge = CATEGORY_BADGES[item.category] ?? { label: item.category, classes: "bg-[#4A90E2] text-white", };
    
    const metadataEntries = Object.entries(item.metadata ?? {});
    const tags = Array.isArray(item.tags) ? item.tags : [];

    return (
        <article className="rounded-2xl border border-[#E0E0E0] bg-[#FAFAFA] hover:bg-white shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden flex flex-col sm:flex-row group">
            <div className="w-full sm:w-40 md:w-44 h-44 sm:h-auto shrink-0 relative overflow-hidden bg-[#E0E0E0]/40 border-b sm:border-b-0 sm:border-r border-[#E0E0E0]">
                <img
                    src={imageUrl}
                    alt={item.title}
                    loading="lazy" 
                    onError={() => setImgError(true)}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"/>
                    <span className={`absolute top-2.5 rounded-md px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wide shadow-sm ${badge.classes}`}>
                        {badge.label}</span>
            </div>
            <div className="flex flex-col justify-between p-4 flex-1 min-w-0 gap-3">
                <div className="space-y-1.5">
                    <h2 
                        title={item.title}
                        className="text-base font-bold text-[#2C3E50] group-hover:text-[#4A90E2] transition-colors truncate"
                        >{item.title}</h2>
                    <p 
                        title={item.description}
                        className="text-xs text-[#5A6B7C] line-clamp-2 leading-relaxed">
                        {item.description}
                    </p>
                    {metadataEntries.length > 0 && (
                        <dl className="grid grid-cols-2 gap-x-3 gap-y-1 pt-1.5 text-[11px]">
                            {metadataEntries.map(([key, value]) => (
                            <div
                                key={key}
                                className="flex items-center justify-between gap-1.5 border-b border-[#E0E0E0E0]/70 pb-0.5 min-w-0"
                                >
                                    <dt className="text-[#5A6B7C] truncate">
                                        {METADATA_LABELS[key] ?? key}
                                    </dt>
                                    <dd className="font-semibold text-[#2C3E50] truncate">
                                        {String(value)}
                                    </dd>
                            </div>
                            ))}
                        </dl>
                    )}  
                </div>
                <div className="flex items-center justify-between gap-2 pt-2.5 border-t border-[#E0E0E0]">
                    <div className="flex flex-wrap gap-1.5 min-w-0">
                        {tags.map((tag) => (
                            <button
                                key={tag}
                                type="button"
                                onClick={() => onSelectTag?.(tag)}
                                className="rounded-md bg-[#50E3C2]/25 hover:bg-[#50E3C2]/45 px-2 py-0.5 text-[10px] font-bold text-[#2C3E50] transition cursor-pointer"    
                                    >
                                    #{tag}
                                </button>
                        ))}
                    </div>
                    {isUpcoming ? (
                        <span className="shrink-0 inline-flex items-center rounded-lg border border-[#B0BEC5] bg-[#E0E0E0] px-3 py-1.5 text-[11px] font-semibold text-[#5A6B7C] cursor-not-allowed">
                            En desarrollo</span>
                    ) : (
                        <a
                            href={item.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="shrink-0 inline-flex items-center gap-1.5 rounded-lg bg-[#FF6F61] hover:bg-[#e85d50] px-3.5 py-1.5 text-xs font-bold text-white shadow-sm transition-colors">
                            <span>Explorar</span>
                        </a>
                    )}
                </div>
            </div>
        </article>
    );
}