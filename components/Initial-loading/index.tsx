const InitialLoading = () => {
  return (
    <div className="flex items-center justify-center flex-col">
      <div className="flex font-bold justify-center mb-6">
        <div className="font-title text-primary inline-flex text-3xl transition-all duration-200 md:text-6xl">
          <span className="capitalize">Users Management</span>
        </div>
      </div>
      <progress className="progress w-80 progress-primary"></progress>
    </div>
  );
};
export default InitialLoading;
