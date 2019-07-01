import * as React from 'react';
import Header from './components/Header/Header';
import DropArea from './components/DropArea/DropArea';
import Result from './components/Result/Result';
import Footer from './components/Footer/Footer';

interface IState {
  result: string,
  filelength: number
}

class App extends React.Component<{}, IState> {
  public constructor(props: any) {
    super(props);
    this.state = {
      result: "",
      filelength: 0
    }
  }

  public resultstate = (resultString: string, filelen: any) => {
    this.setState({result: resultString, filelength: filelen})
  }

  public render() {
    return (
      <div>
        <Header />
        <DropArea setResults={this.resultstate} />
        <Result result={this.state.result} filelength={this.state.filelength} />
        <Footer />
      </div>
    );
  }
}

export default App;