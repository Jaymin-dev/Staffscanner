import React, { useEffect, useRef, useState } from "react";

import VanillaTilt from "vanilla-tilt";

//redux
import { useDispatch, useSelector } from "react-redux";
import {
  addFavouritePost,
  deleteFavouritePost,
  deleteVotes,
  setVotes,
} from "../../redux/actions/DashboardAction";

//components
import { options } from "../../utils/utility";

//icons
import Like from "../../component/Like";
import { ReactComponent as ThumbIcon } from "../../asset/images/like.svg";

//style
import "./styles.scss";

const Card = ({ data, filter }) => {
  const tilt = useRef(null);
  
  const dispatch = useDispatch();
  const { votes = {} } = useSelector(({ dashboard }) => dashboard);
  const { data: votesData = [] } = votes;

  //states
  const [votesCounter, setVotesCounter] = useState(0);
  const [cardVotesArray, setCardVotesArray] = useState([]);
  const [isVote, setIsVote] = useState(false);


  useEffect(() => {
    const oneCardVotesArray = votesData.filter((v) => v.image_id === data.id);
    const count = oneCardVotesArray
      .map((c) => c.value)
      .reduce((a, b) => a + b, 0);
    setCardVotesArray(oneCardVotesArray);
    setVotesCounter(count);
    const userAddVotes = oneCardVotesArray.findIndex(
      (c) => c.sub_id === process.env.REACT_APP_X_API_KEY
    );
    if (userAddVotes !== -1) {
      setIsVote(true);
    }
  }, [votesData]);

  useEffect(() => {
    VanillaTilt.init(tilt.current, options);
  }, [options]);

  //api Call
  const handleFavImg = (e) => {
    if (e) {
      const payload = {
        image_id: data.id,
        sub_id: data.sub_id,
      };
      dispatch(addFavouritePost({ ...payload }));
    } else {
      dispatch(deleteFavouritePost({ id: data.favouriteId }));
    }
  };

  //votes api Call
  const handleVotes = () => {
    if (isVote) {
      setVotesCounter(votesCounter - 1);
      if (cardVotesArray.length > 0) {
        dispatch(
          deleteVotes({
            id: cardVotesArray[0].id,
          })
        );
      }
    } else {
      setVotesCounter(votesCounter + 1);
      dispatch(
        setVotes({
          image_id: data.id,
          sub_id: process.env.REACT_APP_X_API_KEY,
          value: 1,
        })
      );
    }
    setIsVote(!isVote);
  };

  if ((filter === "favourite") & !data.isFavourite) return <> </>;
  if ((filter === "unfavourite") & data.isFavourite) return <> </>;
  return (
    <div
      className="col-12 col-sm-8 col-md-6 col-lg-4"
      data-aos-duration="1000"
      data-aos="zoom-out-up"
    >
      <div className="px-2 py-4">
        <div className="card" ref={tilt} options={options}>
          <img className="card-img" src={data.url} alt="Vans" />
          <div className=" d-flex justify-content-end">
            <span className="card-link text-danger like">
              <Like onChange={handleFavImg} favourite={data.isFavourite} />
            </span>
          </div>
          <div className="card-body">
            <h6 className="card-subtitle mb-2 text-muted">
              {data.original_filename}
            </h6>

            <div className="buy d-flex justify-content-between align-items-center">
              <div className="price text-success d-flex align-items-center">
                <ThumbIcon
                  className={`thumbIcon ${isVote ? "thumbIconFill" : ""}`}
                  onClick={handleVotes}
                />
                <h5 className="m-0">{votesCounter}</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
