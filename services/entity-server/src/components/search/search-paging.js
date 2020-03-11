import React from "react";
import style from "./search-component.module.css";
import { ButtonGroup, Button } from "@blueprintjs/core";
import { SearchActionTypes } from "./search-component";
const SearchPaging = props => (
  <>
    <div className={style.pagingBody}>{props.children}</div>
    <div
      className={style.pagingControls}
      style={{ height: props.footerHeight }}
    >
      <ButtonGroup>
        <Button
          minimal={true}
          onClick={() =>
            props.actionDispatch({ type: SearchActionTypes.PAGE_START })
          }
          icon={"chevron-backward"}
        />
        <Button
          minimal={true}
          onClick={() =>
            props.actionDispatch({ type: SearchActionTypes.PAGE_LEFT })
          }
          icon={"chevron-left"}
        />
      </ButtonGroup>
      <div className={style.pageNumber}>{props.page + 1}</div>
      <ButtonGroup>
        <Button
          minimal={true}
          onClick={() =>
            props.actionDispatch({ type: SearchActionTypes.PAGE_RIGHT })
          }
          icon={"chevron-right"}
        />
        <Button
          minimal={true}
          onClick={() =>
            props.actionDispatch({ type: SearchActionTypes.PAGE_END })
          }
          icon={"chevron-forward"}
        />
      </ButtonGroup>
    </div>
  </>
);

export default SearchPaging;
