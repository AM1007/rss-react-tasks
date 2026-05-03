function Loader() {
  return (
    <div className="flex items-center justify-center gap-3 py-8" role="status" aria-live="polite">
      <span className="h-6 w-6 animate-spin rounded-full border-2 border-slate-300 border-t-slate-700" />
      <span className="text-slate-600">Loading...</span>
    </div>
  );
}

export default Loader;
