import {
  CheckCircle2,
  Circle,
  Edit3,
  Trash2,
  ClipboardList,
  Loader2,
  Clock3,
  Sparkles,
  ArrowRight,
} from "lucide-react";

function TaskList({
  tasks,
  loading,
  onEdit,
  onDelete,
  onToggleComplete,
}) {
  // =====================================================
  // LOADING STATE
  // =====================================================

  if (loading) {
    return (
      <div
        role="status"
        aria-live="polite"
        className="relative overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.04] p-8 text-center shadow-2xl backdrop-blur-xl sm:p-12"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 h-48 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-500/10 blur-3xl"
        />

        <div className="relative flex flex-col items-center justify-center">
          <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-violet-400/20 bg-violet-500/10 shadow-lg shadow-violet-500/10">
            <Loader2
              size={29}
              aria-hidden="true"
              className="animate-spin text-violet-400"
            />
          </div>

          <p className="text-base font-semibold text-slate-200">
            Loading your workspace...
          </p>

          <p className="mt-2 text-sm text-slate-500">
            Fetching your latest tasks
          </p>
        </div>
      </div>
    );
  }

  // =====================================================
  // EMPTY STATE
  // =====================================================

  if (tasks.length === 0) {
    return (
      <div
        role="status"
        aria-live="polite"
        className="relative overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.04] p-8 text-center shadow-2xl backdrop-blur-xl sm:p-16"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 -top-24 h-56 w-56 rounded-full bg-violet-500/10 blur-[80px]"
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-24 -left-24 h-56 w-56 rounded-full bg-cyan-500/10 blur-[80px]"
        />

        <div className="relative flex flex-col items-center">
          <div
            aria-hidden="true"
            className="mb-6 flex h-20 w-20 items-center justify-center rounded-[24px] border border-white/10 bg-[#080D1D] shadow-2xl sm:h-24 sm:w-24 sm:rounded-[28px]"
          >
            <ClipboardList
              size={36}
              strokeWidth={1.5}
              className="text-slate-600 sm:h-10 sm:w-10"
            />
          </div>

          <div className="mb-3 flex items-center gap-2">
            <Sparkles
              size={15}
              aria-hidden="true"
              className="text-violet-400"
            />

            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-violet-400 sm:text-xs">
              Nothing here yet
            </span>
          </div>

          <h3 className="text-xl font-black text-white sm:text-2xl">
            No tasks found
          </h3>

          <p className="mt-3 max-w-md text-sm leading-6 text-slate-500">
            Your workspace is looking clean. Create a
            new task or adjust your search and filters
            to see your tasks here.
          </p>
        </div>
      </div>
    );
  }

  // =====================================================
  // TASK LIST
  // =====================================================

  return (
    <div
      role="list"
      aria-label="Task list"
      className="space-y-4"
    >
      {tasks.map((task) => (
        <article
          key={task._id}
          role="listitem"
          className={`group relative overflow-hidden rounded-[26px] border p-4 shadow-xl backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl sm:p-6 ${
            task.completed
              ? "border-emerald-500/10 bg-emerald-500/[0.025] hover:border-emerald-400/20"
              : "border-white/10 bg-white/[0.04] hover:border-violet-400/25 hover:bg-white/[0.055]"
          }`}
        >
          {/* ================================================= */}
          {/* BACKGROUND GLOW */}
          {/* ================================================= */}

          <div
            aria-hidden="true"
            className={`pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full blur-3xl transition-opacity duration-300 ${
              task.completed
                ? "bg-emerald-500/5 group-hover:bg-emerald-500/10"
                : "bg-violet-500/5 group-hover:bg-violet-500/10"
            }`}
          />

          {/* ================================================= */}
          {/* LEFT ACCENT */}
          {/* ================================================= */}

          <div
            aria-hidden="true"
            className={`absolute left-0 top-6 h-[calc(100%-3rem)] w-[3px] rounded-r-full transition-all duration-300 ${
              task.completed
                ? "bg-emerald-400/50"
                : "bg-gradient-to-b from-violet-400 via-fuchsia-400 to-cyan-400"
            }`}
          />

          {/* ================================================= */}
          {/* CONTENT */}
          {/* ================================================= */}

          <div className="relative flex flex-col gap-4 sm:flex-row sm:items-start">
            {/* ================================================= */}
            {/* TOP ROW ON MOBILE */}
            {/* ================================================= */}

            <div className="flex min-w-0 flex-1 items-start gap-3 sm:contents">
              {/* COMPLETE BUTTON */}

              <button
                type="button"
                onClick={() => onToggleComplete(task)}
                aria-label={
                  task.completed
                    ? `Mark ${task.title} as pending`
                    : `Mark ${task.title} as completed`
                }
                aria-pressed={task.completed}
                title={
                  task.completed
                    ? "Mark as pending"
                    : "Mark as completed"
                }
                className="mt-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-full outline-none transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:ring-offset-2 focus:ring-offset-[#0A1220]"
              >
                {task.completed ? (
                  <CheckCircle2
                    size={29}
                    strokeWidth={2}
                    aria-hidden="true"
                    className="text-emerald-400 drop-shadow-[0_0_8px_rgba(52,211,153,0.25)]"
                  />
                ) : (
                  <Circle
                    size={29}
                    strokeWidth={1.6}
                    aria-hidden="true"
                    className="text-slate-600 transition-colors duration-200 hover:text-violet-400"
                  />
                )}
              </button>

              {/* TASK INFORMATION */}

              <div className="min-w-0 flex-1">
                {/* TITLE */}

                <h3
                  className={`break-words text-base font-bold tracking-tight transition-all duration-200 sm:text-xl ${
                    task.completed
                      ? "text-slate-500 line-through decoration-emerald-500/40"
                      : "text-white group-hover:text-violet-100"
                  }`}
                >
                  {task.title}
                </h3>

                {/* DESCRIPTION */}

                {task.description && (
                  <p
                    className={`mt-2 break-words text-sm leading-6 ${
                      task.completed
                        ? "text-slate-600"
                        : "text-slate-400"
                    }`}
                  >
                    {task.description}
                  </p>
                )}

                {/* META */}

                <div className="mt-4 flex flex-wrap items-center gap-2">
                  {/* STATUS */}

                  <span
                    className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[10px] font-bold uppercase tracking-wide sm:text-[11px] ${
                      task.completed
                        ? "border-emerald-400/20 bg-emerald-400/10 text-emerald-400"
                        : "border-amber-400/20 bg-amber-400/10 text-amber-400"
                    }`}
                  >
                    {task.completed ? (
                      <CheckCircle2
                        size={13}
                        aria-hidden="true"
                      />
                    ) : (
                      <Clock3
                        size={13}
                        aria-hidden="true"
                      />
                    )}

                    {task.completed
                      ? "Completed"
                      : "Pending"}
                  </span>

                  {/* SMALL LABEL */}

                  <span className="hidden items-center gap-1 rounded-full border border-white/5 bg-white/[0.03] px-3 py-1.5 text-[11px] text-slate-600 sm:inline-flex">
                    <ArrowRight
                      size={11}
                      aria-hidden="true"
                    />

                    {task.completed
                      ? "Finished"
                      : "In progress"}
                  </span>
                </div>
              </div>
            </div>

            {/* ================================================= */}
            {/* ACTIONS */}
            {/* ================================================= */}

            <div className="flex w-full gap-2 sm:w-auto">
              {/* EDIT */}

              <button
                type="button"
                onClick={() => onEdit(task)}
                aria-label={`Edit ${task.title}`}
                title="Edit Task"
                className="flex min-h-11 flex-1 items-center justify-center gap-2 rounded-xl border border-violet-400/10 bg-violet-500/10 px-3 text-violet-400 transition-all duration-200 hover:-translate-y-1 hover:border-violet-400/30 hover:bg-violet-500/20 hover:text-violet-300 hover:shadow-lg hover:shadow-violet-500/10 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:ring-offset-2 focus:ring-offset-[#0A1220] sm:h-10 sm:min-h-0 sm:w-10 sm:flex-none sm:px-0"
              >
                <Edit3
                  size={17}
                  aria-hidden="true"
                />

                <span className="text-xs font-bold sm:sr-only">
                  Edit
                </span>
              </button>

              {/* DELETE */}

              <button
                type="button"
                onClick={() => onDelete(task._id)}
                aria-label={`Delete ${task.title}`}
                title="Delete Task"
                className="flex min-h-11 flex-1 items-center justify-center gap-2 rounded-xl border border-red-400/10 bg-red-500/10 px-3 text-red-400 transition-all duration-200 hover:-translate-y-1 hover:border-red-400/30 hover:bg-red-500/20 hover:text-red-300 hover:shadow-lg hover:shadow-red-500/10 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2 focus:ring-offset-[#0A1220] sm:h-10 sm:min-h-0 sm:w-10 sm:flex-none sm:px-0"
              >
                <Trash2
                  size={17}
                  aria-hidden="true"
                />

                <span className="text-xs font-bold sm:sr-only">
                  Delete
                </span>
              </button>
            </div>
          </div>

          {/* ================================================= */}
          {/* BOTTOM PROGRESS LINE */}
          {/* ================================================= */}

          <div
            aria-hidden="true"
            className={`absolute bottom-0 left-0 h-[2px] w-full origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100 ${
              task.completed
                ? "bg-emerald-400/40"
                : "bg-gradient-to-r from-violet-500 via-fuchsia-500 to-cyan-400"
            }`}
          />
        </article>
      ))}
    </div>
  );
}

export default TaskList;