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
          <label className="block text-sm font-medium mb-1">Status:</label>
          <div>
            <label className="flex items-center mb-2">
              <input
                type="checkbox"
                className="mr-2"
              />
              Completed
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                className="mr-2"
              />
              Pending
            </label>
          </div>
        </div>
        <button className="w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition">
          Apply
        </button>
      </div>
    );
  }
  