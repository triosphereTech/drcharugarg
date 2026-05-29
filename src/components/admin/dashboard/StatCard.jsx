export function StatCard({ label, value, note, accentColor }) {
  return (
    <div className="bg-white border border-[#D4E9F2] rounded-2xl p-5 relative overflow-hidden">
      <div
        className="absolute top-0 right-0 w-14 h-14 rounded-bl-full opacity-[0.07]"
        style={{ background: accentColor }}
      />

      <p className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider">
        {label}
      </p>

      <p className="text-[28px] font-semibold text-[--primary-dark] mt-2 leading-none">
        {value}
      </p>

      <p
        className="text-[12px] mt-2"
        style={{ color: accentColor }}
      >
        {note}
      </p>
    </div>
  );
}