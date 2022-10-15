import React, { useEffect } from "react";
import { ReactComponent as Logo } from "../../asset/images/logo.svg";
import Card from "./Card";
import UploadFile from "./UploadFile";
import { useDispatch, useSelector } from "react-redux";
import { getAllImages } from "../../redux/actions/DashboardAction";
import CardLoadingSkeleton from "../../component/CardLoadingSkeleton";

const Dashboard = () => {
  const dispatch = useDispatch();

  const { allImages } = useSelector(({ dashboard }) => dashboard);
  console.log("allImages", allImages);
  console.log("dashboardData", allImages.data);
  useEffect(() => {
    console.log("@@");
    dispatch(getAllImages({ limit: 100 }));
  }, []);

  return (
    <div className="container pt-5">
      <div className="d-flex justify-content-between mb-4">
        <Logo />
        <UploadFile />
      </div>
      <div className="container">
        <div className="row">
          {allImages?.loading ? (
            <CardLoadingSkeleton />
          ) : (
            allImages?.data?.map((c, i) => <Card data={c} key={i} />)
          )}
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
