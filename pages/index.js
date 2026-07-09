import { useState, useEffect } from "react";
import NoticeCard from "../components/NoticeCard";
import NoticeForm from "../components/NoticeForm";
import DeleteModal from "../components/DeleteModal";

const defaultNotices = [
  {
    id: 1,
    title: "Mid Semester Exam",
    body: "Mid semester exam starts from 15th July.",
    category: "Exam",
    priority: "Urgent",
    publishDate: "2026-07-15",
    image: "",
  },
  {
    id: 2,
    title: "Tech Event",
    body: "Annual coding competition this Saturday.",
    category: "Event",
    priority: "Normal",
    publishDate: "2026-07-12",
    image: "",
  },
];

export default function Home() {
  const [notices, setNotices] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [showForm, setShowForm] = useState(false);
  const [editingNotice, setEditingNotice] = useState(null);
  const [showDelete, setShowDelete] = useState(false);
  const [selectedNotice, setSelectedNotice] = useState(null);

  useEffect(() => {
  fetch("/api/notices")
    .then((res) => res.json())
    .then((data) => setNotices(data))
    .catch((err) => console.log(err));
}, []);


  const handleSave = (notice) => {
    if (editingNotice) {
      setNotices((prev) =>
        prev.map((item) => (item.id === notice.id ? notice : item))
      );
      setEditingNotice(null);
    } else {
      setNotices((prev) => [{ ...notice, id: Date.now() }, ...prev]);
    }

    setShowForm(false);
  };

  const handleEdit = (notice) => {
    setEditingNotice(notice);
    setShowForm(true);
  };

  const handleDelete = (notice) => {
    setSelectedNotice(notice);
    setShowDelete(true);
  };

  const confirmDelete = () => {
    setNotices((prev) =>
      prev.filter((item) => item.id !== selectedNotice.id)
    );

    setShowDelete(false);
  };

 const filteredNotices = notices
  .filter((notice) => {
    const matchesSearch =
      notice.title.toLowerCase().includes(search.toLowerCase()) ||
      notice.body.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      category === "All" || notice.category === category;

    return matchesSearch && matchesCategory;
  })
  .sort((a, b) => {
    if (a.priority === "Urgent" && b.priority !== "Urgent") return -1;
    if (a.priority !== "Urgent" && b.priority === "Urgent") return 1;
    return 0;
  });

  return (
    <div className="min-h-screen bg-gray-100">

      <header className="bg-blue-600 text-white p-5">
        <div className="max-w-6xl mx-auto flex justify-between items-center">

          <h1 className="text-3xl font-bold">
            Notice Board
          </h1>

          <button
            onClick={() => {
              setEditingNotice(null);
              setShowForm(true);
            }}
            className="bg-white text-blue-600 px-5 py-2 rounded-lg font-semibold"
          >
            + Add Notice
          </button>

        </div>
      </header>

      {/* Search Bar */}

      <div className="max-w-6xl mx-auto px-6 pt-6">
        <input
          type="text"
          placeholder="🔍 Search notices..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-96 border border-gray-300 rounded-lg px-4 py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Category Filter*/}
      <div className="mt-4">
      <select
    value={category}
    onChange={(e) => setCategory(e.target.value)}
    className="w-full md:w-60 border border-gray-300 rounded-lg px-4 py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
  >
    <option value="All">All Categories</option>
    <option value="Exam">Exam</option>
    <option value="Event">Event</option>
    <option value="General">General</option>
  </select>
</div>
      

      {/* Notice Cards */}

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">

        {filteredNotices.length > 0 ? (
          filteredNotices.map((notice) => (
            <NoticeCard
              key={notice.id}
              notice={notice}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))
        ) : (
          <div className="col-span-3 text-center text-gray-500 text-xl py-10">
            No Notice Found
          </div>
        )}

      </div>

      {showForm && (
        <NoticeForm
          notice={editingNotice}
          onSave={handleSave}
          onClose={() => {
            setEditingNotice(null);
            setShowForm(false);
          }}
        />
      )}

      {showDelete && (
        <DeleteModal
          onCancel={() => setShowDelete(false)}
          onDelete={confirmDelete}
        />
      )}

    </div>
  );
}