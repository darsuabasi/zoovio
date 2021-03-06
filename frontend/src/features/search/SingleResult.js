import React from "react";
import "./CSS/SingleResult.css";
import PawRating from "./PawRating";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { setUid2 } from "../messagingInfoSlice/messagingInfoSlice";
import { useHistory } from "react-router-dom";

const SingleResult = ({ result }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const onClick = (e) => {
    dispatch(setUid2(e.target.value));
    history.push("/messages");
  };

  return (
    <div title={result.id} className="single-result">
      <div className="cardTop">
        <div className="cardTopCont">
          <div className="cardImg">
            <img src={result.image_url} alt="" />
          </div>
          <div className="cardInfo">
            <div className="cardInfoName">
              <p>{result.name}</p>
            </div>
            <div className="cardInfoAddy">
              <p>{result.location.display_address[0]}</p>
              <p>{result.location.display_address[1]}</p>
            </div>
            <div className="ratingCont">
              <PawRating
                reviewCount={result.review_count}
                rating={result.rating}
              />
            </div>
            <div className="cardInfoAddy">
              <p>Phone: {result.display_phone}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="cardBottom">
        <div className="moreInfoCard">
          <a href={result.url}>
            <p style={{ margin: "unset" }}>More information</p>
          </a>
        </div>
        <div>
          {result.isPartner ? (
            <Button value={result.id} onClick={onClick}>
              Contact Provider
            </Button>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default SingleResult;
