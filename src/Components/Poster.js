import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  font-size: 12px;
`;

const Image = styled.div`
  background-image: url(${props => props.bgUrl});
  height: 180px;
  background-size: cover;
  border-radius: 4px;
  background-position: center center;
  transition: opacity 0.1s linear;
`;

const Rating = styled.span`
  position: absolute;
  opacity: 0;
  transition: opacity 0.1s linear;
  left: 50%;
  bottom: 5%;
  transform: translateX(-50%);
  font-size: 5px;
`;

const Synopsis = styled.span`
  position: absolute;
  top: 5px;
  left: 5px;
  opacity: 0;
  transition: opacity 0.1s linear;
  font-size: 9px;
`;

const ImageContainer = styled.div`
  margin-bottom: 5px;
  position: relative;
  &:hover {
    ${Image} {
      opacity: 0.1;
    }
    ${Rating} {
      opacity: 1;
    }
    ${Synopsis} {
      opacity: 1;
    }
  }
`;

const Title = styled.span`
  display: block;
  margin-bottom: 3px;
`;

const Year = styled.span`
  font-size: 10px;
  color: rgba(255, 255, 255, 0.5);
`;

const RatingStar = styled.span`
  left: 50%;
  transform: translateX(-50%);
  color: yellow;
  font-size: 17px;
`;

const ratingStar = rating => {
  let Rating = parseInt(rating);
  if (Rating === 10) {
    return "★★★★★";
  } else if (Rating === 9) {
    return "★★★★☆";
  } else if (Rating === 8) {
    return "★★★★";
  } else if (Rating === 7) {
    return "★★★☆";
  } else if (Rating === 6) {
    return "★★★";
  } else if (Rating === 5) {
    return "★★☆";
  } else if (Rating === 4) {
    return "★★";
  } else if (Rating === 3) {
    return "★☆";
  } else if (Rating === 2) {
    return "★";
  } else if (Rating === 1) {
    return "☆";
  } else {
    return "";
  }
};

const Poster = ({
  id,
  imageUrl,
  title,
  rating,
  year,
  isMovie = false,
  synopsis
}) => (
  <Link to={isMovie ? `/movie/${id}` : `/show/${id}`}>
    <Container>
      <ImageContainer>
        <Image
          bgUrl={
            imageUrl
              ? `https://image.tmdb.org/t/p/w300${imageUrl}`
              : require("../assets/noPosterSmall.png")
          }
        />
        <Rating>
          <RatingStar>{ratingStar(rating)}</RatingStar>
          {rating}/10
        </Rating>
        <Synopsis>
          {synopsis.length > 100
            ? `${synopsis.substring(0, 100)}...`
            : synopsis}
        </Synopsis>
      </ImageContainer>
      <Title>
        {title.length > 18 ? `${title.substring(0, 18)}...` : title}
      </Title>
      <Year>{year}</Year>
    </Container>
  </Link>
);

Poster.propTypes = {
  id: PropTypes.number.isRequired,
  imageUrl: PropTypes.string,
  title: PropTypes.string.isRequired,
  rating: PropTypes.number,
  year: PropTypes.string,
  isMovie: PropTypes.bool,
  synopsis: PropTypes.string
};

export default Poster;
