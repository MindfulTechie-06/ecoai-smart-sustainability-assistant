export default function PageHeader({
  title,
  description,
  badge,
  badgePulse = true,
  category,
  actions,
  children,
  className = ""
}) {
  return (
    <header className={`w-full pb-6 mb-6 sm:mb-8 border-b border-[#dcece1] dark:border-[#1e382c] ${className}`}>
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
        {/* Title, Badge and Description */}
        <div className="space-y-2 max-w-3xl min-w-0">
          {(badge || category) && (
            <div className="flex flex-wrap items-center gap-2">
              {category && (
                <span className="text-[10px] uppercase font-bold tracking-wider text-[#006c49] dark:text-[#9af5c6] bg-[#e1f2e7] dark:bg-[#162d22] px-2.5 py-0.5 rounded border border-[#dcece1] dark:border-[#1e382c]">
                  {category}
                </span>
              )}
              {badge && (
                <div className="inline-flex items-center gap-1.5 bg-[#e1f2e7] dark:bg-[#162d22] px-3 py-0.5 rounded-full text-[#006c49] dark:text-[#9af5c6] text-xs font-semibold border border-[#dcece1] dark:border-[#1e382c]">
                  {badgePulse && (
                    <span className="w-2 h-2 rounded-full bg-[#006c49] dark:bg-[#9af5c6] animate-pulse shrink-0" />
                  )}
                  <span className="uppercase tracking-wider text-[11px] font-semibold">{badge}</span>
                </div>
              )}
            </div>
          )}

          {/* Heading Title */}
          <h1 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#00392b] dark:text-white tracking-tight leading-tight">
            {title}
          </h1>

          {/* Supporting Description */}
          {description && (
            <p className="text-xs sm:text-sm text-[#404944] dark:text-[#8cc2ac] leading-relaxed max-w-2xl">
              {description}
            </p>
          )}
        </div>

        {/* Action Toolbar / Controls Slot */}
        {(actions || children) && (
          <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 shrink-0 pt-1 lg:pt-0">
            {actions}
            {children}
          </div>
        )}
      </div>
    </header>
  );
}

