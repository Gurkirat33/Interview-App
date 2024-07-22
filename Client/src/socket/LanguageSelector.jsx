const LanguageSelector = ({ currentLanguage, onlanguageChange }) => {
  const languages = {
    javascript: "18.15.0",
    typescript: "5.0.3",
    python: "3.10.0",
    java: "15.0.2",
    csharp: "6.12.0",
    php: "8.2.3",
  };

  const demo = Object.entries(languages);
  return (
    <div className="flex gap-4">
      {demo.map(([language, version]) => (
        <button
          key={language}
          className={`border-2 border-black p-1 ${currentLanguage === language ? "bg-black text-white" : ""}`}
          onClick={() => onlanguageChange(language)}
        >
          {language} <span>{version}</span>
        </button>
      ))}
    </div>
  );
};

export default LanguageSelector;
