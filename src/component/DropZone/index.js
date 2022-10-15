import React, { useEffect, useState } from "react";
import Dropzone from "react-dropzone";
import "./styles.scss";
import { useDispatch } from "react-redux";
import { getAllImages } from "../../redux/actions/DashboardAction";
import { ReactComponent as UploadImg } from "../../asset/images/uoload-img.svg";
import Spinner from "react-bootstrap/Spinner";
import { NotificationManager } from "react-notifications";
import { getName } from "../../utils/utility";

const DropZone = ({ setModalShow }) => {
  const dispatch = useDispatch();
  const [uploadedFile, setUploadededFile] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(async () => {
    if (uploadedFile.length > 0) {
      setLoading(true);
      const fileName = getName(uploadedFile[0].name);
      const formdata = new FormData();
      formdata.append("file", uploadedFile[0], fileName);
      formdata.append("sub_id", process.env.REACT_APP_X_API_KEY);
      const myHeaders = new Headers();
      myHeaders.append("x-api-key", process.env.REACT_APP_X_API_KEY);
      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: formdata,
        redirect: "follow",
      };

      await fetch(
        "https://api.thecatapi.com/v1/images/upload",
        requestOptions
      ).then((r) => {
        if (r.status === 201) {
          if (setModalShow) setModalShow(false);
          dispatch(getAllImages({ limit: 100 }));
          NotificationManager.success("Cat image upload successful");
        } else {
          NotificationManager.error("Something went wrong please try again");
        }
      });
      setUploadededFile([]);
      setLoading(false);
    }
  }, [uploadedFile]);

  return (
    <>
      {/*<input type="file" name="fileToUploadNep" onChange={handleChangeFile} />*/}
      <Dropzone onDrop={(acceptedFiles) => setUploadededFile(acceptedFiles)}>
        {({ getRootProps, getInputProps }) => (
          <section>
            {loading ? (
              <div className="dropzone-wrapper">
                <div className="dropzone-wrapper-message">
                  <Spinner animation="border" />
                  <p>Uploading a cat image...</p>
                </div>
              </div>
            ) : (
              <div {...getRootProps()} className="dropzone-wrapper">
                <input {...getInputProps()} />

                <div className="dropzone-wrapper-message">
                  {/*<FontAwesomeIcon icon={faDownload} className="download-icon" />*/}
                  <UploadImg className="upload-icon" />
                  <p>Upload a cat image</p>
                </div>
              </div>
            )}
          </section>
        )}
      </Dropzone>
    </>
  );
};

export default DropZone;
