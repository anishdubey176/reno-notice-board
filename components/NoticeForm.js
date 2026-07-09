import { useState } from "react";

export default function NoticeForm({ notice, onSave, onClose }) {
  const [form, setForm] = useState(
    notice || {
      title: "",
      body: "",
      category: "General",
      priority: "Normal",
      publishDate: "",
      image: "",
    }
  );

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white text-black p-6 rounded-xl w-[420px] shadow-xl space-y-4"
      >
        <h2 className="text-3xl font-bold text-center">
          {notice ? "Edit Notice" : "Add Notice"}
        </h2>

        <input
          type="text"
          name="title"
          placeholder="Enter Title"
          value={form.title}
          onChange={handleChange}
          className="w-full border rounded-lg p-3 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        <textarea
          name="body"
          placeholder="Enter Notice Description"
          value={form.body}
          onChange={handleChange}
          rows="4"
          className="w-full border rounded-lg p-3 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          className="w-full border rounded-lg p-3 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="General">General</option>
          <option value="Exam">Exam</option>
          <option value="Event">Event</option>
        </select>

        <select
          name="priority"
          value={form.priority}
          onChange={handleChange}
          className="w-full border rounded-lg p-3 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="Normal">Normal</option>
          <option value="Urgent">Urgent</option>
        </select>

        <input
          type="date"
          name="publishDate"
          value={form.publishDate}
          onChange={handleChange}
          className="w-full border rounded-lg p-3 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <div className="flex justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-500 hover:bg-gray-600 text-white px-5 py-2 rounded-lg"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg"
          >
            Save Notice
          </button>
        </div>
      </form>
    </div>
  );
}