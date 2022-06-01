import { Component, ChangeEvent } from "react";
import { RouteComponentProps } from "react-router-dom";
import ExpresionDataService from "../services/Expression.service";
import ExpressionDto from '../types/expressiondto.type';
import NewExpression  from '../types/newExpressionDto.type'

interface RouterProps {
  history: string;
}

type Props = RouteComponentProps<RouterProps>;;

type State = ExpressionDto;

export default class AddExpression extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.onChangeText = this.onChangeText.bind(this);
    this.onChangeTranslatiom = this.onChangeTranslatiom.bind(this);
    this.onChangeCategory = this.onChangeCategory.bind(this);
    this.onChangeFirstExample = this.onChangeFirstExample.bind(this);
    this.onChangeSecondExample = this.onChangeSecondExample.bind(this);
    this.onChangeThirdExample = this.onChangeThirdExample.bind(this);
    this.onChangeFourthExample = this.onChangeFourthExample.bind(this);
    this.saveExpression = this.saveExpression.bind(this);
    this.newExpression = this.newExpression.bind(this);
    this.createExample = this.createExample.bind(this);
    this.state = {
      id: null,
      text: "",
      translation: "",
      category: "",
      first_example: "",
      second_example: "",
      third_example: "",
      fourth_example: "",
    };
  }
  onChangeText(e: ChangeEvent<HTMLInputElement>) {
    this.setState({
      text: e.target.value
    });
  }
  onChangeTranslatiom(e: ChangeEvent<HTMLInputElement>) {
    this.setState({
      translation: e.target.value
    });
  }
  onChangeCategory(e: ChangeEvent<HTMLSelectElement>){
    console.log(e.target.value)
    this.setState({
      category: e.target.value
    })
  }
  onChangeFirstExample(e: ChangeEvent<HTMLInputElement>){
    this.setState({
      first_example:  e.target.value
    })      
  }
  onChangeSecondExample(e: ChangeEvent<HTMLInputElement>){
    this.setState({
      second_example:  e.target.value
    })      
  }
  onChangeThirdExample(e: ChangeEvent<HTMLInputElement>){
    this.setState({
      third_example:  e.target.value
    })      
  }
  onChangeFourthExample(e: ChangeEvent<HTMLInputElement>){
    this.setState({
      fourth_example:  e.target.value
    })      
  }
  saveExpression() {
    const data: NewExpression = {
      text: this.state.text,
      translation: this.state.translation,
      category: this.state.category,
      exampleList: this.createExample(),
    };
    ExpresionDataService.create(data)
      .then((response: any) => {
        this.setState({
          id: response.data.id,
          text: response.data.text,
          translation: response.data.translation,
        });
        this.props.history.push("/home");
      })
      .catch((e: Error) => {
        console.log(e);
        alert("Sorry, please try again")
      });
  }
  newExpression() {
    this.setState({
      id: null,
      text: "",
      translation: "",

    });
  }

  createExample(){
    const exampleList: String[] = [this.state.first_example,this.state.second_example, 
      this.state.third_example, this.state.fourth_example]
     return exampleList;
}


  render() {
    return(
        
      <div className="submit-form">
        <div>
          <div className="form-group">
            <label htmlFor="text">Text</label>
            <input
              type="text"
              className="form-control"
              id="text"
              required
              value={this.state.text}
              onChange={this.onChangeText}
              name="text"
            />
          </div>
          <div className="form-group">
            <label htmlFor="translation">Translation</label>
            <input
              type="text"
              className="form-control"
              id="translation"
              required
              value={this.state.translation}
              onChange={this.onChangeTranslatiom}
              name="translation"
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
          <button onClick={this.saveExpression} className="btn btn-success">
            Submit
          </button>
        </div>
    </div>
    )
  }
}