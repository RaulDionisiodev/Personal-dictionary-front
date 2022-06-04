
import { Component, ChangeEvent} from "react";
import { RouteComponentProps } from 'react-router-dom';
import ExpressionDataService from "../services/Expression.service";
import Expression from "../types/expression.type";
import NewExpressionDTO from "../types/newExpressionDto.type";
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
    this.updateExpression = this.updateExpression.bind(this);
    this.deleteExpression = this.deleteExpression.bind(this);
    this.state = {
      currentExpression: {
        expressionId: null,
        text: "",
        translation: "",
        category: {
          categoryName: ""
        },
        exampleList: [],
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
  onChangeCategory(e:ChangeEvent<HTMLSelectElement>){
    console.log(e.target.value)
    this.setState((prevState) => ({
      currentExpression: {
        ...prevState.currentExpression,
        category: {
          categoryName : e.target.value
        }
      }
    })
      
    )
  }
  createStringList(){
    let stringList: String[] = []
    // eslint-disable-next-line array-callback-return
    this.state.currentExpression.exampleList.map((example, index) => {
       stringList.push(example.text);
    })
    return stringList;
  }

  getExpression(id: string) {
    ExpressionDataService.get(id)
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
  updateExpression() {
    const data: NewExpressionDTO = {
      id: this.state.currentExpression.expressionId,
      text: this.state.currentExpression.text,
      translation: this.state.currentExpression.translation,
      category: this.state.currentExpression.category.categoryName,
      exampleList: this.createStringList()
    };
    ExpressionDataService.update(data)
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
    ExpressionDataService.delete(this.state.currentExpression.expressionId)
      .then((response: any) => {
        console.log(response.data);
        this.props.history.push("/dictionary");
      })
      .catch((e: Error) => {
        console.log(e);
      });
  }
  render() {
    const { currentExpression } = this.state;
    return (
      <div>
        {currentExpression ? (
          <div className="edit-form">
            <h4>Tutorial</h4>
            <form>
              <div className="form-group">
                <label htmlFor="text">Text</label>
                <input
                  type="text"
                  className="form-control"
                  id="text"
                  value={currentExpression.text}
                  onChange={this.onChangeText}
                />
              </div>
              <div className="form-group">
                <label htmlFor="translation">Translation</label>
                <input
                  type="text"
                  className="form-control"
                  id="translation"
                  value={currentExpression.translation}
                  onChange={this.onChangeTranslation}
                />
              </div>
              <div className="form-group">
                <label htmlFor="translation">Translation</label>
                {currentExpression.exampleList.map((example, index) =>
                  <input
                    type="text"
                    className="form-control"
                    id="translation"
                    key={index}
                    value={example.text}
                    onChange={this.onChangeTranslation}
                  />)}
              </div>
              <div className="form-group">
                <label htmlFor="category">Word Classes</label>
                <select name="category" id="category" className="custom-select"
                  value={currentExpression.category.categoryName} onChange={this.onChangeCategory}>
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
            <p>{this.state.message}</p>
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