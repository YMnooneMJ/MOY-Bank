import { useTheme } from "../context/ThemeContext";
import { FaCheckCircle } from "react-icons/fa";

const themes = [
  { label: "Light Mode", value: "light" },
  { label: "Dark Mode", value: "dark" },
  { label: "System Default", value: "system", description: "This will use your device settings" },
];

const ThemeSelector = () => {
  const { theme, setTheme } = useTheme();

  return (
      <div className="max-w-lg mx-auto space-y-4">
      <h2 className="text-2xl font-bold mb-4 text-center text-gray-900 dark:text-white">
        Themes
      </h2>
      {themes.map(({ label, value, description }) => {
        const isSelected = theme === value;
        return (
          <button
            key={value}
            onClick={() => setTheme(value)}
            className={`w-full text-left px-3 py-4 rounded-xl border-2 transition-all relative
              ${
                isSelected
                  ? "border-green-400 bg-gray-100 dark:bg-black"
                  : "border-transparent bg-gray-200 dark:bg-[#1b1b1b]"
              }
              text-gray-900 dark:text-white`}
          >
            <div className="flex justify-between items-center">
              <div>
                <p className="font-semibold">{label}</p>
                {description && (
                  <p className="text-sm mt-1 text-gray-600 dark:text-gray-400">
                    {description}
                  </p>
                )}
              </div>
              {isSelected && (
                <FaCheckCircle className="text-green-400 text-xl" />
              )}
            </div>
          </button>
        );
      })}
    </div>
  );
};

export default ThemeSelector;
