import { useEffect, useState } from "react";
import api from "./api/axios";

import Login from "./components/Login";
import Register from "./components/Register";

import { useAuth } from "./context/AuthContext";

import {
  ClipboardList,
  CheckCircle2,
  Clock3,
  Search,
  ListFilter,
  Sparkles,
  RefreshCw,
  AlertCircle,
  Target,
  TrendingUp,
  ArrowUpRight,
  Zap,
} from "lucide-react";

import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

function App() {
  const { isAuthenticated, user, logout } = useAuth();

  // =====================================================
  // AUTH UI STATE
  // =====================================================

  const [showRegister, setShowRegister] = useState(false);

  // =====================================================
  // TASK STATES
  // IMPORTANT:
  // All hooks must be declared BEFORE any conditional return
  // =====================================================

  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingTask, setEditingTask] = useState(null);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [error, setError] = useState("");

  // =====================================================
  // FETCH TASKS
  // =====================================================

  const fetchTasks = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get("/tasks");

      setTasks(response.data.tasks || []);
    } catch (error) {
      console.error("Failed to fetch tasks:", error);

      setError(
        error.response?.data?.message ||
          "Unable to connect to the server. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // FETCH WHEN USER IS AUTHENTICATED
  // =====================================================

  useEffect(() => {
    if (isAuthenticated) {
      fetchTasks();
    } else {
      setTasks([]);
      setEditingTask(null);
      setError("");
      setLoading(false);
    }
  }, [isAuthenticated]);

  // =====================================================
  // CREATE TASK
  // =====================================================

  const handleTaskCreated = (newTask) => {
    setTasks((previousTasks) => [
      newTask,
      ...previousTasks,
    ]);
  };

  // =====================================================
  // EDIT TASK
  // =====================================================

  const handleEdit = (task) => {
    setEditingTask(task);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // =====================================================
  // UPDATE TASK
  // =====================================================

  const handleTaskUpdated = (updatedTask) => {
    setTasks((previousTasks) =>
      previousTasks.map((task) =>
        task._id === updatedTask._id
          ? updatedTask
          : task
      )
    );

    setEditingTask(null);
  };

  // =====================================================
  // TOGGLE COMPLETE
  // =====================================================

  const handleToggleComplete = async (task) => {
    try {
      const response = await api.put(
        `/tasks/${task._id}`,
        {
          title: task.title,
          description: task.description,
          completed: !task.completed,
        }
      );

      handleTaskUpdated(response.data.task);
    } catch (error) {
      console.error(
        "Failed to update task status:",
        error
      );

      alert(
        error.response?.data?.message ||
          "Failed to update task status"
      );
    }
  };

  // =====================================================
  // CANCEL EDIT
  // =====================================================

  const handleCancelEdit = () => {
    setEditingTask(null);
  };

  // =====================================================
  // DELETE TASK
  // =====================================================

  const handleDelete = async (taskId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this task?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      await api.delete(`/tasks/${taskId}`);

      setTasks((previousTasks) =>
        previousTasks.filter(
          (task) => task._id !== taskId
        )
      );
    } catch (error) {
      console.error(
        "Failed to delete task:",
        error
      );

      alert(
        error.response?.data?.message ||
          "Failed to delete task"
      );
    }
  };

  // =====================================================
  // SEARCH + FILTER
  // =====================================================

  const filteredTasks = tasks.filter((task) => {
    const searchText = search
      .toLowerCase()
      .trim();

    const title =
      task.title?.toLowerCase() || "";

    const description =
      task.description?.toLowerCase() || "";

    const matchesSearch =
      title.includes(searchText) ||
      description.includes(searchText);

    const matchesFilter =
      filter === "all" ||
      (filter === "completed" && task.completed) ||
      (filter === "pending" && !task.completed);

    return matchesSearch && matchesFilter;
  });

  // =====================================================
  // STATS
  // =====================================================

  const completedTasks = tasks.filter(
    (task) => task.completed
  ).length;

  const pendingTasks = tasks.filter(
    (task) => !task.completed
  ).length;

  const completionPercentage =
    tasks.length > 0
      ? Math.round(
          (completedTasks / tasks.length) * 100
        )
      : 0;

  // =====================================================
  // AUTH SCREEN
  // IMPORTANT:
  // This comes AFTER all hooks
  // =====================================================

  if (!isAuthenticated) {
    if (showRegister) {
      return (
        <Register
          onSwitchToLogin={() =>
            setShowRegister(false)
          }
        />
      );
    }

    return (
      <Login
        onSwitchToRegister={() =>
          setShowRegister(true)
        }
      />
    );
  }

  // =====================================================
  // MAIN UI
  // =====================================================

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#050A12] text-white">

      {/* ================================================= */}
      {/* BACKGROUND */}
      {/* ================================================= */}

      <div className="pointer-events-none fixed inset-0 overflow-hidden">

        <div className="absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-cyan-500/[0.07] blur-[120px]" />

        <div className="absolute right-[-180px] top-[20%] h-[500px] w-[500px] rounded-full bg-blue-500/[0.06] blur-[120px]" />

        <div className="absolute bottom-[-200px] left-[30%] h-[500px] w-[500px] rounded-full bg-teal-500/[0.05] blur-[120px]" />

      </div>

      {/* ================================================= */}
      {/* MAIN CONTAINER */}
      {/* ================================================= */}

      <main className="relative w-full px-4 py-5 sm:px-6 sm:py-7 lg:px-8 xl:px-10">

        <div className="mx-auto w-full max-w-[1800px]">

          {/* ================================================= */}
          {/* HEADER */}
          {/* ================================================= */}

          <header className="relative mb-7 overflow-hidden rounded-[30px] border border-white/[0.08] bg-gradient-to-br from-[#0B1626] via-[#09131F] to-[#071019] p-6 shadow-2xl shadow-black/30 sm:p-8 lg:p-10">

            <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-cyan-400/[0.08] blur-[100px]" />

            <div className="pointer-events-none absolute -bottom-32 left-[35%] h-72 w-72 rounded-full bg-blue-500/[0.06] blur-[100px]" />

           <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

              {/* LEFT */}

              <div>

                <div className="mb-5 flex flex-wrap items-center gap-3">

                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-cyan-400/20 bg-cyan-400/10 text-cyan-300 shadow-lg shadow-cyan-500/10">
                    <ClipboardList size={27} />
                  </div>

                  <span className="flex items-center gap-1.5 rounded-full border border-cyan-400/20 bg-cyan-400/[0.08] px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-cyan-300">
                    <Sparkles size={13} />
                    Productivity Workspace
                  </span>

                </div>

                <h1 className="text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl">
                  Task
                  <span className="bg-gradient-to-r from-cyan-300 via-blue-400 to-teal-300 bg-clip-text text-transparent">
                    Flow
                  </span>
                </h1>

                <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-400 sm:text-base">
                  Organize your work, focus on what matters,
                  and turn your daily tasks into real progress.
                </p>

              </div>

              {/* RIGHT */}

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:flex lg:flex-col xl:flex-row">

                {/* USER */}

                <div className="flex items-center gap-3 rounded-2xl border border-white/[0.07] bg-white/[0.03] px-5 py-4 backdrop-blur-xl">

                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-400/10 text-cyan-300">

                    <span className="text-lg font-bold">
                      {user?.name
                        ?.charAt(0)
                        ?.toUpperCase() || "U"}
                    </span>

                  </div>

                  <div>

                    <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-600">
                      Welcome
                    </p>

                    <p className="text-sm font-bold text-white">
                      {user?.name || "User"}
                    </p>

                  </div>

                </div>

                {/* COMPLETION */}

                <div className="flex items-center gap-3 rounded-2xl border border-white/[0.07] bg-white/[0.03] px-5 py-4 backdrop-blur-xl">

                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-400/10 text-teal-300">
                    <Target size={20} />
                  </div>

                  <div>

                    <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-600">
                      Completion
                    </p>

                    <p className="text-lg font-bold text-white">
                      {completionPercentage}%
                    </p>

                  </div>

                </div>

                {/* REFRESH */}

                <button
  type="button"
  onClick={fetchTasks}
  disabled={loading}
  aria-label="Refresh tasks"
  className="group flex items-center justify-center gap-2 rounded-2xl border border-white/[0.08] bg-white/[0.04] px-5 py-4 text-sm font-bold text-slate-300 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/30 hover:bg-cyan-400/[0.08] hover:text-cyan-300 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-[#050A12] disabled:cursor-not-allowed disabled:opacity-50"
>
                  <RefreshCw
                    size={17}
                    className={
                      loading
                        ? "animate-spin"
                        : "transition-transform duration-300 group-hover:rotate-180"
                    }
                  />

                  Refresh

                </button>

                {/* LOGOUT */}

               <button
  type="button"
  onClick={logout}
  aria-label="Log out of TaskFlow"
  className="rounded-2xl border border-red-400/20 bg-red-500/[0.06] px-5 py-4 text-sm font-bold text-red-300 transition-all duration-300 hover:-translate-y-1 hover:border-red-400/40 hover:bg-red-500/[0.12] focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2 focus:ring-offset-[#050A12]"
>
                  Logout
                </button>

              </div>

            </div>

            <div className="absolute bottom-0 left-0 h-[2px] w-full bg-gradient-to-r from-cyan-400 via-blue-500 to-teal-400 opacity-50" />

          </header>

          {/* ================================================= */}
          {/* QUICK STATS */}
          {/* ================================================= */}

          <section className="mb-7 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">

            {/* TOTAL */}

            <div className="group relative overflow-hidden rounded-[24px] border border-white/[0.08] bg-[#0A1420] p-6 shadow-xl transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/20">

              <div className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-cyan-400/[0.07] blur-3xl" />

              <div className="relative flex items-center justify-between">

                <div>

                  <p className="text-xs font-bold uppercase tracking-wider text-slate-600">
                    Total Tasks
                  </p>

                  <p className="mt-2 text-4xl font-black text-white">
                    {tasks.length}
                  </p>

                  <p className="mt-2 flex items-center gap-1 text-xs text-slate-500">
                    <TrendingUp
                      size={13}
                      className="text-cyan-400"
                    />
                    Your workload
                  </p>

                </div>

                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-400/10 text-cyan-300 transition-transform duration-300 group-hover:scale-110">
                  <ClipboardList size={25} />
                </div>

              </div>

            </div>

            {/* COMPLETED */}

            <div className="group relative overflow-hidden rounded-[24px] border border-white/[0.08] bg-[#0A1420] p-6 shadow-xl transition-all duration-300 hover:-translate-y-1 hover:border-teal-400/20">

              <div className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-teal-400/[0.07] blur-3xl" />

              <div className="relative flex items-center justify-between">

                <div>

                  <p className="text-xs font-bold uppercase tracking-wider text-slate-600">
                    Completed
                  </p>

                  <p className="mt-2 text-4xl font-black text-teal-300">
                    {completedTasks}
                  </p>

                  <p className="mt-2 text-xs text-slate-500">
                    Successfully finished
                  </p>

                </div>

                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-teal-400/10 text-teal-300 transition-transform duration-300 group-hover:scale-110">
                  <CheckCircle2 size={25} />
                </div>

              </div>

            </div>

            {/* PENDING */}

            <div className="group relative overflow-hidden rounded-[24px] border border-white/[0.08] bg-[#0A1420] p-6 shadow-xl transition-all duration-300 hover:-translate-y-1 hover:border-orange-400/20">

              <div className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-orange-400/[0.06] blur-3xl" />

              <div className="relative flex items-center justify-between">

                <div>

                  <p className="text-xs font-bold uppercase tracking-wider text-slate-600">
                    Pending
                  </p>

                  <p className="mt-2 text-4xl font-black text-orange-300">
                    {pendingTasks}
                  </p>

                  <p className="mt-2 text-xs text-slate-500">
                    Waiting for action
                  </p>

                </div>

                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-400/10 text-orange-300 transition-transform duration-300 group-hover:scale-110">
                  <Clock3 size={25} />
                </div>

              </div>

            </div>

            {/* PROGRESS */}

            <div className="group relative overflow-hidden rounded-[24px] border border-white/[0.08] bg-[#0A1420] p-6 shadow-xl transition-all duration-300 hover:-translate-y-1 hover:border-blue-400/20">

              <div className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-blue-400/[0.07] blur-3xl" />

              <div className="relative flex items-center justify-between">

                <div>

                  <p className="text-xs font-bold uppercase tracking-wider text-slate-600">
                    Progress
                  </p>

                  <p className="mt-2 text-4xl font-black text-blue-300">
                    {completionPercentage}%
                  </p>

                  <div className="mt-3 h-1.5 w-28 overflow-hidden rounded-full bg-white/[0.06]">

                    <div
                      className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-700"
                      style={{
                        width: `${completionPercentage}%`,
                      }}
                    />

                  </div>

                </div>

                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-400/10 text-blue-300 transition-transform duration-300 group-hover:scale-110">
                  <Zap size={25} />
                </div>

              </div>

            </div>

          </section>

          {/* ================================================= */}
          {/* CREATE / EDIT TASK */}
          {/* ================================================= */}

          <section className="mb-8">

            <TaskForm
              editingTask={editingTask}
              onTaskCreated={handleTaskCreated}
              onTaskUpdated={handleTaskUpdated}
              onCancelEdit={handleCancelEdit}
            />

          </section>

          {/* ================================================= */}
          {/* TASKS */}
          {/* ================================================= */}

          <section>

            <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">

              <div>

                <div className="flex items-center gap-3">

                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-400/10 text-blue-300">
                    <ClipboardList size={19} />
                  </div>

                  <h2 className="text-2xl font-black tracking-tight text-white sm:text-3xl">
                    Your Tasks
                  </h2>

                </div>

                <p className="mt-2 text-sm text-slate-500">
                  {filteredTasks.length}{" "}
                  {filteredTasks.length === 1
                    ? "task"
                    : "tasks"}{" "}
                  currently displayed
                </p>

              </div>

              <div className="flex items-center gap-2 text-xs text-slate-600">

                <span className="h-2 w-2 rounded-full bg-teal-400 shadow-lg shadow-teal-400/30" />

                Workspace active

              </div>

            </div>

            {/* SEARCH + FILTER */}

            <div className="mb-6 rounded-[24px] border border-white/[0.08] bg-[#0A1420] p-4 shadow-xl sm:p-5">

              <div className="flex flex-col gap-3 lg:flex-row">

                {/* SEARCH */}

                <div className="group relative flex-1">

                  <Search
                    size={18}
                    className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 transition-colors group-focus-within:text-cyan-400"
                  />

                  <input
                    type="text"
                    value={search}
                    onChange={(e) =>
                      setSearch(e.target.value)
                    }
                    placeholder="Search tasks by title or description..."
                    aria-label="Search tasks"
                    className="w-full rounded-2xl border border-white/[0.08] bg-[#050A12] py-3.5 pl-11 pr-4 text-sm text-white placeholder:text-slate-600 outline-none transition-all duration-300 hover:border-white/[0.12] focus:border-cyan-400/40 focus:ring-4 focus:ring-cyan-400/[0.08]"
                  />

                </div>

                {/* FILTER */}

                <div className="relative lg:w-56">

                  <ListFilter
                    size={17}
                    className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-600"
                  />

                  <select
                    value={filter}
                    onChange={(e) =>
                      setFilter(e.target.value)
                    }
                    aria-label="Filter tasks"
                    className="w-full appearance-none rounded-2xl border border-white/[0.08] bg-[#050A12] py-3.5 pl-10 pr-10 text-sm font-medium text-white outline-none transition-all duration-300 hover:border-white/[0.12] focus:border-cyan-400/40 focus:ring-4 focus:ring-cyan-400/[0.08]"
                  >

                    <option value="all">
                      All Tasks
                    </option>

                    <option value="pending">
                      Pending
                    </option>

                    <option value="completed">
                      Completed
                    </option>

                  </select>

                </div>

              </div>

            </div>

            {/* ERROR */}

            {error && (
              <div className="mb-6 flex items-start gap-3 rounded-2xl border border-red-400/20 bg-red-500/[0.08] p-4 text-red-300">

                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-red-500/10">
                  <AlertCircle size={19} />
                </div>

                <div>

                  <p className="font-bold">
                    Something went wrong
                  </p>

                  <p className="mt-1 text-sm text-red-300/70">
                    {error}
                  </p>

                </div>

              </div>
            )}

            {/* TASK LIST */}

            <TaskList
              tasks={filteredTasks}
              loading={loading}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onToggleComplete={
                handleToggleComplete
              }
            />

          </section>

          {/* ================================================= */}
          {/* FOOTER */}
          {/* ================================================= */}

          <footer className="mt-12 border-t border-white/[0.06] py-7">

            <div className="flex flex-col items-center justify-between gap-3 text-center sm:flex-row sm:text-left">

              <div>

                <p className="text-sm font-semibold text-slate-500">
                  TaskFlow Workspace
                </p>

                <p className="mt-1 text-xs text-slate-700">
                  Built with React • Express • MongoDB
                </p>

              </div>

              <div className="flex items-center gap-2 text-xs text-slate-700">

                <span>
                  Stay focused
                </span>

                <ArrowUpRight size={13} />

              </div>

            </div>

          </footer>

        </div>

      </main>

    </div>
  );
}

export default App;