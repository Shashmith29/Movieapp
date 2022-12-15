import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
// import { Link } from "react-router-dom";
import Loader from "Components/Loader";

const Container = styled.div`
  height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  padding: 50px;
`;
const Test = styled.div``;

const Backdrop = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url(${props => props.bgImage});
  background-position: center center;
  background-size: cover;
  filter: blur(3px);
  opacity: 0.5;
  z-index: 0;
`;

const Content = styled.div`
  display: flex;
  width: 100%;
  position: relative;
  z-index: 1;
  height: 100%;
`;

const Cover = styled.div`
  width: 30%;
  background-image: url(${props => props.bgImage});
  background-position: center center;
  background-size: cover;
  height: 100%;
  border-radius: 5px;
`;
const Data = styled.div`
  width: 70%;
  margin-left: 10px;
`;

const Title = styled.h3`
  font-size: 32px;
`;

const OriginalTitle = styled.h5`
  font-size: 15px;
  color: rgba(255, 255, 255, 0.5);
`;

const CompaniesContainer = styled.div`
  background-color: rgba(255, 255, 255, 0.5);
  padding: 5px 5px 5px 5px;
  white-space: nowrap;
  overflow: hidden;
  border-radius: 3px;
  transition: width 1s ease-in-out;
  min-width: 50%;
  width: fit-content;
`;

const Companies = styled.span`
  margin: 0px 5px 0px 5px;
  width: 80px;
  font-size: 18px;
  background-color: rgba(0, 0, 0, 0.9);
  line-height: 1.5;
  border-radius: 3px;
  padding-left: 10px;
  padding-right: 10px;
  overflow: hidden;
`;

const CompaniesLogo = styled.img`
  margin: 0px 5px 0px 5px;
  width: 80px;
  vertical-align: middle;
`;

const ItemContainer = styled.div`
  margin: 20px 0;
`;

const Item = styled.span``;

const Divider = styled.span`
  margin: 0 10px;
`;

const Overview = styled.p`
  font-size: 12px;
  opacity: 0.7;
  line-height: 1.5;
  width: 50%;
`;

const DetailPresenter = ({ result, error, loading }) =>
  loading ? (
    <Loader />
  ) : (
    <Container>
      <Backdrop
        bgImage={`https://image.tmdb.org/t/p/original${result.backdrop_path}`}
      />
      <Content>
        <Cover
          bgImage={
            result.poster_path
              ? `http://image.tmdb.org/t/p/original${result.poster_path}`
              : require("../../assets/noPosterSmall.png")
          }
        />
        <Data>
          <Title>{result.title ? result.title : result.name}</Title>
          <OriginalTitle>
            {result.original_title
              ? result.original_title
              : result.original_name}
          </OriginalTitle>
          <ItemContainer>
            <Item>
              {result.release_date === ""
                ? "0000년"
                : result.release_date
                ? result.release_date.substring(0, 4)
                : result.first_air_date.substring(0, 4)}
            </Item>
            <Divider>•</Divider>
            <Item>
              {result.runtime === 0 || result.runtime === null
                ? "000분"
                : result.runtime
                ? `${result.runtime} min`
                : `${result.episode_run_time[0]} min`}
            </Item>
            <Divider>•</Divider>
            <Item>
              {result.genres &&
                result.genres.map((genre, index) =>
                  index === result.genres.length - 1
                    ? genre.name
                    : `${genre.name} / `
                )}
            </Item>
          </ItemContainer>
          <CompaniesContainer>
            {result.production_companies &&
              result.production_companies.length > 0 &&
              result.production_companies.map((production_companies, index) =>
                production_companies.logo_path ? (
                  <CompaniesLogo
                    src={`https://image.tmdb.org/t/p/w200${production_companies.logo_path}`}
                    alt={production_companies.name}
                    title={production_companies}
                    key={production_companies.name}
                  />
                ) : (
                  <Companies key={production_companies.name}>
                    {production_companies.name}
                  </Companies>
                )
              )}
          </CompaniesContainer>
          <Overview>{result.overview}</Overview>
        </Data>
      </Content>
    </Container>
  );

DetailPresenter.propTypes = {
  result: PropTypes.object,
  error: PropTypes.string,
  loading: PropTypes.bool.isRequired
};

export default DetailPresenter;
