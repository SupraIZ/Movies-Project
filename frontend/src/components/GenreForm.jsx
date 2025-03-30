/* eslint-disable react/prop-types */
const GenreForm = ({
  value,
  setValue,
  handleSubmit,
  buttonText = "Submit",
  handleDelete,
  isLoading = false, // Optional prop for loading state
}) => {
  return (
    <div className="p-3">
      <form onSubmit={handleSubmit} className="space-y-2">
        <input
          type="text"
          className="py-3 px-4 border rounded-lg w-full md:w-4/4"
          placeholder="Write genre name"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          aria-label="Genre Name"
        />

        <div className="flex justify-between">
          <button
            type="submit"
            className="bg-teal-500 text-white py-2 px-4 rounded-lg hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50"
            disabled={isLoading}
          >
            {isLoading ? "Submitting..." : buttonText}
          </button>

          {handleDelete && (
            <button
              type="button"
              onClick={handleDelete}
              className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
            >
              Delete
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default GenreForm;
