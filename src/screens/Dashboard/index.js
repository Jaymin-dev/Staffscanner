import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";

//redux
import { useDispatch, useSelector } from "react-redux";
import { getAllImages } from "../../redux/actions/DashboardAction";

//components
import Card from "./Card";
import UploadFile from "./UploadFile";
import CardLoadingSkeleton from "../../component/CardLoadingSkeleton";

//icons
import { ReactComponent as Logo } from "../../asset/images/logo.svg";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { allImages } = useSelector(({ dashboard }) => dashboard);

  //states
  const [favOption, setFavOption] = useState("both");
  const [imageArray, setImageArray] = useState([]);

  useEffect(() => {
    dispatch(getAllImages({ limit: 100 }));
  }, []);

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
      <div className="d-flex justify-content-between flex-wrap mb-4">
        <Logo />
        <div className="d-flex align-items-center flex-column  flex-md-row">
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
            <option value="both">All</option>
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
