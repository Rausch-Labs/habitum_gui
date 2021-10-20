
import { SetCommandHistory, SetFormData, SetHistory, SetRequestedFields, State } from "./interfaces";



export const INITIAL_STATE: State = {
  commandHistory: [],
  history: [],
  prompt: 'habitum_GUI:~$ ',
  requestedFields: [],
  formData: {}

}

export const setCommandHistory = (dispatch: React.Dispatch<Action>, data: any) => {
  return dispatch(
    {
      type: "SET_COMMAND_HISTORY",
      data: data
    }
  )
}

export const setHistory = (dispatch: React.Dispatch<Action>, data: any) => {
  return dispatch(
    {
      type: "SET_HISTORY",
      data: data
    }
  )
}

export const setRequestedFields = (dispatch: React.Dispatch<Action>, data: any) => {
  return dispatch(
    {
      type: "SET_REQUESTED_FIELDS",
      data: data
    }
  )
}


export type Action = 
  SetFormData
  | SetCommandHistory
  | SetHistory
  | SetRequestedFields

export function reducer(state: State = INITIAL_STATE, action: Action) {
  switch (action.type) {
    case "SET_FORM_DATA":
      return Object.assign({}, state, { formData: { [action.data.field]: action.data.payload }})
    case "SET_COMMAND_HISTORY":
      return Object.assign({}, state, { commandHistory: action.data })
    case "SET_HISTORY":
      return Object.assign({}, state, { history: action.data })
    case "SET_REQUESTED_FIELDS":
      return Object.assign({}, state, { requestedFields: action.data })
    default:
      throw new Error('Invalid Action');
  }
}