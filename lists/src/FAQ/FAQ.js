import React, { Component } from 'react';
import '../app.css'
import 'bootstrap/dist/css/bootstrap.min.css';

class FAQ extends Component {
    constructor() {
        super();
        this.state = {
            data: [],
            question: '',
        };
    }
    componentDidMount() {
        fetch('/faqData')
            .then(response => response.json())
            .then(responseData => {
                this.setState({ data: responseData });
            })
    }

    handleChange(e) {
        this.setState({ question: e.target.value });
    }

    handleSubmit(e) {
        window.location.reload();
        e.preventDefault();
        fetch('/addQuestion', {
            headers: { 'Content-Type': 'application/json' },
            method: 'POST',
            body: JSON.stringify(
                {
                    question: this.state.question
                }
            )
        });
        this.setState({
            qustion: ''
        });
    }

    render() {
        return (
            <div className='FAQ'>
                <h1>FAQ</h1>
                <div className='FAQ-questions'>
                    {this.state.data.map(item => (
                        <div className='FAQ-question'>
                            <h2>Q: {item.question}</h2>
                            <p>A: {item.answer}</p>
                        </div>
                    ))}
                </div>
                <br />
                <div className='FAQ-form'>
                    <h1>Have a question that isn't answered here?</h1>
                    <p>Fill out the form below and we'll get back to you as soon as possible!</p>
                    <form className='form-group row g-3' onSubmit={this.handleSubmit.bind(this)}>
                        <div className='col'>
                            <label for="name">Question</label>
                            <input type="text" className="form-control" id="question" placeholder="Enter your question" value={this.state.question} onChange={this.handleChange.bind(this)}/>
                        </div>
                    </form>
                </div>

            </div>
        );
    }
}

export default FAQ;
