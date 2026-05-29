"use client";

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  totalItems,
  itemsPerPage = 10,
}) {
  const pages = Array.from(
    { length: Math.min(totalPages, 5) },
    (_, i) => i + 1
  );

  const showing = totalItems
    ? `Showing ${Math.min(
        (currentPage - 1) * itemsPerPage + 1,
        totalItems
      )}–${Math.min(
        currentPage * itemsPerPage,
        totalItems
      )} of ${totalItems}`
    : null;

  return (
    <div className="flex items-center justify-between px-5 py-3 border-t border-[#D4E9F2]">
      {showing && (
        <span className="text-xs text-zinc-400">
          {showing}
        </span>
      )}

      <div className="flex items-center gap-1.5 ml-auto">
        <button
          onClick={() =>
            onPageChange(Math.max(1, currentPage - 1))
          }
          disabled={currentPage === 1}
          className="w-8 h-8 rounded-lg border border-[#D4E9F2] bg-white text-sm text-zinc-500 flex items-center justify-center hover:bg-[--soft-bg] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          ‹
        </button>

        {pages.map((p) => (
          <button
            key={p}
            onClick={() => onPageChange(p)}
            className={`w-8 h-8 rounded-lg border text-sm font-medium transition-colors ${
              p === currentPage
                ? "bg-[--primary-accent] text-white border-[--primary-accent]"
                : "border-[#D4E9F2] bg-white text-zinc-600 hover:bg-[--soft-bg]"
            }`}
          >
            {p}
          </button>
        ))}

        <button
          onClick={() =>
            onPageChange(
              Math.min(totalPages, currentPage + 1)
            )
          }
          disabled={currentPage === totalPages}
          className="w-8 h-8 rounded-lg border border-[#D4E9F2] bg-white text-sm text-zinc-500 flex items-center justify-center hover:bg-[--soft-bg] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          ›
        </button>
      </div>
    </div>
  );
}