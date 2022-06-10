import { Component } from "react";
type Props = {};
type State = {
  content: string;
}
export default class Home extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      content: ""
    };
  }
  render() {
    return (
      <>
        <header className="jumbotron">
          <div className="container">
            <h1 className="display-3 text-center">Seu Dicionário Pessoal</h1>
            <p></p>
          </div>
        </header>

        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <h2>Crie seu próprio dicionário</h2>
              <p>Crie seu perfil de usuário, faça login e crie um dicionário com as expressões que você quer e precisa aprender!</p>
              <p><a className="btn btn-primary" href="/register" role="button">Crie seu perfil &raquo;</a></p>
            </div>
            <div className="col-md-4">
              <h2>Melhore seu vocabulário</h2>
              <p>Sempre que encontrar uma palavra nova, clique em 'Add' e a registre. Volte e consulte sua tradução em poucos minutos!</p>
              <p><a className="btn btn-primary" href="/add" role="button">Adcione expressões &raquo;</a></p>
            </div>
            <div className="col-md-4">
              <h2>Aprimore um vocabulário específico</h2>
              <p>Adicione vocabulário de acordo com a sua necessidade e interesses. Insira, consulte e aprenda com mais facilidade!</p>
              <p><a className="btn btn-primary" href="/dictionary" role="button">Revise suas anotações &raquo;</a></p>
            </div>
          </div>
        </div>

      </>
    );
  }
}