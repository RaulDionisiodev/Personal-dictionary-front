import { Component, ChangeEvent } from "react";
import ExpressionDataService from "../services/Expression.service";
import { Link } from "react-router-dom";
import Expression from '../types/expression.type';
type Props = {};
type State = {
  expression: Array<Expression>,
  currentExpression: Expression | null,
  currentIndex: number,
  searchText: string
};
export default class Dictionary extends Component<Props, State>{
  constructor(props: Props) {
    super(props);
    this.onChangeSearchText = this.onChangeSearchText.bind(this);
    this.retrieveExpression = this.retrieveExpression.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveExpression = this.setActiveExpression.bind(this);
    this.searchText = this.searchText.bind(this);
    this.state = {
      expression: [],
      currentExpression: null,
      currentIndex: -1,
      searchText: ""
    };
  }
  componentDidMount() {
    this.retrieveExpression();
  }
  onChangeSearchText(e: ChangeEvent<HTMLInputElement>) {
    const searchText = e.target.value;
    this.setState({
      searchText: searchText
    });
  }
  retrieveExpression() {
    ExpressionDataService.findAll()
      .then((response: any) => {
        this.setState({
          expression: response.data
        });
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  }
  refreshList() {
    this.retrieveExpression();
    this.setState({
      currentExpression: null,
      currentIndex: -1
    });
  }
  setActiveExpression(expression: Expression, index: number) {
    this.setState({
      currentExpression: expression,
      currentIndex: index
    });
  }
  searchText() {
    this.setState({
      currentExpression: null,
      currentIndex: -1
    });
    ExpressionDataService.findBytext(this.state.searchText)
      .then((response: any) => {
        this.setState({
          expression: response.data
        });
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  }
  render() {
    const { searchText, expression, currentExpression, currentIndex } = this.state;
    return (
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by text"
              value={searchText}
              onChange={this.onChangeSearchText}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={ 
                  this.state.searchText ? this.searchText : this.retrieveExpression}
              >
                Search
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <h4>Expression List</h4>
          <ul className="list-group">
            {expression &&
              expression.map((expression: Expression, index: number) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveExpression(expression, index)}
                  key={index}
                >
                  {expression.text}
                </li>
              ))}
          </ul>
        </div>
        <div className="col-md-6">
          {currentExpression ? (
            <div>
              <h4>Expression</h4>
              <div>
                <label>
                  <strong>Text:</strong>
                </label>{" "}
                {currentExpression.text}
              </div>
              <div>
                <label>
                  <strong>Translation:</strong>
                </label>{" "}
                {currentExpression.translation}
              </div>
              <div>
                <label>
                  <strong>Word class:</strong>
                </label>{" "}
                {currentExpression.category.categoryName}
              </div>
              <div>
                <label>
                  <strong>Examples:</strong>
                </label>{" "}
                <ul>
                  {currentExpression.exampleList.map( (example, index) =>
                    <li key={index}>{example.text}</li>)}
                </ul>
                
              </div>
              <Link
                to={"/expression/" + currentExpression.id}
                className="badge badge-warning"
              >
                Edit
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on an expression...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}