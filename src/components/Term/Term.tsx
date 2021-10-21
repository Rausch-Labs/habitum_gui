import React, { useEffect, useReducer } from 'react';
import { useHabitiumContext } from '../../context';
import { setConnection } from '../../context/reducer';
import { catFile, commandTest, listFiles, openLink, setForm, showHelp, showWelcomeMsg } from './commands';
import { State } from './interfaces';
// import { useHabitiumContext } from '../../context';
import { Action, INITIAL_STATE, reducer, setCommandHistory, setHistory, setRequestedFields } from './reducer';
import './Term.css';
import { clearInput } from './utils';

const handleFocus = (e: any) => {
  e.target.focus()
}

export const TerminalComponent: React.FC = () => {
  // const { authenticateUser } = useHabitiumContext()
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE)
  const app = useHabitiumContext()

  const handleCommand = (command: string, args: string[]): string[] | null => {
    switch (command) {
      case "ls": return listFiles();
      case "test": return commandTest(dispatch, ["username", "password"].reverse());
      case "clear": return null;
      case 'intro': return showWelcomeMsg();
      case 'help': return showHelp();
      case 'cat': return catFile(args[0]);
      case 'source': return openLink("https://github.com/Rausch-Labs/habitum_gui");
      case 'auth': return handleAuth(args)
      default: return [...state.history, "sh: command not found: " + command];
    }
  }


  const handleInput = (e: any) => {
    if (e.key === "Enter") {
      const input_array: string[] = e.target.value.split(' ');
      const command: string = input_array[0];
      const args: string[] = input_array.slice(1, input_array.length);

      clearInput("term");
      setCommandHistory(dispatch, [...state.commandHistory, "test"])
      const response: string[] | null = handleCommand(command, args)
      if (response) {
        setHistory(dispatch, [...state.history, state.prompt + " " + command, ...response])
      } else {
        setHistory(dispatch, [])
      }

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

  const handleAuth = (args: string[]): string[] => {
    if(args.length !== 1){ return ['2nd argument "service" is required']}
    const service = args[0].toLowerCase()
    switch (service) {
      case "graphql":
        setConnection(app.dispatch, { online: true, authenticated: false })
        return setForm(dispatch, ["username", "password"].reverse());
      default:
        return [`auth: Invalid service ${service}`]
    }
  }

  // Form handling listener
  useEffect(() => {
    // processing for handleAuth
    if (state.requestedFields.length === 0 && !app.state.connection.graphql.authenticated && state.formData.username && state.formData.password) {
        console.log("Authenticating...")
        app.authenticateUser(app.habitum_GraphQL, state.formData.username, state.formData.password).then((data: any) => {
          console.log('habitum_GraphQL authentication successful', data)
          if (data.data.AuthorizeUser.status === 200) { setConnection(app.dispatch, { online: true, authenticated: true }) }
          else { dispatch({type: "CLEAR_FORM_DATA"})}
        })
    }
  }, [state.requestedFields, state.formData, app]);


  const output = state.history.map((op: string, i: number) =>
    <div key={i} className="app" style={{ color: op.includes(":~$") ? "#d28445" : "#dfe1e8" }}>{op}</div>
  );
  return (
    <>
      <div className="main" id="main">
        <div className="holder">
          <div id="content">
            {output}
            {state.requestedFields.length === 0
              ? <div className='input-area'>
                  <span className="prompt">{state.requestedFields.length === 0 ? state.prompt : state.requestedFields[state.requestedFields.length - 1]}</span>
                  <input id="term" type="text" onKeyPress={(e) => { handleInput(e) }} onKeyDown={handleKeyDown} onClick={handleFocus} />
                </div>
              : <TermForm state={state} dispatch={dispatch}/>
            } 
          </div>
        </div>
      </div>
    </>
  )
}

interface TermFormProps {
  state: State,
  dispatch: React.Dispatch<Action>
}


const TermForm: React.FC<TermFormProps> = ({state, dispatch}) => {

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


  return (
    <div className='input-area'>
      <span className="prompt">{state.requestedFields[state.requestedFields.length - 1]}</span>
      <input id="term" type="text" onKeyPress={(e) => { handleFormInput(e, state.requestedFields[state.requestedFields.length - 1]) }} onClick={handleFocus} />
    </div>
  )
}
