"use client"
import React, { useEffect, useState } from 'react'
import { Button, } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

function Countdown() {
    const [time,settime] = useState<number>(60)
    const [inputValue,setInputValue] = useState<number>(0)
    const [isRunning,setisRunning] = useState<boolean>(false)



    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (isRunning && time > 0) {
          timer = setInterval(() => {
            settime((prev) => prev - 1);
          }, 1000);
        } else if (time === 0) {
          setisRunning(false);
        }
        return () => clearInterval(timer); // Cleanup
      }, [isRunning, time]);

      const startTimer = () => {
        setisRunning(true);
      }      

      const pauseTimer = () => {
        setisRunning(false)
      }

      const resetTimer = () => {
        setisRunning(false);
        settime(inputValue);
      };

      const setNewTime = () => {
        setisRunning(false);
        settime(inputValue);
      }
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-8">
    <div className="bg-white/30 backdrop-blur-lg rounded-xl shadow-2xl p-8 w-full max-w-lg text-center">
      <h1 className="text-4xl font-bold text-gray-900 mb-6">Countdown Timer</h1>
  
      {/* Timer Display */}
      <div className="text-6xl font-mono text-gray-800 mb-6 p-6 rounded-lg bg-white/50">
        {Math.floor(time / 60)
          .toString()
          .padStart(2, "0")}
        :
        {(time % 60).toString().padStart(2, "0")}
      </div>
  
      {/* Input Field */}
      <div className="flex items-center gap-4 mb-6 justify-center">
        <Input
          type="number"
          value={inputValue === 0 ? "" : inputValue} // Set to empty string if input is 0 (default)
          onChange={(e) => setInputValue(Number(e.target.value))}
          className="w-56 text-center py-2 px-4 rounded-md border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter Your Time seconds"
        />
        <Button variant="ghost" onClick={setNewTime} className="bg-black text-white rounded-md py-2 px-6 transition-all duration-300 ease-in-out hover:bg-gray-800 hover:text-white">
          Set Time
        </Button>
      </div>
  
      {/* Control Buttons */}
      <div className="flex gap-6 justify-center">
        {!isRunning ? (
          <Button onClick={startTimer} className="bg-green-500 text-white rounded-md py-2 px-6 transition-all duration-300 ease-in-out hover:bg-green-600">
            Start
          </Button>
        ) : (
          <Button onClick={pauseTimer} className="bg-yellow-500 text-white rounded-md py-2 px-6 transition-all duration-300 ease-in-out hover:bg-yellow-600">
            Pause
          </Button>
        )}
        <Button onClick={resetTimer} className="bg-red-500 text-white rounded-md py-2 px-6 transition-all duration-300 ease-in-out hover:bg-red-600">
          Reset
        </Button>
      </div>
    </div>
  </div>
  
  )
}

export default Countdown