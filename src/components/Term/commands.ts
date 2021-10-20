import { setRequestedFields, Action } from "./reducer"

// All terminal commands need to return a string[]

export const commandTest = (dispatch: React.Dispatch<Action>, data: any): string[] => {
  setRequestedFields(dispatch, data)
  return ["Running Test"]
}


export const openLink = (link: string): string[]  => {
  window.open(link, '_blank');
  return ["Opening link: " + link]
}

export const showWelcomeMsg = (): string[] => {
  return ["Welcome to Habitum GUI", "Type `help` to see what all commands are available"]
}
export const catFile = (arg: string): string[] => {
  if (arg === "README.md") {
    return ['A sort of *react terminal*, if you will!', "type `source` to view the source code"]
  }
  return ["cat: " + arg + ": No such file or directory"]
}
export const showHelp = function (): string[] {
  return [
    "help - this help text",
    "source - browse the code for this page",
    "intro - print intro message",
    "clear - clear screen",
    "cat - print contents of a file",
    "ls - list files",
    "authenticate - login to one of your habitum services"
  ]
}

export const listFiles = (): string[] => {
  return ["README.md"]
}


export const handleAuthenticate = (args: string[]): string[] => {
  const serviceName = args[0].toLowerCase()

  switch (serviceName) {
    case 'graphql':
      return handleGraphQLAuth(args.slice(1, args.length))
    case 'grpc':
      return handleGraphQLAuth(args.slice(1, args.length))
    default:
      return [`handleAuthenticate: Invalid service ${serviceName}`]
  }
}



export const handleGraphQLAuth = (args: string[]): string[] => {

  return ["Function not implemented"]
}
