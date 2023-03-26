import React, { Component } from "react";
import Slider from 'react-slick';
// Import css files
import '../app.css';
import SLideShowItem from "./SlideShowItem.js";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Uses https://react-slick.neostack.com/docs/example/simple-slider

class Home extends Component {
  constructor() {
    super();
    this.state = {
      lists: [], // this holds the name of each list
      pets: {} // this property names of this object are the names of the lists; their values are arrays of the pets in each list
    };
  }

  // Get the data from the server
  componentDidMount() {
    fetch('/animalData')
      .then(response => response.json())
      .then(listsData => {
        this.setState({ lists: listsData.lists, pets: listsData.pets });
      })
  }

  renderSlides() {
    console.log(this.state.pets)
    if (this.state.lists != null) {
      return this.state.lists.map((list) => {
        return this.state.pets[list].animalNames.map((pet, index) => {
          console.log(this.state.pets[list])
          return (
            <div key={index}>
              <SLideShowItem list={list} name={pet} imageURLs={this.state.pets[list].animalImageURLs[index]} />
            </div>
          );
        });
      });
    }
  }

  render() {
    const settings = {
      dots: true,
      arrows: false,
      infinite: true,
      speed: 1000,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplaySpeed: 5000,
      cssEase: "linear",
    };
    return (
      <div style={{ margin: "auto"}}>
        <Slider {...settings}>
          {this.renderSlides()}
        </Slider>
      </div>
    )
  }
}

export default Home;