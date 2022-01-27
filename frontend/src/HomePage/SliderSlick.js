// import React from 'react';
// import Slider from "react-slick";



// const SliderSlick = ({posts}) => {

//     const settings = {

//         infinite: true,
//         speed: 1000,
//         slidesToShow: 1,
//         slidesToScroll: 1
//       };
//       return (
//         <div>
//           <h2> Single Item</h2>
//           <Slider {...settings}>
//             {
//               posts.map(post=>(
//                 <div key={post.id}>
//                             <img  src={`http://localhost:8001/${post.postImage}`}  width='160px' height="450px"  className="card-img-top"  />

//                 </div>
//               ))
//             }
            
      
//           </Slider>
//         </div>
//       );
    
 
// };

// export default SliderSlick;




import React, { Component } from "react";
import Slider from "react-slick";

export default class SliderSlick extends Component {



  sliders() {
    return this.props.posts.map(post=>(
                      <div key={post.id}>
                                  <img  src={`http://localhost:8001/${post.postImage}`}  width='160px' height="450px"  className="card-img-top"  />
      
                      </div>
                    ))
                  
    
    
    
    

}





  render() {
    const settings = {
      dots: true,
      autoplay: true,
      autoplaySpeed: 4000,
      arrow: false
    };
    return (
      <div>
        <h2> Single Item</h2>
        <Slider {...settings}>
        {this.sliders()}
        </Slider>
      </div>
    );
  }
}