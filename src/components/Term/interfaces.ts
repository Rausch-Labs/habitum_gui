


export interface SetFormData {
  type: "SET_FORM_DATA",
  data: {
    field: string
    payload: string
  }
}

export interface ClearFormData {
  type: "CLEAR_FORM_DATA"
}

export interface SetCommandHistory {
  type: "SET_COMMAND_HISTORY",
  data: string[]
}

export interface SetHistory {
  type: "SET_HISTORY",
  data: string[]
}

export interface SetRequestedFields {
  type: "SET_REQUESTED_FIELDS",
  data: string[]
}


export interface State {
  commandHistory: string[],
  history: string[],
  prompt: string,
  formData: any,
  requestedFields: string[]
}