"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  AlertCircle,
  CheckCircle2,
  Circle,
  PlayCircle,
  PauseCircle,
  Trophy,
} from "lucide-react";
import confetti from "canvas-confetti";
import { createSessionWithTasks, getUser } from "@/utils/supabase/update_info";

interface Task {
  id: string;
  content: string;
  status: "todo" | "inProgress" | "done";
  startTime?: string;
  endTime?: string;
}

interface LocalSession {
  id: string;
  tasks: Task[];
  startTime: string;
  duration: number;
}

const StudySession = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([
    { id: crypto.randomUUID(), content: "", status: "todo" },
  ]);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(25);
  const [isStudying, setIsStudying] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [streak, setStreak] = useState(0);
  const [totalStudyTime, setTotalStudyTime] = useState(0);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [sessionStartTime, setSessionStartTime] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const user = await getUser();
      if (user) {
        setUserId(user.id);
      }
    };
    fetchUser();

    const storedSession = localStorage.getItem("currentSession");
    if (storedSession) {
      const session: LocalSession = JSON.parse(storedSession);
      setSessionId(session.id);
      setTasks(session.tasks);
      setIsStudying(true);
      setSessionStartTime(session.startTime);
      const elapsedTime = Math.floor(
        (Date.now() - new Date(session.startTime).getTime()) / 1000
      );
      setTotalStudyTime(elapsedTime);
      setTimeLeft(Math.max(session.duration * 60 - elapsedTime, 0));
    }
  }, []);

  useEffect(() => {
    if (isStudying && timeLeft > 0 && !isPaused) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
        setTotalStudyTime((prev) => prev + 1);
        updateLocalStorage();
      }, 1000);
      return () => clearTimeout(timer);
    } else if (isStudying && timeLeft === 0) {
      handleFinishStudy();
    }
  }, [isStudying, timeLeft, isPaused]);

  const updateLocalStorage = () => {
    if (sessionId && sessionStartTime) {
      const session: LocalSession = {
        id: sessionId,
        tasks,
        startTime: sessionStartTime,
        duration: Math.ceil(totalStudyTime / 60),
      };
      localStorage.setItem("currentSession", JSON.stringify(session));
    }
  };

  const handleAddTask = () => {
    setTasks([
      ...tasks,
      { id: crypto.randomUUID(), content: "", status: "todo" },
    ]);
  };

  const handleTaskChange = (index: number, value: string) => {
    const newTasks = [...tasks];
    newTasks[index].content = value;
    setTasks(newTasks);
    updateLocalStorage();
  };

  const handleStartStudy = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId) return;

    const filteredTasks = tasks.filter((task) => task.content.trim() !== "");
    const newSessionId = crypto.randomUUID();
    const startTime = new Date().toISOString();
    setSessionId(newSessionId);
    setSessionStartTime(startTime);
    setTasks(filteredTasks);
    const totalMinutes = hours * 60 + minutes;
    setTimeLeft(totalMinutes * 60);
    setIsStudying(true);
    setStreak((prev) => prev + 1);

    const session: LocalSession = {
      id: newSessionId,
      tasks: filteredTasks,
      startTime: startTime,
      duration: totalMinutes,
    };
    localStorage.setItem("currentSession", JSON.stringify(session));
  };

  const handleFinishStudy = async () => {
    setIsFinished(true);
    setIsStudying(false);
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });

    if (sessionId && userId && sessionStartTime) {
      try {
        const endTime = new Date().toISOString();
        const duration = Math.ceil(totalStudyTime / 60); // Convert seconds to minutes and round up
        await createSessionWithTasks(
          userId,
          sessionStartTime,
          endTime,
          duration,
          tasks.map((task) => ({
            ...task,
            startTime: task.startTime || sessionStartTime,
            endTime:
              task.endTime || (task.status === "done" ? endTime : undefined),
          }))
        );

        localStorage.removeItem("currentSession");
      } catch (error) {
        console.error("Error finishing study session:", error);
      }
    }
  };

  const handleTaskStatusChange = (
    taskId: string,
    newStatus: "todo" | "inProgress" | "done"
  ) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        const now = new Date().toISOString();
        if (newStatus === "inProgress" && task.status !== "inProgress") {
          return { ...task, status: newStatus, startTime: now };
        }
        if (newStatus === "done" && task.status !== "done") {
          return { ...task, status: newStatus, endTime: now };
        }
        return { ...task, status: newStatus };
      }
      return task;
    });
    setTasks(updatedTasks);
    updateLocalStorage();
  };

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, "0")}:${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const getTaskIcon = (status: "todo" | "inProgress" | "done") => {
    switch (status) {
      case "todo":
        return <Circle className="w-6 h-6 text-gray-400" />;
      case "inProgress":
        return <AlertCircle className="w-6 h-6 text-yellow-500" />;
      case "done":
        return <CheckCircle2 className="w-6 h-6 text-green-500" />;
    }
  };

  const getTaskDuration = (task: Task) => {
    if (task.startTime && task.endTime) {
      const start = new Date(task.startTime).getTime();
      const end = new Date(task.endTime).getTime();
      return formatTime(Math.floor((end - start) / 1000));
    }
    return "N/A";
  };

  const sortedTasks = [...tasks].sort((a, b) => {
    const order = { done: 0, inProgress: 1, todo: 2 };
    return order[a.status] - order[b.status];
  });

  const resetSession = () => {
    setTasks([{ id: crypto.randomUUID(), content: "", status: "todo" }]);
    setHours(0);
    setMinutes(25);
    setIsStudying(false);
    setIsFinished(false);
    setTimeLeft(0);
    setSessionId(null);
    setSessionStartTime(null);
    setIsOpen(false);
    localStorage.removeItem("currentSession");
  };

  return (
    <div
      className={`p-6 bg-[#f2e8dc] text-[#2c3e50] flex flex-col items-center justify-center min-h-screen ${isOpen ? "blur-sm" : ""}`}
    >
      {!isStudying && !isFinished && (
        <form onSubmit={handleStartStudy} className="space-y-6 w-full max-w-md">
          <div>
            <h2 className="text-4xl font-semibold mb-4">
              Set Your Study Tasks
            </h2>
            {tasks.map((task, index) => (
              <div key={task.id} className="mb-2">
                <Input
                  value={task.content}
                  onChange={(e) => handleTaskChange(index, e.target.value)}
                  placeholder={`Task ${index + 1}`}
                  className="bg-[#e0d5c5] text-[#2c3e50]"
                />
              </div>
            ))}
            <Button
              type="button"
              onClick={handleAddTask}
              variant="outline"
              className="mt-2 bg-[#2c3e50] text-white"
            >
              Add Task
            </Button>
          </div>
          <div className="flex space-x-4">
            <div className="flex-1">
              <Label htmlFor="hours" className="block mb-2">
                Hours
              </Label>
              <Input
                id="hours"
                type="number"
                min="0"
                max="23"
                value={hours}
                onChange={(e) => setHours(Number(e.target.value))}
                className="bg-[#e0d5c5] text-[#2c3e50]"
              />
            </div>
            <div className="flex-1">
              <Label htmlFor="minutes" className="block mb-2">
                Minutes
              </Label>
              <Input
                id="minutes"
                type="number"
                min="0"
                max="59"
                value={minutes}
                onChange={(e) => setMinutes(Number(e.target.value))}
                className="bg-[#e0d5c5] text-[#2c3e50]"
              />
            </div>
          </div>
          <Button
            type="submit"
            className="bg-[#8b7355] text-[#f2e8dc] hover:bg-[#6d5a43] w-full"
          >
            Start Study Session
          </Button>
        </form>
      )}

      {/* If Studing is in Progress then do this */}
      {isStudying && (
        <div className="space-y-6 w-full max-w-md">
          <h2 className="text-4xl font-semibold text-center">
            Study Session in Progress
          </h2>
          <div className="text-6xl font-bold text-center">
            {formatTime(timeLeft)}
          </div>
          <Progress
            value={(1 - timeLeft / ((hours * 60 + minutes) * 60)) * 100}
            className="w-full h-4"
          />
          <div className="flex justify-center space-x-4">
            <Button
              onClick={() => setIsPaused(!isPaused)}
              className="bg-[#8b7355] text-[#f2e8dc] hover:bg-[#6d5a43]"
            >
              {isPaused ? (
                <PlayCircle className="mr-2" />
              ) : (
                <PauseCircle className="mr-2" />
              )}
              {isPaused ? "Resume" : "Pause"}
            </Button>
            <Button
              onClick={handleFinishStudy}
              variant="outline"
              className="bg-[#2c3e50] text-white hover:bg-[#2c3e50]/90"
            >
              Finish Session
            </Button>
          </div>
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Tasks</h3>
            {tasks.map((task) => (
              <div
                key={task.id}
                className="flex items-center justify-between bg-white p-4 rounded-lg shadow"
              >
                <span className="flex items-center">
                  {getTaskIcon(task.status)}
                  <span className="ml-2">{task.content}</span>
                </span>
                <div className="flex space-x-2">
                  <Button
                    onClick={() => handleTaskStatusChange(task.id, "todo")}
                    variant={task.status === "todo" ? "default" : "outline"}
                    size="sm"
                  >
                    To Do
                  </Button>
                  <Button
                    onClick={() =>
                      handleTaskStatusChange(task.id, "inProgress")
                    }
                    variant={
                      task.status === "inProgress" ? "default" : "outline"
                    }
                    size="sm"
                  >
                    In Progress
                  </Button>
                  <Button
                    onClick={() => handleTaskStatusChange(task.id, "done")}
                    variant={task.status === "done" ? "default" : "outline"}
                    size="sm"
                  >
                    Done
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* If Studing is Finished then do this */}
      {isFinished && (
        <div className="text-center space-y-6 w-full max-w-md">
          <h2 className="text-3xl font-bold">Congratulations!</h2>
          <Trophy className="w-24 h-24 mx-auto text-yellow-500" />
          <p className="text-xl">You&apos;ve completed your study session.</p>
          <div className="flex justify-center space-x-4">
            <Badge variant="secondary" className="text-lg py-2 px-4">
              Streak: {streak} 🔥
            </Badge>
            <Badge variant="secondary" className="text-lg py-2 px-4">
              Total Study Time: {formatTime(totalStudyTime)}
            </Badge>
          </div>
          <div className="space-y-4 mt-6">
            <h3 className="text-xl font-semibold">Task Summary</h3>
            {sortedTasks.map((task) => (
              <div
                key={task.id}
                className="flex items-center justify-between bg-white p-4 rounded-lg shadow"
              >
                <span className="flex items-center">
                  {getTaskIcon(task.status)}
                  <span className="ml-2">{task.content}</span>
                </span>
                <div className="flex flex-col items-end">
                  <Badge
                    variant={task.status === "done" ? "default" : "secondary"}
                  >
                    {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
                  </Badge>
                  <span className="text-sm text-gray-500 mt-1">
                    Duration: {getTaskDuration(task)}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <Button
            onClick={resetSession}
            className="bg-[#8b7355] text-[#f2e8dc] hover:bg-[#6d5a43] mt-6"
          >
            Start New Session
          </Button>
        </div>
      )}
    </div>
  );
};

export default StudySession;
