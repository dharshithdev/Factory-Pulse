function StatCard({
    title,
    value,
    subtitle,
    icon,
    iconBg = "bg-blue-500",
    iconColor = "text-white"
}) {
    return (
        <div className="group bg-[#1E293B] border border-slate-700 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:border-blue-500 hover:shadow-[0_10px_30px_rgba(37,99,235,0.25)]">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm text-slate-400 font-medium tracking-wide uppercase">
                        {title}
                    </p>
                    <h2 className="text-4xl font-bold text-white mt-3">
                        {value}
                    </h2>
                    <p className="text-sm text-slate-500 mt-3">
                        {subtitle}
                    </p>
                </div>

                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${iconBg}`}>
                    <span className={`text-3xl ${iconColor}`}>
                        {icon}
                    </span>
                </div>
            </div>
        </div>
    );
}

export default StatCard;