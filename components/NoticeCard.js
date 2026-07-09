export default function NoticeCard({ notice, onEdit, onDelete }) {
  return (
    <div className="bg-white rounded-xl shadow-md p-5">
      {notice.priority === "Urgent" && (
        <span className="bg-red-500 text-white px-3 py-1 rounded text-sm">
          Urgent
        </span>
      )}

      <h2 className="text-2xl font-bold mt-3">
        {notice.title}
      </h2>

      <p className="mt-2 text-gray-700">
        {notice.body}
      </p>

      <p className="mt-3 text-sm text-gray-500">
        Category: {notice.category}
      </p>

      <p className="text-sm text-gray-500">
        Publish Date: {notice.publishDate}
      </p>

      <div className="flex gap-3 mt-4">
        <button
          onClick={() => onEdit(notice)}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Edit
        </button>

        <button
          onClick={() => onDelete(notice)}
          className="bg-red-600 text-white px-4 py-2 rounded"
        >
          Delete
        </button>
      </div>
    </div>
  );
}