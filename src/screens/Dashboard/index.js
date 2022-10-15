import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Form from "react-bootstrap/Form";
import { ReactComponent as Logo } from "../../asset/images/logo.svg";
import Card from "./Card";
import UploadFile from "./UploadFile";
import { getAllImages } from "../../redux/actions/DashboardAction";
import CardLoadingSkeleton from "../../component/CardLoadingSkeleton";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { allImages } = useSelector(({ dashboard }) => dashboard);

  useEffect(() => {
    dispatch(getAllImages({ limit: 100 }));
  }, []);
  const [favOption, setFavOption] = useState("both");
  const [imageArray, setImageArray] = useState([]);

  useEffect(() => {
    setImageArray(allImages.data);
  }, [allImages.data]);

  const onSearchHandler = ({ target: { value } }) => {
    const fileSearch = value.toLowerCase();
    const filterData = allImages.data.filter((d) =>
      d.original_filename.toLowerCase().includes(fileSearch)
    );
    setImageArray([...filterData]);
  };

  return (
    <div className="container pt-5">
      <div className="d-flex justify-content-between mb-4">
        <Logo />
        <div className="d-flex align-items-center">
          <Form.Control
            type="text"
            placeholder="Search"
            className="me-4"
            onChange={onSearchHandler}
          />
          <Form.Select
            className="me-4"
            value={favOption}
            onChange={({ target: { value } }) => {
              setFavOption(value);
            }}
          >
            <option value="both">Both</option>
            <option value="favourite">Favourite</option>
            <option value="unfavourite">Unfavourite</option>
          </Form.Select>
          <UploadFile />
        </div>
      </div>
      <div className="container">
        <div className="row">
          {allImages?.loading ? (
            <CardLoadingSkeleton />
          ) : (
            imageArray?.map((c, i) => (
              <Card filter={favOption} data={c} key={i} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
