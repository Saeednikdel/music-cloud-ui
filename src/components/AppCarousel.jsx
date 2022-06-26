import React from 'react';
import Carousel from 'react-material-ui-carousel';
import { ArrowBack, ArrowForward } from '@mui/icons-material';
import headers from '../headers';

function AppCarousel() {
  return (
    <div>
      <Carousel
        indicators={false}
        NextIcon={<ArrowForward />}
        PrevIcon={<ArrowBack />}
        timeout={2000}
        interval={20000}
        swipe={true}
        stopAutoPlayOnHover={true}>
        {headers.map((item, i) => (
          <img
            className=" h-48 md:h-60 xl:h-72 w-full object-cover "
            key={i}
            src={item.image}
          />
        ))}
      </Carousel>
    </div>
  );
}

export default AppCarousel;
