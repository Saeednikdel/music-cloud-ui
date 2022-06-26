import React from 'react';
import Carousel from 'react-material-ui-carousel';
import { ArrowBack, ArrowForward } from '@mui/icons-material';

function AppCarousel({ items }) {
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
        {items.map((item) => (
          <img
            className=" h-72 w-full object-cover "
            key={item.title}
            src={item.cover}
          />
        ))}
      </Carousel>
    </div>
  );
}

export default AppCarousel;
