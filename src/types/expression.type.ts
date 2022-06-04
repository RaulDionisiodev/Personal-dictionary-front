import category from "./category.type";
import Example from "./example";

export default interface Expresion{
    expressionId?: any | null,
    text: string,
    translation: string,
    category: category,
    exampleList: Example[]
}