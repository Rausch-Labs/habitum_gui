import React, { useState, useEffect } from 'react';
import './Term.css';

const openLink = (link: string) => {
  return () => {
    window.open(link, '_blank');
    return ["Opening link: " + link]
  }
}

const showWelcomeMsg = function () {
  return ["Welcome to Habitum GUI", "Type `help` to see what all commands are available"]
}
const catFile = function (arg: string) {
  if (arg === "README.md") {
    return ['A sort of *react terminal*, if you will!', "type `source` to view the source code"]
  } else {
    return ["cat: " + arg + ": No such file or directory"]
  }
}
const showHelp = function () {
  return [
    "help - this help text",
    "source - browse the code for this page",
    "intro - print intro message",
    "clear - clear screen",
    "cat - print contents of a file",
    "ls - list files"
  ]
}

const listFiles = () => {
  return ["README.md"]
}

export const TerminalComponent: React.FC = () => {

  const [history, setHistory] = useState<string[]>(["Welcome to Habitum GUI", "Type `help` to see what all commands are available"])
  const [commandHistory, setCommandHistory] = useState<string[]>([])
  const [prompt, setPrompt] = useState('habitum_GUI:~$ ')

  const clearHistory = function () {
    setHistory([])
  }

  const addHistory = function (output: string[]) {
    setHistory([...history, ...output])
  }

  const addCommandHistory = (output: string) => {
    setCommandHistory([...commandHistory, output])
  }

  const clearInput = function () {
    const term = document.getElementById("term") as HTMLInputElement;
    term.value = ""
  }

  const commands: any = {
    'clear': clearHistory,
    'ls': listFiles,
    'intro': showWelcomeMsg,
    'help': showHelp,
    'cat': catFile,
    'source': openLink("https://github.com/suisuss/habitum_GUI")
  }
  

  const handleClick = () => {
    var term = document.getElementById("term") as HTMLInputElement;
    term.focus();
  }

  const handleInput = (e: any) => {
    if (e.key === "Enter") {
      var input_text = document.getElementById("term") as HTMLInputElement;
      var input_array: string[] = input_text.value.split(' ');
      var input: string = input_array[0];
      var arg = input_array[1];
      var command = commands[input];

      if (command === undefined) {
        addHistory(["sh: command not found: " + input]);
      } else {
        const response: any = command(arg);
        addCommandHistory(input)
        addHistory([prompt + " " + input_text.value, ...response]);
      }
      clearInput();
    }

  }

  const handleKeyDown = (e: any) => {

    switch (e.keyCode) {
      case 38:
        // Get from command history
        break;
      case 40:
        // Get from command history
        break;
    }

  }

  useEffect(() => {
    //var container = document.getElementsByClassName('container')[0];
    var container = document.getElementById("main") as HTMLInputElement;
    if (container) { container.scrollTop = container.scrollHeight; }
  })


  useEffect(() => {
    var term = document.getElementById("term") as HTMLInputElement;
    term.focus()

    setPrompt('habitum_GUI:~$ ')

  }, [])



  var output = history.map((op: string, i: number) => <div key={i} className="app">{op.includes(":~$") ? `- ${op}` : op}</div>);
  return (
    <>
      <div className="main" id="main">
        <div className="holder">
          <div id="content">
            {output}
            <div className='input-area' onClick={handleClick}>
              <span className="prompt">{prompt}</span>
              <input id="term" type="text" onKeyPress={handleInput} onKeyDown={handleKeyDown} />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
