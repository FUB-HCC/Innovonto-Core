import React from "react";
import style from "./home-view.module.css";
import background from "../../assets/img/home-background-banner.jpg";

export const HomeView = () => (
  <>
    <div className={style.homeBackground}>
      <img src={background} width={window.innerWidth} alt={"home-background"} />
    </div>
    <div className={style.homeViewWrapper}>
      <div className={style.homeJumbotron}>TITLE</div>
      <div className={style.contentWrapper}>
        <div className={style.headLineCards}></div>
        <div className={style.homeViewText}></div>
      </div>
    </div>
  </>
);
