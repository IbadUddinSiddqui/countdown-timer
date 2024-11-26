"use client"
import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

function Countdown() {
    const [time, setTime] = useState<number>(60)
    const [inputValue, setInputValue] = useState<number>(0)
    const [eventName, setEventName] = useState<string>('')
    const [isRunning, setIsRunning] = useState<boolean>(false)
    const [savedTimers, setSavedTimers] = useState<any[]>([])

    useEffect(() => {
        // Load saved timers from localStorage when the component is mounted
        const storedTimers = localStorage.getItem('timers')
        if (storedTimers) {
            setSavedTimers(JSON.parse(storedTimers))
        }
    }, [])

    useEffect(() => {
        let timer: NodeJS.Timeout
        if (isRunning && time > 0) {
            timer = setInterval(() => {
                setTime((prev) => prev - 1)
            }, 1000)
        } else if (time === 0) {
            setIsRunning(false)
        }
        return () => clearInterval(timer) // Cleanup
    }, [isRunning, time])

    const startTimer = () => {
        setIsRunning(true)
    }

    const pauseTimer = () => {
        setIsRunning(false)
    }

    const resetTimer = () => {
        setIsRunning(false)
        setTime(inputValue)
    }

    const setNewTime = () => {
        setIsRunning(false)
        setTime(inputValue)
    }

    const saveTimer = () => {
        // Create an event object to save
        const newEvent = {
            name: eventName,
            time: inputValue,
            remainingTime: inputValue,
            isRunning: false,
        }

        // Save the new event in the list of timers
        const updatedTimers = [...savedTimers, newEvent]
        setSavedTimers(updatedTimers)

        // Save to localStorage
        localStorage.setItem('timers', JSON.stringify(updatedTimers))

        // Clear the event name and input
        setEventName('')
        setInputValue(0)
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-8 dark:bg-black">
            <div className="bg-white/30 backdrop-blur-lg rounded-xl shadow-2xl p-8 w-full max-w-lg text-center">
                <h1 className="text-4xl font-bold text-gray-900 mb-6">Countdown Timer</h1>

                {/* Timer Display */}
                <div className="text-6xl font-mono text-gray-800 mb-6 p-6 rounded-lg bg-white/50">
                    {Math.floor(time / 60).toString().padStart(2, '0')}:
                    {(time % 60).toString().padStart(2, '0')}
                </div>

                {/* Input Field for Timer Duration */}
                <div className="flex items-center gap-4 mb-6 justify-center">
                    <Input
                        type="number"
                        value={inputValue === 0 ? '' : inputValue} // Set to empty string if input is 0 (default)
                        onChange={(e) => setInputValue(Number(e.target.value))}
                        className="w-72 text-center py-2 px-4 rounded-md border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter Your Time seconds"
                    />
                </div>

                {/* Input Field for Event Name */}
                <div className="flex items-center gap-4 mb-6 justify-center">
                    <Input
                        type="text"
                        value={eventName}
                        onChange={(e) => setEventName(e.target.value)}
                        className="w-72 text-center py-2 px-4 rounded-md border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Event Name/Description"
                    />
                </div>

                {/* Control Buttons */}
                <div className="flex gap-6 justify-center">
                    <Button variant="ghost" onClick={setNewTime} className="bg-black text-white rounded-md py-2 px-6 transition-all duration-300 ease-in-out hover:bg-gray-800 hover:text-white">
                        Set Time
                    </Button>
                    {!isRunning ? (
                        <Button onClick={startTimer} className="bg-black text-white rounded-md py-2 px-6 transition-all duration-300 ease-in-out hover:bg-gray-800 hover:text-white">
                            Start
                        </Button>
                    ) : (
                        <Button onClick={pauseTimer} className="bg-black text-white rounded-md py-2 px-6 transition-all duration-300 ease-in-out hover:bg-gray-800 hover:text-white">
                            Pause
                        </Button>
                    )}
                    <Button onClick={resetTimer} className="bg-black text-white rounded-md py-2 px-6 transition-all duration-300 ease-in-out hover:bg-gray-800 hover:text-white">
                        Reset
                    </Button>
                </div>

                {/* Save Timer Button */}
                <div className="mt-4">
                    <Button onClick={saveTimer} className="bg-green-500 text-white rounded-md py-2 px-6 transition-all duration-300 ease-in-out hover:bg-green-600">
                        Save Timer
                    </Button>
                </div>

                {/* List of Saved Timers */}
                <div className="mt-6 space-y-4">
                    {savedTimers.map((timer, index) => (
                        <div key={index} className="bg-white/30 p-4 rounded-lg shadow-md text-gray-800">
                            <h2 className="font-semibold">{timer.name || 'Untitled Event'}</h2>
                            <p>Time: {timer.time}s</p>
                            <p>Remaining: {timer.remainingTime}s</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Countdown
