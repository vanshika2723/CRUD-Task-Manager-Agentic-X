import { useEffect, useState } from "react";
import axios from "axios";

import {
  Plus,
  Pencil,
  FileText,
  AlignLeft,
  X,
  Loader2,
  Sparkles,
  WandSparkles,
} from "lucide-react";

const API_URL =
  import.meta.env.VITE_API_URL ||
  "http://localhost:5000/api/tasks";

function TaskForm({
  editingTask,
  onTaskCreated,
  onTaskUpdated,
  onCancelEdit,
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  // =====================================================
  // LOAD EDITING TASK
  // =====================================================

  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title);
      setDescription(editingTask.description || "");
    } else {
      setTitle("");
      setDescription("");
    }
  }, [editingTask]);

  // =====================================================
  // SUBMIT
  // =====================================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim()) {
      alert("Please enter a task title");
      return;
    }

    try {
      setLoading(true);

      if (editingTask) {
        // UPDATE

        const response = await axios.put(
          `${API_URL}/${editingTask._id}`,
          {
            title: title.trim(),
            description: description.trim(),
            completed: editingTask.completed,
          }
        );

        onTaskUpdated(response.data.task);
      } else {
        // CREATE

        const response = await axios.post(API_URL, {
          title: title.trim(),
          description: description.trim(),
        });

        onTaskCreated(response.data.task);
      }

      setTitle("");
      setDescription("");
    } catch (error) {
      console.error(
        "Task operation failed:",
        error
      );

      alert(
        error.response?.data?.message ||
          "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="relative overflow-hidden rounded-[30px] border border-white/10 bg-[#0A1220]/95 p-6 shadow-2xl shadow-black/30 backdrop-blur-xl sm:p-8 lg:p-10"
    >
      {/* ================================================= */}
      {/* BACKGROUND GLOWS */}
      {/* ================================================= */}

      <div
        className={`pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full blur-[110px] ${
          editingTask
            ? "bg-orange-500/10"
            : "bg-blue-500/10"
        }`}
      />

      <div className="pointer-events-none absolute -bottom-28 -left-24 h-72 w-72 rounded-full bg-teal-500/10 blur-[110px]" />

      {/* ================================================= */}
      {/* HEADER */}
      {/* ================================================= */}

      <div className="relative mb-8 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

        <div className="flex items-center gap-5">

          {/* ICON */}

          <div
            className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-[22px] border shadow-xl ${
              editingTask
                ? "border-orange-400/20 bg-orange-500/10 text-orange-400 shadow-orange-500/10"
                : "border-blue-400/20 bg-blue-500/10 text-blue-400 shadow-blue-500/10"
            }`}
          >
            {editingTask ? (
              <Pencil size={27} />
            ) : (
              <Plus size={28} />
            )}
          </div>

          {/* TITLE */}

          <div>

            <div className="mb-2 flex flex-wrap items-center gap-3">

              <h2 className="text-2xl font-black tracking-tight text-white sm:text-3xl">
                {editingTask
                  ? "Edit Task"
                  : "Create New Task"}
              </h2>

              {!editingTask && (
                <span className="inline-flex items-center gap-1.5 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.15em] text-cyan-400">
                  <Sparkles size={11} />
                  New Task
                </span>
              )}

            </div>

            <p className="text-sm text-slate-500 sm:text-base">
              {editingTask
                ? "Update your task details and keep moving forward."
                : "Turn your ideas into actionable tasks and stay productive."}
            </p>

          </div>

        </div>

        {/* ================================================= */}
        {/* CANCEL BUTTON */}
        {/* ================================================= */}

        {editingTask && (
          <button
            type="button"
            onClick={onCancelEdit}
            className="group flex items-center justify-center gap-2 self-start rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-bold text-slate-400 transition-all duration-300 hover:-translate-y-0.5 hover:border-red-400/30 hover:bg-red-500/10 hover:text-red-400 focus:outline-none focus:ring-4 focus:ring-red-500/10 lg:self-auto"
          >
            <X
              size={17}
              className="transition-transform duration-300 group-hover:rotate-90"
            />

            Cancel
          </button>
        )}

      </div>

      {/* ================================================= */}
      {/* FORM CONTENT */}
      {/* ================================================= */}

      <div className="relative grid grid-cols-1 gap-6">

        {/* ================================================= */}
        {/* TITLE FIELD */}
        {/* ================================================= */}

        <div>

          <label
            htmlFor="task-title"
            className="mb-2.5 flex items-center gap-2 text-sm font-bold text-slate-300"
          >
            <FileText
              size={17}
              className="text-blue-400"
            />

            Task Title

            <span className="text-orange-400">
              *
            </span>
          </label>

          <div className="group relative">

            <input
              id="task-title"
              type="text"
              value={title}
              onChange={(e) =>
                setTitle(e.target.value)
              }
              placeholder="What needs to be done?"
              autoComplete="off"
              className="w-full rounded-2xl border border-white/10 bg-[#050A14] px-5 py-4 text-sm font-medium text-white placeholder:text-slate-700 outline-none transition-all duration-300 hover:border-blue-400/20 focus:border-blue-400/50 focus:bg-[#07101D] focus:ring-4 focus:ring-blue-500/10"
            />

            {/* Focus Line */}

            <div className="pointer-events-none absolute inset-x-4 bottom-0 h-px origin-center scale-x-0 bg-gradient-to-r from-blue-500 via-cyan-400 to-teal-400 transition-transform duration-300 group-focus-within:scale-x-100" />

          </div>

        </div>

        {/* ================================================= */}
        {/* DESCRIPTION */}
        {/* ================================================= */}

        <div>

          <label
            htmlFor="task-description"
            className="mb-2.5 flex items-center gap-2 text-sm font-bold text-slate-300"
          >
            <AlignLeft
              size={17}
              className="text-teal-400"
            />

            Description

            <span className="font-normal text-slate-600">
              Optional
            </span>
          </label>

          <div className="group relative">

            <textarea
              id="task-description"
              value={description}
              onChange={(e) =>
                setDescription(e.target.value)
              }
              placeholder="Add some details about this task..."
              rows={5}
              className="w-full resize-none rounded-2xl border border-white/10 bg-[#050A14] px-5 py-4 text-sm leading-7 text-white placeholder:text-slate-700 outline-none transition-all duration-300 hover:border-teal-400/20 focus:border-teal-400/50 focus:bg-[#07101D] focus:ring-4 focus:ring-teal-500/10"
            />

            {/* Focus Line */}

            <div className="pointer-events-none absolute inset-x-4 bottom-0 h-px origin-center scale-x-0 bg-gradient-to-r from-teal-500 via-cyan-400 to-blue-400 transition-transform duration-300 group-focus-within:scale-x-100" />

          </div>

        </div>

        {/* ================================================= */}
        {/* SUBMIT BUTTON */}
        {/* ================================================= */}

        <button
          type="submit"
          disabled={loading}
          className={`group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-2xl px-6 py-4 text-sm font-black text-white shadow-xl transition-all duration-300 focus:outline-none disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0 ${
            editingTask
              ? "bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 shadow-orange-500/10 hover:-translate-y-1 hover:shadow-orange-500/25 focus:ring-4 focus:ring-orange-500/20"
              : "bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 shadow-blue-500/10 hover:-translate-y-1 hover:shadow-blue-500/25 focus:ring-4 focus:ring-blue-500/20"
          }`}
        >

          {/* Shine Effect */}

          <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/15 to-transparent transition-transform duration-700 group-hover:translate-x-full" />

          {/* Button Content */}

          <span className="relative flex items-center gap-2.5">

            {loading ? (
              <>
                <Loader2
                  size={20}
                  className="animate-spin"
                />

                Saving...
              </>
            ) : editingTask ? (
              <>
                <Pencil
                  size={19}
                  className="transition-transform duration-300 group-hover:-rotate-12"
                />

                Update Task
              </>
            ) : (
              <>
                <Plus
                  size={20}
                  className="transition-transform duration-300 group-hover:rotate-90"
                />

                Add Task

                <WandSparkles
                  size={17}
                  className="ml-1 opacity-90"
                />
              </>
            )}

          </span>

        </button>

      </div>

      {/* ================================================= */}
      {/* BOTTOM INFO */}
      {/* ================================================= */}

      <div className="relative mt-5 flex flex-wrap items-center justify-center gap-2 text-center text-[11px] text-slate-600">

        <span className="h-1.5 w-1.5 rounded-full bg-teal-400 shadow-sm shadow-teal-400/50" />

        Your task will be saved securely

        <span className="text-slate-800">
          •
        </span>

        <span>
          Stay focused. Get things done.
        </span>

      </div>

    </form>
  );
}

export default TaskForm;