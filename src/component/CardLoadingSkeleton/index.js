import React from "react";
//library
import Skeleton from "react-loading-skeleton";

//style
import "./styles.scss";

const CardLoadingSkeleton = () => {
  return (
    <>
      {[0, 1, 2, 3, 4].map((d) => (
        <div className="col-12 col-sm-8 col-md-6 col-lg-4" key={d}>
          <div className="px-2 py-4">
            <div className="card">
              <Skeleton className="img-loader" />
              <div>
                <Skeleton className="img-name" />
                <Skeleton className="img-counter" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};
export default CardLoadingSkeleton;
