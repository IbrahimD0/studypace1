"use client"

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { AlertCircle, CheckCircle2, Circle, PlayCircle, PauseCircle, Trophy } from 'lucide-react'
import confetti from 'canvas-confetti'

export default function StudySession() {
  const [isOpen, setIsOpen] = useState(false)
  const [tasks, setTasks] = useState<string[]>([''])
  const [hours, setHours] = useState(0)
  const [minutes, setMinutes] = useState(25)
  const [isStudying, setIsStudying] = useState(false)
  const [isFinished, setIsFinished] = useState(false)
  const [timeLeft, setTimeLeft] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [taskStatus, setTaskStatus] = useState<Record<string, 'todo' | 'inProgress' | 'done'>>({})
  const [streak, setStreak] = useState(0)
  const [totalStudyTime, setTotalStudyTime] = useState(0)

  useEffect(() => {
    if (isStudying && timeLeft > 0 && !isPaused) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1)
        setTotalStudyTime(prev => prev + 1)
      }, 1000)
      return () => clearTimeout(timer)
    } else if (isStudying && timeLeft === 0) {
      handleFinishStudy()
    }
  }, [isStudying, timeLeft, isPaused])

  const handleAddTask = () => {
    setTasks([...tasks, ''])
  }

  const handleTaskChange = (index: number, value: string) => {
    const newTasks = [...tasks]
    newTasks[index] = value
    setTasks(newTasks)
  }

  const handleStartStudy = (e: React.FormEvent) => {
    e.preventDefault()
    const filteredTasks = tasks.filter(task => task.trim() !== '')
    setTasks(filteredTasks)
    setTaskStatus(filteredTasks.reduce((acc, task) => ({ ...acc, [task]: 'todo' }), {}))
    const totalMinutes = hours * 60 + minutes
    setTimeLeft(totalMinutes * 60)
    setIsStudying(true)
    setStreak(prev => prev + 1)
  }

  const handleFinishStudy = () => {
    setIsFinished(true)
    setIsStudying(false)
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    })
  }

  const handleTaskStatusChange = (task: string, status: 'todo' | 'inProgress' | 'done') => {
    setTaskStatus(prev => ({ ...prev, [task]: status }))
  }

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600)
    const mins = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const getTaskIcon = (status: 'todo' | 'inProgress' | 'done') => {
    switch (status) {
      case 'todo':
        return <Circle className="w-6 h-6 text-gray-400" />
      case 'inProgress':
        return <AlertCircle className="w-6 h-6 text-yellow-500" />
      case 'done':
        return <CheckCircle2 className="w-6 h-6 text-green-500" />
    }
  }

  const sortedTasks = Object.entries(taskStatus).sort(([, statusA], [, statusB]) => {
    const order = { 'done': 0, 'inProgress': 1, 'todo': 2 }
    return order[statusA] - order[statusB]
  })

  const resetSession = () => {
    setTasks([''])
    setHours(0)
    setMinutes(25)
    setIsStudying(false)
    setIsFinished(false)
    setTimeLeft(0)
    setTaskStatus({})
    setIsOpen(false)
  }

  return (
    <div className={`bg-[#f2e8dc] text-[#2c3e50] flex flex-col items-center justify-center ${isOpen ? 'blur-sm' : ''}`}>
      
      
          {!isStudying && !isFinished && (
            <form onSubmit={handleStartStudy} className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold mb-4">Set Your Study Tasks</h2>
                {tasks.map((task, index) => (
                  <div key={index} className="mb-2">
                    <Input
                      value={task}
                      onChange={(e) => handleTaskChange(index, e.target.value)}
                      placeholder={`Task ${index + 1}`}
                      className="bg-[#e0d5c5] text-[#2c3e50] w-64"
                    />
                  </div>
                ))}
                <Button type="button" onClick={handleAddTask} variant="outline" className="mt-2 bg-[#2c3e50] text-white">
                  Add Task
                </Button>
              </div>
              <div className="flex space-x-4">
                <div className="flex-1">
                  <Label htmlFor="hours" className="block mb-2">Hours</Label>
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
                  <Label htmlFor="minutes" className="block mb-2">Minutes</Label>
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
              <Button type="submit" className="bg-[#8b7355] text-[#f2e8dc] hover:bg-[#6d5a43] w-full">
                Start Study Session
              </Button>
            </form>
          )}
          {isStudying && (
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold">Study Session in Progress</h2>
              <div className="text-6xl font-bold text-center">{formatTime(timeLeft)}</div>
              <Progress value={(1 - timeLeft / ((hours * 60 + minutes) * 60)) * 100} className="w-full h-4" />
              <div className="flex justify-center space-x-4">
                <Button
                  onClick={() => setIsPaused(!isPaused)}
                  className="bg-[#8b7355] text-[#f2e8dc] hover:bg-[#6d5a43]"
                >
                  {isPaused ? <PlayCircle className="mr-2" /> : <PauseCircle className="mr-2" />}
                  {isPaused ? 'Resume' : 'Pause'}
                </Button>
                <Button onClick={handleFinishStudy} variant="outline" className='bg-[#2c3e50] text-white hover:bg-[#2c3e50]/90'>
                  Finish Session
                </Button>
              </div>
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Tasks</h3>
                {tasks.map(task => (
                  <div key={task} className="flex items-center justify-between bg-white p-4 rounded-lg shadow">
                    <span className="flex items-center">
                      {getTaskIcon(taskStatus[task])}
                      <span className="ml-2">{task}</span>
                    </span>
                    <div className="flex space-x-2 px-8">
                      <Button
                        onClick={() => handleTaskStatusChange(task, 'todo')}
                        variant={taskStatus[task] === 'todo' ? 'default' : 'outline'}
                        size="sm"
                      >
                        To Do
                      </Button>
                      <Button
                        onClick={() => handleTaskStatusChange(task, 'inProgress')}
                        variant={taskStatus[task] === 'inProgress' ? 'default' : 'outline'}
                        size="sm"
                      >
                        In Progress
                      </Button>
                      <Button
                        onClick={() => handleTaskStatusChange(task, 'done')}
                        variant={taskStatus[task] === 'done' ? 'default' : 'outline'}
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
          {isFinished && (
            <div className="text-center space-y-6">
              <h2 className="text-3xl font-bold">Congratulations!</h2>
              <Trophy className="w-24 h-24 mx-auto text-yellow-500" />
              <p className="text-xl">You've completed your study session.</p>
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
                {sortedTasks.map(([task, status]) => (
                  <div key={task} className="flex items-center justify-between bg-white p-4 rounded-lg shadow">
                    <span className="flex items-center">
                      {getTaskIcon(status)}
                      <span className="ml-2">{task}</span>
                    </span>
                    <Badge variant={status === 'done' ? 'default' : 'secondary'}>
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </Badge>
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
  )
}