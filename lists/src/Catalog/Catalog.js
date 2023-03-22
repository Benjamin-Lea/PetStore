import React, { Component } from 'react';
import '../app.css';
import './Catalog.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import DataTable from 'react-data-table-component';

const columns = [
    {
        name: 'Name',
        selector: row => row.name,
        width: "auto",
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
        selector: row => row.imageURL,
        // show image in table

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
                <input type="text" value={this.state.filterText} placeholder="Search..." onChange={this.updateFilter.bind(this)} />
                <DataTable
                    columns={columns}
                    data={this.state.data.filter((item) => {
                        if (this.state.filterText === "") {
                            return item;
                        } else if (
                            item.name.toLowerCase().includes(this.state.filterText.toLowerCase())
                            || item.price == this.state.filterText
                            || item.type.toLowerCase().includes(this.state.filterText.toLowerCase())
                            || item.species.toLowerCase().includes(this.state.filterText.toLowerCase())
                            || item.breed.toLowerCase().includes(this.state.filterText.toLowerCase())
                            || item.age ==  this.state.filterText
                            || item.gender.toLowerCase().includes(this.state.filterText.toLowerCase())
                        ) {
                            return item;
                        }
                    })}
                />
            </div>
        )
    }
}

export default Catalog;