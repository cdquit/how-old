import * as React from 'react';
import ReactDropZone from 'react-dropzone';
import './DropArea.css';

interface IState {
    imageFiles: any[],
    dropzone: any
}

interface IProps {
    setResults: any
}

export default class DropArea extends React.Component<IProps, IState> {
    constructor(props: any) {
        super(props);
        this.state = {
            imageFiles: [],
            dropzone: this.onDrop.bind(this)
        }
    }

    public onDrop(files: any) {
        this.setState({
            imageFiles: files
        })
        this.props.setResults("", this.state.imageFiles.length);
        const file = files[0];
        const reader = new FileReader();
        reader.onload = (event) => {
            const binaryString = (event.target as FileReader).result;
            if (typeof binaryString === "string") {
                this.upload(btoa(binaryString));
            }
        };
        try {
            reader.readAsBinaryString(file);
        } catch (error) {
            this.props.setResults("Sorry we had trouble loading that file please use a downloaded image file", 0);
        }
    }

    public upload(base64String: any){
        const base64 = require('base64-js');
        const byteArray = base64.toByteArray(base64String);
        fetch('https://whatsmyage.azurewebsites.net/image', {
            body: byteArray,
            headers: {
                'Content-Type': 'application/octet-stream',
            },
            method: 'POST'
        })
            .then((response: any) => {
                if (!response.ok) {
                    this.props.setResults("Sorry there was an error!", this.state.imageFiles.length);
                } else {
                    response.json().then((json: any[]) => {
                        if (json.length < 1) {
                            this.props.setResults("Show your face hmm...", this.state.imageFiles.length);
                        } else {
                            const age = json[0].faceAttributes.age;
                            let text = "Baby^^ This is 18+. Leave right away!";
                            if (age > 70)
                                text = "Geez... You are old.";
                            else if (age > 50)
                                text = "Do somethin";
                            else if (age > 30)
                                text = "Do somethin in your life. Age don't matter.";
                            else if (age > 20)
                                text = "Yay! Party time. Booze please.";
                            else if (age > 10)
                                text = "Oh no, you're almost 18. Almost there. Hang in there";
                            else if (age > 5)
                                text = "You are just starting your life. Come back later.";
                            
                            this.props.setResults("My intelligence says you are " + age + " years old. " + text, this.state.imageFiles.length);
                            
                            // this.props.setResults("Age is " + json[0].faceAttributes.age, this.state.imageFiles.length);
                        }
                    })
                }
            })
    }

    public render() {
        return (
            <div className="cont">
                <div className="centreText">
                    <div className="dropZone">
                        <ReactDropZone accept='image/*' onDrop={this.state.dropzone} className="dropHere">
                            <div className="dropZoneText">
                                {
                                    this.state.imageFiles.length > 0 ?
                                        <div>{this.state.imageFiles.map((file) => <img className="image" key={file.name} src={file.preview} alt="someImage" />)}</div> :
                                        <p>Try dropping some files here, or click to select files to upload.</p>
                                }
                            </div>
                        </ReactDropZone>
                    </div>
                </div>
            </div>
        )
    }
}