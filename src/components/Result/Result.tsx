import * as React from 'react';
import Loader from 'react-loader-spinner';

interface IProps {
  result: string,
  filelength: any
}

export default class Result extends React.Component<IProps,{}> {
  
  public render() {
    return (
      <div className="spinText">
        {
          this.props.result === "" && this.props.filelength > 0 ?
            <Loader type="TailSpin" color="#00BFFF" /> :
            <p>{this.props.result}</p>
        }
      </div>
    )
  }
}