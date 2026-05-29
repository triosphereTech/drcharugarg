export function Topbar({ title, subtitle, actions }) {
  return (
    <header className="bg-white border-b border-[#D4E9F2] px-7 py-4 flex items-center justify-between flex-shrink-0">
      <div>
        <h1 className="text-[18px] font-semibold text-[--primary-dark]">
          {title}
        </h1>

        {subtitle && (
          <p className="text-[13px] text-zinc-400 mt-0.5">
            {subtitle}
          </p>
        )}
      </div>

      {actions && (
        <div className="flex items-center gap-2.5">
          {actions}
        </div>
      )}
    </header>
  );
}