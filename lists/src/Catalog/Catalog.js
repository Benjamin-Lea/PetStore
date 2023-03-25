import React, { Component } from 'react';
import { Col, Row, InputGroup, Form } from 'react-bootstrap';
import '../app.css';
import './Catalog.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { StoreItem } from './StoreItem';

class Catalog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            filterText: ""
        };
    }

    componentDidMount() {
        fetch('/catalogData')
            .then(response => response.json())
            .then(responseData => {
                this.setState({ data: responseData });
            })
    }

    updateFilter(event) {
        this.setState({ filterText: event.target.value });
    }

    render() {
        return (
            <div className='Catalog'>
                <InputGroup size="lg" className='InputGroup'>
                    <Form.Control
                        aria-label="Large"
                        aria-describedby="inputGroup-sizing-sm"
                        value={this.state.filterText}
                        placeholder="Search..."
                        onChange={this.updateFilter.bind(this)}
                    />
                </InputGroup>
                <Row md={2} lg={3} xl={4} className="g-3">
                    {this.state.data.filter((item) => {
                        if (this.state.filterText === "")
                            return item;
                        else if (
                            item.name.toLowerCase().includes(this.state.filterText.toLowerCase())
                            || item.price == this.state.filterText
                            || item.type.toLowerCase().includes(this.state.filterText.toLowerCase())
                            || item.species.toLowerCase().includes(this.state.filterText.toLowerCase())
                            || item.breed.toLowerCase().includes(this.state.filterText.toLowerCase())
                            || item.age == this.state.filterText
                            || item.gender.toLowerCase().includes(this.state.filterText.toLowerCase())
                        )
                            return item;
                    }).map(item => (
                        <Col key={item.id}>
                            <StoreItem {...item} />
                        </Col>
                    ))}
                </Row>
            </div>
        )
    }
}

export default Catalog;