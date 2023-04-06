import React, { Component } from "react";
import { InputGroup, Form, Dropdown, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import "../app.css";
import SLideShowItem from "./SlideShowItem.js";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

class Home extends Component {
  constructor() {
    super();
    this.state = {
      lists: [],
      pets: {},
      filterText: "",
      data: [],
      showDropdown: false, // new state for showing/hiding the dropdown
      email: "",
      qualm: ""
    };
  }

  // Get the data from the server
  componentDidMount() {
    fetch('/catalogData')
      .then(response => response.json())
      .then(responseData => {
        this.setState({ data: responseData });
      })
  }

  renderSlides() {
    if (this.state.lists != null) {
      return this.state.data.map((item) => {
        if (item.species != "-") {
          return (
            <div key={item.id}>
              <SLideShowItem list={item.species} name={item.name} imageURLs={item.imageURL} id={item} />
            </div>
          );
        } else {
          return (
            <div key={item.id}>
              <SLideShowItem list="" name={item.name} imageURLs={item.imageURL} id={item} />
            </div>
          );
        }
      });
    }
  }

  toggleDropdown() {
    this.setState({ showDropdown: !this.state.showDropdown });
  }

  gotoDropDownItem(item) {
    window.location.href = '/petDetails/' + item.id;
  }

  dropDownRender(item) {
    if (item.species != "-") {
      return (
        <div>
          <span class="dropdown-catagory">{item.species}</span>
          <span class="dropdown-name">{item.name}</span>
          <span class="dropdown-details">{item.breed}</span>
        </div>
      )
    } else {
      return (
        <div>
          <span class="dropdown-catagory">Pet Supplies: </span>
          <span class="dropdown-details"> {item.name} </span>
        </div>
      )
    }
  }

  // Render the filtered items as dropdown items
  renderDropdownItems() {
    return this.state.data.filter((item) => {
      if (this.state.filterText.length < 1)
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
    }).map((item) => (
      <Dropdown.Item key={item.id} onClick={(event) => this.gotoDropDownItem(item)}>
        {this.dropDownRender(item)}
      </Dropdown.Item>
    ));
  }

  updateFilter(event) {
    this.setState({ filterText: event.target.value });
  }

  emailChange(e) {
    this.setState({ email: e.target.value });
  }

  qualmChange(e) {
    this.setState({ qualm: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({ email: "", qualm: "" });
    alert("Thank you for your feedback!");
  }

  render() {
    const settings = {
      dots: true,
      arrows: false, // add this line to show arrows
      infinite: true,
      speed: 1000,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplaySpeed: 5000,
    };
    const inputGroupStyle = {
      maxWidth: "900px",
      margin: "auto",
      marginTop: "10px",
      marginBottom: "10px",
    };
    return (
      // Code Ideas take from: https://react-bootstrap.github.io/components/dropdowns/
      <div style={{ margin: "auto" }}>
        <InputGroup size="sm" className='InputGroup' style={inputGroupStyle}>
          <Form.Control aria-label="Large" aria-describedby="inputGroup-sizing-sm" value={this.state.filterText} placeholder="What are you looking for?" onChange={this.updateFilter.bind(this)} />
          <Dropdown size="sm" show={this.state.showDropdown} align={{ sm: 'start', md: 'start', lg: 'start', xl: 'start' }}>
            <Dropdown.Toggle onClick={this.toggleDropdown.bind(this)} variant="dark">
              Show Results
            </Dropdown.Toggle>
            <Dropdown.Menu size="sm" style={{ width: "100%" }}>
              {this.renderDropdownItems()}
            </Dropdown.Menu>
          </Dropdown>
        </InputGroup>
        <Slider {...settings}>
          {this.renderSlides()}
        </Slider>
        <div align="center">
          <Link to="/catalog" class="btn btn-success btn-lg" style={{ margin: "auto", marginTop: "35px" }}>See Catalog</Link>
        </div>
        <br></br>
        <div className="ContactUs">
          <h1>End of the Line Pet Shop</h1>
          <div className="FAQ-form">
            <h1>Get in contact with us.</h1>
            <form className='form-group row g-3' onSubmit={this.handleSubmit.bind(this)}>
              <div className='col'>
                <input type="email" className="form-control" id="email" required="true" placeholder="
                        Enter your email" value={this.state.email} onChange={this.emailChange.bind(this)} />
                <input type="text" className="form-control" id="qualm" required="true" placeholder="
                        What's your qualm?" value={this.state.qualm} onChange={this.qualmChange.bind(this)} />
                <Button type="submit" className="btn btn-primary" >Submit</Button>
              </div>
            </form>
          </div>
          <div className="Links">
            <Link to="/catalog" class="btn btn-success btn-lg" style={{ margin: "auto", marginTop: "35px" }}>See Catalog</Link>
            <Link to="/FAQ" class="btn btn-success btn-lg" style={{ margin: "auto", marginTop: "35px" }}>See FAQ</Link>
          </div>
        </div>
      </div>
    )
  }
}

export default Home;
