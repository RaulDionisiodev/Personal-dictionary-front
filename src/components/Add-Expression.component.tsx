import { Component, ChangeEvent } from "react";
import ExpresionDataService from "../services/Expression.service";
import Expression from '../types/expression.type';


type Props = {};

type State = Expression;

export default class AddExpression extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.onChangeText = this.onChangeText.bind(this);
    this.onChangeTranslatiom = this.onChangeTranslatiom.bind(this);
    this.onChangeExamples = this.onChangeExamples.bind(this);
    this.saveExpression = this.saveExpression.bind(this);
    this.newExpression = this.newExpression.bind(this);
    this.state = {
      id: null,
      text: "",
      translation: "",
      exampleList: []
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
  onChangeExamples(e: ChangeEvent<HTMLInputElement>){
    this.setState({
      exampleList: [...this.state.exampleList, {id:"", text: e.target.value}]
    })      
  }
  saveExpression() {
    const data: Expression = {
      text: this.state.text,
      translation: this.state.translation,
      exampleList: this.state.exampleList
    };
    ExpresionDataService.create(data)
      .then((response: any) => {
        this.setState({
          id: response.data.id,
          text: response.data.text,
          translation: response.data.translation,
        });
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  }
  newExpression() {
    this.setState({
      id: null,
      text: "",
      translation: "",

    });
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
            <label htmlFor="example">Example</label>
            <input
              type="text"
              className="form-control"
              id="example"
              required
              value="Insert the example list"
              onChange={this.onChangeExamples}
              name="example"
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