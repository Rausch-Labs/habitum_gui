import React, { useEffect, useReducer } from 'react';
import { catFile, commandTest, handleAuthenticate, listFiles, openLink, showHelp, showWelcomeMsg } from './commands';
// import { useHabitiumContext } from '../../context';
import { INITIAL_STATE, reducer, setCommandHistory, setHistory, setRequestedFields } from './reducer';
import './Term.css';
import { clearInput } from './utils';

export const TerminalComponent: React.FC = () => {
  // const { authenticateUser } = useHabitiumContext()
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE)

  const handleFocus = (e: any) => {
    e.target.focus()
  }

  const handleCommand = (command: string, args: string[]): string[] | null => {
    switch (command) {
      case "ls":            return listFiles()
      case "test":          return commandTest(dispatch, ["username", "password"].reverse())
      case "clear":         return null
      case 'intro':         return showWelcomeMsg()
      case 'help':          return showHelp()
      case 'cat':           return catFile(args[0])
      case 'source':        return openLink("https://github.com/Rausch-Labs/habitum_gui")
      case 'authenticate':  return handleAuthenticate(args)
      default:              return [...state.history, "sh: command not found: " + command];
    }   
  }


  const handleInput = (e: any) => {
    if (e.key === "Enter") {
      const input_array: string[] = e.target.value.split(' ');
      const command: string       = input_array[0];
      const args: string[]        = input_array.slice(1, input_array.length);

      clearInput("term");
      setCommandHistory(dispatch, [...state.commandHistory, "test"])
      const response: string[] | null = handleCommand(command, args)
      if (response) {
        console.log(response)
        setHistory(dispatch, [...state.history, state.prompt + " " + command, ...response])
      } else {
        setHistory(dispatch, [])
      }
    
    }

  }

  const handleFormInput = (e: any, field: string) => {
    if (e.key === "Enter") {
      dispatch({
        type: "SET_FORM_DATA",
        data: {
          field: field,
          payload: e.target.value
        }
      })
      setRequestedFields(dispatch, state.requestedFields.filter((fieldName: string) => fieldName !== field))
      setHistory(dispatch, [...state.history, `${field}: `])
      clearInput("term");
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
    var container = document.getElementById("main") as HTMLInputElement;
    if (container) { container.scrollTop = container.scrollHeight; }
  })


  useEffect(() => {
    setHistory(dispatch, showWelcomeMsg())
    var term = document.getElementById("term") as HTMLInputElement;
    term.focus()
  }, [])

  const output = state.history.map((op: string, i: number) => 
    <div key={i} className="app" style={{color: op.includes(":~$") ? "#d28445" : "#dfe1e8"}}>{op}</div>
  );
  return (
    <>
      <div className="main" id="main">
        <div className="holder">
          <div id="content">
            {output}
              <div className='input-area'>
                <span className="prompt">{state.requestedFields.length === 0 ? state.prompt: state.requestedFields[state.requestedFields.length - 1]}</span>
                <input id="term" type="text" onKeyPress={(e) => {state.requestedFields.length === 0 ? handleInput(e) : handleFormInput(e, state.requestedFields[state.requestedFields.length - 1])}} onKeyDown={handleKeyDown} onClick={handleFocus} />
              </div>
          </div>
        </div>
      </div>
    </>
  )
}
