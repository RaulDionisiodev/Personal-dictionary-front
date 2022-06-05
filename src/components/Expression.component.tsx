
import { Component, ChangeEvent} from "react";
import { RouteComponentProps } from 'react-router-dom';
import ExpressionDataService from "../services/Expression.service";
import Expression from "../types/expression.type";
import ExpressionDto from "../types/expressiondto.type";
import NewExpressionDTO from "../types/newExpressionDto.type";

interface RouterProps { // type for `match.params`
  id: string; // must be type `string` since value comes from the URL
}
type Props = RouteComponentProps<RouterProps>;
type State = ExpressionDto;
export default class ExpressionDetail extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.onChangeText = this.onChangeText.bind(this);
    this.onChangeTranslation = this.onChangeTranslation.bind(this);
    this.onChangeCategory = this.onChangeCategory.bind(this);
    this.onChangeFirstExample = this.onChangeFirstExample.bind(this);
    this.onChangeSecondExample = this.onChangeSecondExample.bind(this);
    this.onChangeThirdExample = this.onChangeThirdExample.bind(this);
    this.onChangeFourthExample = this.onChangeFourthExample.bind(this);
    this.getExpression = this.getExpression.bind(this);
    this.updateExpression = this.updateExpression.bind(this);
    this.deleteExpression = this.deleteExpression.bind(this);
    this.state = {
        id: null,
        text: "",
        translation: "",
        category:"",
        first_example: "",
        second_example: "",
        third_example: "",
        fourth_example:"",
    };
  }
  componentDidMount() {
    this.getExpression(this.props.match.params.id);
  }
  onChangeText(e: ChangeEvent<HTMLInputElement>) {
    const text = e.target.value;
    this.setState({
          text: text,
        });
  }
  onChangeTranslation(e: ChangeEvent<HTMLInputElement>) {
    const translation = e.target.value;
    this.setState({
      translation: translation
    })
  }
  onChangeCategory(e:ChangeEvent<HTMLSelectElement>){
   this.setState({
     category: e.target.value
   })
  }
  onChangeFirstExample(e: ChangeEvent<HTMLInputElement>){
    this.setState({
      first_example: e.target.value
    })     
  }
  onChangeSecondExample(e: ChangeEvent<HTMLInputElement>){
    this.setState({
      second_example: e.target.value
    })      
  }
  onChangeThirdExample(e: ChangeEvent<HTMLInputElement>){
    this.setState({
      third_example: e.target.value
    }) 
  }
  onChangeFourthExample(e: ChangeEvent<HTMLInputElement>){
    this.setState({
      fourth_example: e.target.value
    })   
  }
  createStringList(){
    const exampleList: String[] = [this.state.first_example,this.state.second_example, 
      this.state.third_example, this.state.fourth_example]
     return exampleList;
  }

  getExpression(id: string) {
    ExpressionDataService.get(id)
      .then((response: any) => {
        this.setState({
            id: response.data.expressionId,
            text: response.data.text,
            translation: response.data.translation,
            category: response.data.category.categoryName,
            first_example: response.data.exampleList.length > 0 ? response.data.exampleList[0].text : "",
            second_example:response.data.exampleList.length > 1 ? response.data.exampleList[1].text : "",
            third_example: response.data.exampleList.length > 2 ? response.data.exampleList[2].text : "",
            fourth_example:response.data.exampleList.length > 3 ? response.data.exampleList[3].text : ""
          }
        );       
      })
      .catch((e: Error) => {
        console.log(e);
      });
  }
  updateExpression() {
    const data: NewExpressionDTO = {
      id: this.state.id,
      text: this.state.text,
      translation: this.state.translation,
      category: this.state.category,
      exampleList: this.createStringList()
    };
    ExpressionDataService.update(data)
      .then((response: any) => {
        console.log(response.data);
        alert("The Expression was updated successfully!")
        this.props.history.push("/dictionary")
      })
      .catch((e: Error) => {
        console.log(e);
      });
  }
  deleteExpression() {
    ExpressionDataService.delete(this.state.id)
      .then((response: any) => {
        console.log(response.data);
        this.props.history.push("/dictionary");
      })
      .catch((e: Error) => {
        console.log(e);
      });
  }

  expressionToDto(expression : Expression){
    console.log(expression)
     const dto : ExpressionDto = {
        id : expression.expressionId,
        text : expression.text,
        category: expression.category.categoryName,
        translation: expression.translation,
        first_example: expression.exampleList.length > 0 ? expression.exampleList[0].text : "",
        second_example:expression.exampleList.length > 1 ? expression.exampleList[1].text : "",
        third_example: expression.exampleList.length > 2 ? expression.exampleList[2].text : "",
        fourth_example:expression.exampleList.length > 3 ? expression.exampleList[3].text : ""
      }

      return dto;
  }

  render() {
    return (
      <div>
        {this.state ? (
          <div className="edit-form">
            <h4>Tutorial</h4>
            <form>
              <div className="form-group">
                <label htmlFor="text">Text</label>
                <input
                  type="text"
                  className="form-control"
                  id="text"
                  value={this.state.text}
                  onChange={this.onChangeText}
                />
              </div>
              <div className="form-group">
                <label htmlFor="translation">Translation</label>
                <input
                  type="text"
                  className="form-control"
                  id="translation"
                  value={this.state.translation}
                  onChange={this.onChangeTranslation}
                />
              </div>
              <div className="form-group">
                <label htmlFor="category">Word Classes</label>
                <select name="category" id="category" className="custom-select"
                  value={this.state.category} onChange={this.onChangeCategory}>
                  <option defaultValue={""}>Choose...</option>
                  <option value="Noum">Noum</option>
                  <option value="Adjective">Adjective</option>
                  <option value="Verb">Verb</option>
                  <option value="Adverb">Adverb</option>
                  <option value="Preposition">Preposition</option>
                  <option value="Conjunction">Conjunction</option>
                  <option value="Pronoun">Pronoun</option>
                  <option value="Interjection">Interjection</option>
                </select>
              </div>
              <div className="form-group">
            <label htmlFor="example">Example #1</label>
            <input
              type="text"
              className="form-control"
              id="example1"
              required
              value={this.state.first_example}
              onChange={this.onChangeFirstExample}
              name="example1"
            />
          </div>
          <div className="form-group">
            <label htmlFor="example">Example #2</label>
            <input
              type="text"
              className="form-control"
              id="example2"
              required
              value={this.state.second_example}
              onChange={this.onChangeSecondExample}
              name="example2"
            />
          </div>
          <div className="form-group">
            <label htmlFor="example">Example #3</label>
            <input
              type="text"
              className="form-control"
              id="example3"
              required
              value={this.state.third_example}
              onChange={this.onChangeThirdExample}
              name="example3"
            />
          </div>
          <div className="form-group">
            <label htmlFor="example">Example #4</label>
            <input
              type="text"
              className="form-control"
              id="example4"
              required
              value={this.state.fourth_example}
              onChange={this.onChangeFourthExample}
              name="example4"
            />
            </div>
            </form>
            <button
              className="badge badge-danger mr-2"
              onClick={this.deleteExpression}
            >
              Delete
            </button>
            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateExpression}
            >
              Update
            </button>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Tutorial...</p>
          </div>
        )}
      </div>
    );
  }
}