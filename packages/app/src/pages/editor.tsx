import type { NextPage } from "next";
import React from "react";
import Editor from "../components/Editor";
import Header from "../components/Header";
import Footer from "../components/Footer";

import useDailyCanvasPrompt from "../hooks/use-daily-canvas-prompt";

const EditorScreen: NextPage = () => {
  const [canvasPromptResult] = useDailyCanvasPrompt();

  const { data: canvasPrompt, fetching } = canvasPromptResult;

  return canvasPrompt && !fetching ? (
    <div className="flex flex-col justify-center h-full w-full items-center text-white bg-bg">
      <div className="flex-1" />
      <div className="flex-1">
        <Header title="Daily Canvas"></Header>
        <div className="flex flex-col items-center pt-4">
          <div className="flex justify-center h-full">
            <Editor
              palette={canvasPrompt.palette}
              height={Number(canvasPrompt.height)}
              width={Number(canvasPrompt.width)}
            />
          </div>
        </div>
      </div>
      <div className="flex-[2]" />

      <Footer></Footer>
    </div>
  ) : (
    <div />
  );
};

export default EditorScreen;
