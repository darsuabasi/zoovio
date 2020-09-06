// /** @jsx jsx */
import React from "react";
// eslint-disable-next-line
import { css, jsx } from "@emotion/core";
import leftArrow from "../img/left-arrow.svg";
import rightArrow from "../img/right-arrow.svg";

const Arrow = ({ direction, handleClick }) => (
  <div
    onClick={handleClick}
    css={css`
      display: flex;
      position: absolute;
      top: 50%;
      ${direction === "right" ? `right: 25px` : `left: 25px`};
      height: 30px;
      width: 30px;
      justify-content: center;
      background: white;
      border-radius: 50%;
      cursor: pointer;
      align-items: center;
      transition: transform ease-in 0.1s;
      &:hover {
        transform: scale(1.1);
      }
      img {
        transform: translateX(${direction === "left" ? "-2" : "2"}px);
        &:focus {
          outline: 0;
        }
      }
    `}
  >
    {direction === "right" ? (
      <img alt="" src={rightArrow} />
    ) : (
      <img alt="" src={leftArrow} />
    )}
  </div>
);

export default Arrow;
