import React from "react";

const Loading = () => {
  return (
    <div className="absolute left-0 right-0 z-[100] flex h-screen items-center justify-center bg-primary-900">
      <div className="flex flex-col items-center">
        <div className="mb-4 h-16 w-16 animate-spin rounded-full border-b-4 border-t-4 border-secondary-600 md:size-24"></div>
        <h2 className="text-2xl font-semibold text-slate-300 md:text-3xl">
          Interview IT
        </h2>
      </div>
    </div>
  );
};

export default Loading;
