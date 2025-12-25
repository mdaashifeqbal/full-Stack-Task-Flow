function NoteCard() {
  return (
    <div className="w-72 rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
      <h3 className="mb-2 text-lg font-semibold text-gray-800">Task Heading</h3>

      <p className="mb-4 text-sm text-gray-600 line-clamp-2">
        This is a dummy note content. It is intentionally written a little
        longer so that only two lines are visible inside the card layout.
      </p>

      <div className="flex items-center justify-between">
        <button className="rounded-md bg-indigo-600 px-4 py-1.5 text-sm text-white hover:bg-indigo-700 transition">
          More
        </button>

        <button className="rounded-md border border-green-600 px-4 py-1.5 text-sm text-green-600 hover:bg-green-600 hover:text-white transition">
          Mark as Complete
        </button>
      </div>
    </div>
  );
}

export default NoteCard;
