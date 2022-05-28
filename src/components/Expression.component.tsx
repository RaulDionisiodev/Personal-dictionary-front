
import { Component, ChangeEvent } from "react";
import { RouteComponentProps } from 'react-router-dom';
import ExpressionDataService from "../services/Expression.service";
import Expression from "../types/expression.type";
interface RouterProps { // type for `match.params`
  id: string; // must be type `string` since value comes from the URL
}
type Props = RouteComponentProps<RouterProps>;
type State = {
  currentExpression: Expression;
  message: string;
}
export default class ExpressionDetail extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.onChangeText = this.onChangeText.bind(this);
    this.onChangeTranslation = this.onChangeTranslation.bind(this);
    this.getExpression = this.getExpression.bind(this);
    this.updatePublished = this.updatePublished.bind(this);
    this.updateExpression = this.updateExpression.bind(this);
    this.deleteExpression = this.deleteExpression.bind(this);
    this.state = {
      currentExpression: {
        id: null,
        text: "",
        translation: "",
        examples:[],
      },
      message: "",
    };
  }
  componentDidMount() {
    this.getExpression(this.props.match.params.id);
  }
  onChangeText(e: ChangeEvent<HTMLInputElement>) {
    const text = e.target.value;
    this.setState(function (prevState) {
      return {
        currentExpression: {
          ...prevState.currentExpression,
            text: text,
        },
      };
    });
  }
  onChangeTranslation(e: ChangeEvent<HTMLInputElement>) {
    const translation = e.target.value;
    this.setState((prevState) => ({
      currentExpression: {
        ...prevState.currentExpression,
        translation: translation,
      },
    }));
  }
  getExpression(id: string) {
    ExpressionDataService.get(id as unknown as number)
      .then((response: any) => {
        this.setState({
          currentExpression: response.data,
        });
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  }
  updatePublished(status: boolean) {
    const data: Expression = {
      id: this.state.currentExpression.id,
      text: this.state.currentExpression.text,
      translation: this.state.currentExpression.translation,
      examples: this.state.currentExpression.examples
    };
    ExpressionDataService.update(data)
      .then((response: any) => {
        this.setState((prevState) => ({
          currentExpression: {
            ...prevState.currentExpression
          },
          message: "The expression was updated successfully!"
        }));
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  }
  updateExpression() {
    ExpressionDataService.update(
      this.state.currentExpression,
    )
      .then((response: any) => {
        console.log(response.data);
        this.setState({
          message: "The Expression was updated successfully!",
        });
      })
      .catch((e: Error) => {
        console.log(e);
      });
  }
  deleteExpression() {
    ExpressionDataService.delete(this.state.currentExpression.id)
      .then((response: any) => {
        console.log(response.data);
        this.props.history.push("/dictionary");
      })
      .catch((e: Error) => {
        console.log(e);
      });
  }
  render() {
    return(
        <p>in progress</p>
    )
  }
}