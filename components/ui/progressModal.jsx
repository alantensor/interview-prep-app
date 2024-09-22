"use client";

import React from "react";
import { useStore } from "./wrapper"; // Ensure correct import path
import { useState } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "./button";
const ProgressModal = ({ checkTests }) => {
  const score = useStore((state) => state.judge_score);
  const micClicks = useStore((state) => state.micClicks);

  const [isEndPressed, setIsEndPressed] = useState(false);
  const [open, setOpen] = useState(false);

  const handleEndClick = () => {
    // setOpen(false);
    setIsEndPressed(true);
    checkTests();
  };

  return (
    <Dialog className="bg-background text-foreground">
      <DialogTrigger asChild>
        <Button
          onClick={checkTests}
          variant={isEndPressed ? "destructive" : "default"}
          className={"max-w-64"}
        >
          {isEndPressed ? "Scores" : "End Interview"}
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-background text-foreground sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {isEndPressed ? "Your Scores" : "Are you sure you want to end?"}
          </DialogTitle>
          <DialogDescription>
            {isEndPressed
              ? "Nice job! Here are you scores:"
              : "Press end to end your session."}
          </DialogDescription>
          {isEndPressed && (
            <div className="flex  w-full h-full m-auto p-8 space-x-3">
              <div className="flex flex-col items-center w-full h-full">
                <span className="mb-2">Raw Test</span>
                <CircularProgressbar
                  value={score}
                  text={`${score}%`}
                  styles={buildStyles({
                    textColor: "var(--foreground)",
                    pathColor: "var(--background)",
                    trailColor: "#d6d6d6",
                    textAlign: "center",
                  })}
                />
              </div>
              <div className="flex flex-col items-center w-full h-full">
                <span className="mb-2">Communication</span>
                <CircularProgressbar
                  value={Math.min(micClicks / 2 / 6, 1) * 100}
                  text={`${Math.min(micClicks / 2 / 6, 1) * 100}%`}
                  styles={buildStyles({
                    textColor: "var(--foreground)",
                    pathColor: "var(--background)",
                    trailColor: "#d6d6d6",
                    textAlign: "center",
                  })}
                />
              </div>
            </div>
          )}
        </DialogHeader>
        <DialogFooter>
          {isEndPressed ? (
            <></>
          ) : (
            <Button onClick={handleEndClick} variant={"destructive"}>
              End
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ProgressModal;
