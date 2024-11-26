"use client";
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';


interface Timer {
    name: string;
    time: number;
    remainingTime: number;
    isRunning: boolean;
  }
  

   
function Countdown() {
    const [time, setTime] = useState<number>(60);
    const [inputValue, setInputValue] = useState<number>(0);
    const [eventName, setEventName] = useState<string>('');
    const [isRunning, setIsRunning] = useState<boolean>(false);
    const [savedTimers, setSavedTimers] = useState<Timer[]>([]);

    const timerEndSound = new Audio('/countdown-sound.mp3'); // Path to your timer end sound

    useEffect(() => {
        // Load saved timers from localStorage when the component is mounted
        const storedTimers = localStorage.getItem('timers');
        if (storedTimers) {
            setSavedTimers(JSON.parse(storedTimers));
        }
    }, []); // Empty dependency array ensures this runs only once

    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (isRunning && time > 0) {
            timer = setInterval(() => {
                setTime((prev) => prev - 1);
            }, 1000);
        }
        if (time === 3) {
            timerEndSound.play();
        } else if (time === 0) {
            setIsRunning(false); // Play sound when timer ends
        }
        return () => clearInterval(timer); // Cleanup
    }, [isRunning, time]);

    const startTimer = () => {
        setIsRunning(true);
    };
    const addTimer = () => {
        setTime(time + 300);
    };
    const subTimer = () => {
        setTime(time - 300);
    };

    const pauseTimer = () => {
        setIsRunning(false);
    };

    const resetTimer = () => {
        setIsRunning(false);
        setTime(inputValue);
    };

    const setNewTime = () => {
        setIsRunning(false);
        setTime(inputValue);
    };

    const saveTimer = () => {
        const newEvent = {
            name: eventName,
            time: inputValue,
            remainingTime: inputValue,
            isRunning: false,
        };

        const updatedTimers = [...savedTimers, newEvent];
        setSavedTimers(updatedTimers);

        localStorage.setItem('timers', JSON.stringify(updatedTimers));

        setEventName('');
        setInputValue(0);
    };

    const deleteTimer = (index: number) => {
        const updatedTimers = savedTimers.filter((_, i) => i !== index);
        setSavedTimers(updatedTimers);
        localStorage.setItem('timers', JSON.stringify(updatedTimers));
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4 dark:bg-black">
        <div className="bg-white/30 backdrop-blur-lg rounded-xl shadow-2xl p-6 w-full max-w-xs sm:max-w-sm text-center">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">Countdown Timer</h1>
    
            {/* Timer Display */}
            <div className="text-4xl sm:text-5xl font-mono text-gray-800 mb-4 p-4 rounded-lg bg-white/50">
                {Math.floor(time / 60).toString().padStart(2, '0')}:
                {(time % 60).toString().padStart(2, '0')}
            </div>
    
            {/* Input Field for Timer Duration */}
            <div className="flex flex-col gap-3 mb-4 w-full">
                <Input
                    type="number"
                    value={inputValue === 0 ? '' : inputValue}
                    onChange={(e) => setInputValue(Number(e.target.value))}
                    className="w-full text-center py-2 px-4 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter Time (seconds)"
                />
                <Input
                    type="text"
                    value={eventName}
                    onChange={(e) => setEventName(e.target.value)}
                    className="w-full text-center py-2 px-4 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Event Name/Description"
                />
            </div>
    
            {/* Control Buttons */}
            <div className="flex flex-wrap gap-3 justify-center mb-4">
                <Button onClick={setNewTime} className="bg-black text-white text-sm rounded-md py-2 px-4 hover:bg-gray-800">
                    Set Time
                </Button>
                <Button onClick={addTimer} className="bg-black text-white text-sm rounded-md py-2 px-4 hover:bg-gray-800">
                    +5 mins
                </Button>
                <Button onClick={subTimer} className="bg-black text-white text-sm rounded-md py-2 px-4 hover:bg-gray-800">
                    -5 mins
                </Button>
                {!isRunning ? (
                    <Button onClick={startTimer} className="bg-black text-white text-sm rounded-md py-2 px-4 hover:bg-gray-800">
                        Start
                    </Button>
                ) : (
                    <Button onClick={pauseTimer} className="bg-black text-white text-sm rounded-md py-2 px-4 hover:bg-gray-800">
                        Pause
                    </Button>
                )}
                <Button onClick={resetTimer} className="bg-black text-white text-sm rounded-md py-2 px-4 hover:bg-gray-800">
                    Reset
                </Button>
            </div>
    
            {/* Save Timer Button */}
            <div className="mt-2 mb-4">
                <Button onClick={saveTimer} className="bg-green-500 text-white text-sm rounded-md py-2 px-4 hover:bg-green-600">
                    Save Timer
                </Button>
            </div>
    
            {/* Saved Timers List */}
            <div className="space-y-4">
                {savedTimers.map((timer, index) => (
                    <div key={index} className="bg-white/30 p-3 rounded-lg shadow-md text-gray-800">
                        <h2 className="font-semibold text-sm">{timer.name || 'Untitled Event'}</h2>
                        <p className="text-xs">Time: {timer.time}s</p>
                        <p className="text-xs">Remaining: {timer.remainingTime}s</p>
                        <Button
                            onClick={() => deleteTimer(index)}
                            className="bg-red-500 text-white text-xs rounded-md py-1 px-3 mt-2 hover:bg-red-600"
                        >
                            Delete
                        </Button>
                    </div>
                ))}
            </div>
        </div>
    </div>
    
    );
}

export default Countdown;

