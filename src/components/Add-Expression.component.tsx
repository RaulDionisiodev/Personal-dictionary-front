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
      examples: []
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
        examples: [...this.state.examples, e.target.value]
    })      
  }
  saveExpression() {
    const data: Expression = {
      text: this.state.text,
      translation: this.state.translation,
      examples: this.state.examples
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
        <p>Work in progress</p>
    )
  }
}