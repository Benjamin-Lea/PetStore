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
      items: {} // this property names of this object are the names of the lists; their values are arrays of the items in each list
    };
  }

  // Get the data from the server
  componentDidMount() {
    fetch('/animalData')
      .then(response => response.json())
      .then(listsData => {
        this.setState({ lists: listsData.lists, items: listsData.items });
      })
  }

  renderSlides() {
    console.log(this.state.items)
    if (this.state.lists != null) {
      return this.state.lists.map((list) => {
        return this.state.items[list].animalNames.map((item, index) => {
          console.log(this.state.items[list])
          return (
            <div key={index}>
              <SLideShowItem list={list} name={item} imageURLs={this.state.items[list].animalImageURLs[index]} />
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