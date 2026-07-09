export default function DeleteModal({ onDelete, onCancel }) {
  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
      <div className="bg-white p-6 rounded-xl w-[350px]">
        <h2 className="text-xl font-bold mb-4">
          Delete Notice?
        </h2>

        <p className="mb-5">
          Are you sure you want to delete this notice?
        </p>

        <div className="flex gap-3">
          <button
            onClick={onDelete}
            className="bg-red-600 text-white px-4 py-2 rounded"
          >
            Delete
          </button>

          <button
            onClick={onCancel}
            className="bg-gray-500 text-white px-4 py-2 rounded"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}