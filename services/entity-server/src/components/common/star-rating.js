import style from "./star-rating.module.css";
import { Icon } from "@blueprintjs/core";
import React from "react";
import PropTypes from "prop-types";

const StarRating = props => (
  <div className={style.RatingWrapper}>
    <div>
      <Icon icon={props.rating >= 0.5 ? "star" : "star-empty"} />
      <Icon icon={props.rating >= 1.5 ? "star" : "star-empty"} />
      <Icon icon={props.rating >= 2.5 ? "star" : "star-empty"} />
      <Icon icon={props.rating >= 3.5 ? "star" : "star-empty"} />
      <Icon icon={props.rating >= 4.5 ? "star" : "star-empty"} />
    </div>
    <span>{Math.round(props.rating)} of 5 stars</span>
  </div>
);

StarRating.propTypes = {
  rating: PropTypes.number.isRequired
};

export default StarRating;
