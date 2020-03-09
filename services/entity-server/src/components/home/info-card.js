import style from "./info-card.module.css";
import PropTypes from "prop-types";
import React from "react";

const InfoCard = props => {
  const { icon, title, takeAction, width, children } = props;
  return (
    <div className={style.infoCardWrapper} style={{ width: width }}>
      {icon && <div className={style.infoCardIcon}>{icon}</div>}
      <div className={style.infoCardTitle}>{title}</div>
      <div className={style.infoCardContent}>{children}</div>
      {takeAction && <div className={style.infoCardAction}>{takeAction}</div>}
    </div>
  );
};

InfoCard.propTypes = {
  icon: PropTypes.element,
  title: PropTypes.string.isRequired,
  takeAction: PropTypes.element,
  children: PropTypes.element,
  width: PropTypes.number.isRequired
};

export default InfoCard;
