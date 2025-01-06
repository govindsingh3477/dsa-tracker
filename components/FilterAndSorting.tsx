export default function FiltersAndSorting() {
  return (
    <div className="p-6 bg-gray-50 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4">Filters & Sorting</h3>
      <div className="mb-4">
        <label htmlFor="difficulty" className="block text-sm font-medium mb-1">
          Difficulty:
        </label>
        <select
          id="difficulty"
          className="w-full p-2 border rounded-md border-gray-300 focus:ring-2 focus:ring-red-500"
        >
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
        </select>
      </div>
      <div className="mb-4">
        <label htmlFor="date" className="block text-sm font-medium mb-1">
          Select Date:
        </label>
        <input
          type="date"
          id="date"
          className="w-full p-2 border rounded-md border-gray-300 focus:ring-2 focus:ring-red-500"
        />
      </div>
      <button className="w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition">
        Apply
      </button>
    </div>
  );
}
