type ProgressBarProps = {
    value: number; // Current progress value
    max: number;   // Maximum progress value
    showLabel?: boolean; // Whether to show percentage label
    color?: string; // Bar color
};

const ProgressBar = ({
    value,
    max,
    showLabel = false,
    color = "bg-blue-500",
}: ProgressBarProps) => {
    const percentage = Math.min((value / max) * 100, 100);

    return (
        <div className="w-full bg-gray-200 rounded h-4">
            <div
                className={`h-4 rounded ${color}`}
                style={{ width: `${percentage}%` }}
            ></div>
            {showLabel && (
                <span className="text-sm text-gray-700 ml-2">{percentage.toFixed(1)}%</span>
            )}
        </div>
    );
};

export default ProgressBar;
