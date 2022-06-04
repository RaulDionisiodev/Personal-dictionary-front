import NewExpression  from "../types/newExpressionDto.type";
import http from "../common/http-common";
import Expression from "../types/expression.type"

class ExpresionDataService{
    
    findAll() {
        return http.get<Array<Expression>>("/expression")
    }  

    get(id: string){
        return http.get<Expression>(`/expression/id=${id}`)
    }

    create(data: NewExpression){
        return http.post<Expression>("/expression", data)
    }

    update(data: NewExpression){
        return http.post<Expression>("/expression/update", data)
    }

    delete(id: number){
        return http.delete<any>(`/expression/${id}`)
    }

    findBytext(text: string){
        return http.get<Array<Expression>>(`/expression/text=${text}`)
    }
}

export default new ExpresionDataService()