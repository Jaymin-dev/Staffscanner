import React, { useEffect, useRef } from "react";
import VanillaTilt from "vanilla-tilt";
import "./styles.scss";
import Like from "../../component/Like";
import { useDispatch } from "react-redux";
import {
  addFavouritePost,
  deleteFavouritePost,
} from "../../redux/actions/DashboardAction";

const Card = ({ data }) => {
  const tilt = useRef(null);
  const options = {
    scale: 1.05,
    speed: 1000,
    max: 20,
  };
  const dispatch = useDispatch();
  console.log("@@@@@@@@@ data", data);
  useEffect(() => {
    VanillaTilt.init(tilt.current, options);
  }, [options]);

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

  return (
    <div className="col-12 col-sm-8 col-md-6 col-lg-4">
      <div className="px-2 py-4">
        <div className="card" ref={tilt} options={options}>
          <img className="card-img" src={data.url} alt="Vans" />
          <div className=" d-flex justify-content-end">
            <a href="#" className="card-link text-danger like">
              <Like onChange={handleFavImg} favourite={data.isFavourite} />
            </a>
          </div>
          <div className="card-body">
            <h6 className="card-subtitle mb-2 text-muted">
              {data.original_filename}
            </h6>

            <div className="buy d-flex justify-content-between align-items-center">
              <div className="price text-success">
                <h5>125</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
