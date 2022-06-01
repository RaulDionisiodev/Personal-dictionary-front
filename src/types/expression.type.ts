import category from "./category.type";
import Example from "./example";

export default interface Expresion{
    id?: any | null,
    text: string,
    translation: string,
    category: category,
    exampleList: Example[]
}