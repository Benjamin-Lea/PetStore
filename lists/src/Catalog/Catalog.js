import React, { Component } from 'react';
import '../app.css';
import './Catalog.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import DataTable from 'react-data-table-component';

const columns = [
    {
        name: 'Title',
        selector: row => row.title,
    },
    {
        name: 'Year',
        selector: row => row.year,
    },
];

const data = [
    {
        id: 1,
        title: 'Beetlejuice',
        year: '1988',
    },
    {
        id: 2,
        title: 'Ghostbusters',
        year: '1984',
    },
]

class Catalog extends Component {
    constructor() {
        super();
        this.state = {
            lists: [], // this holds the name of each list
            items: {}, // this property names of this object are the names of the lists; their values are arrays of the items in each list
            filterText: ""
        };
    }

    componentDidMount() {
        fetch('/adminData')
            .then(response => response.json())
            .then(listsData => {
                this.setState({ lists: listsData.lists, items: listsData.items });
            });
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
                    data={data.filter((item) => {
                        if (this.state.filterText === "") {
                            return item;
                        } else if (
                            item.title.toLowerCase().includes(this.state.filterText.toLowerCase())
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