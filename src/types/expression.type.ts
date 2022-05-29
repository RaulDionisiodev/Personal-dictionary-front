import Example from "./example";

export default interface Expresion{
    id?: any | null,
    text: string,
    translation: string,
    exampleList: Example[]
}