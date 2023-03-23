import React, { Component } from 'react';
import { Col, Row, InputGroup, Form } from 'react-bootstrap';
import '../app.css';
import './Catalog.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import StoreItem from './StoreItem';

const columns = [
    {
        name: 'Name',
        selector: row => row.name,

    },
    {
        name: 'Price',
        selector: row => row.price,
    },
    {
        name: 'Type',
        selector: row => row.type,
    },
    {
        name: 'Image',
        Cell: props => (<img src={props.row.imageURL} alt="pet" />)

    },
    {
        name: 'Species',
        selector: row => row.species,
    },
    {
        name: 'Breed',
        selector: row => row.breed,
    },
    {
        name: 'Age',
        selector: row => row.age,
    },
    {
        name: 'Gender',
        selector: row => row.gender,
    },
];


class Catalog extends Component {
    constructor() {
        super();
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
                            <StoreItem item={item} />
                        </Col>
                    ))}
                </Row>
            </div>
        )
    }
}

export default Catalog;