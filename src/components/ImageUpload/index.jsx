import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";

import { Modal, Upload, Alert } from "antd";
import Panel from "../AdminPanel";

import { IoIosCamera } from "react-icons/io";

import styles from "./upload.module.scss";

const imagePath = import.meta.env.VITE_IMAGE_PATH;

export default function ImageUpload({
  uploadMethod,
  deleteMethod,
  updatePageMethod,
}) {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState([]);
  const [alert, setAlert] = useState({
    type: "",
    message: "",
    isVisible: false,
  });

  const dispatch = useDispatch();
  const { state } = useLocation();

  useEffect(() => {
    dispatch(updatePageMethod(state)).then((res) => {
      const fList =
        res.payload &&
        res.payload.medias.map((img) => {
          if (img.fileType !== "catalog") {
            return {
              id: img.id,
              uid: img.uid,
              name: img.fileName,
              status: "done",
              url: imagePath + img.fileName,
            };
          } else {
            return [];
          }
        });
      setFileList(fList);
    });
  }, [alert]);

  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);

  const handlePreview = (file) => {
    setPreviewImage(file.url);
    setPreviewOpen(true);
  };

  const handleDelete = (file) => {
    dispatch(
      deleteMethod({
        itemId: state,
        imageId: file.id,
      })
    )
      .unwrap()
      .then(() => {
        setAlert({
          type: "success",
          message: "Успешно!",
          isVisible: true,
        });
      })
      .catch((e) => {
        setAlert({
          type: "error",
          message: "Ошибка " + e,
          isVisible: true,
        });
      });

    setTimeout(() => {
      setAlert({
        type: "",
        message: "",
        isVisible: false,
      });
    }, 2000);
  };

  const uploadButton = (
    <button
      style={{
        border: 0,
        background: "none",
      }}
      type="button"
    >
      <IoIosCamera color="#fff" size={26} />
      <div
        style={{
          marginTop: 8,
          color: "#fff",
        }}
      >
        Добавить
      </div>
    </button>
  );

  return (
    <div className={styles.adminUpload}>
      <Panel title={`Фото категории ()`}>
        <div
          style={{
            paddingTop: 20,
          }}
        >
          <Upload
            listType="picture-card"
            fileList={fileList}
            onChange={handleChange}
            customRequest={(options) => {
              const { onSuccess } = options;
              const formData = new FormData();

              formData.append(
                "image",
                fileList[fileList.length - 1].originFileObj
              );
              dispatch(uploadMethod({ id: state, image: formData }))
                .unwrap()
                .then((res) => {
                  onSuccess("done");
                  setAlert({
                    type: "success",
                    message: "Успешно!",
                    isVisible: true,
                  });
                })
                .catch((e) => {
                  setAlert({
                    type: "error",
                    message: "Ошибка " + e,
                    isVisible: true,
                  });
                });

              setTimeout(() => {
                setAlert({
                  type: "",
                  message: "",
                  isVisible: false,
                });
              }, 2000);
            }}
            onPreview={handlePreview}
            onRemove={handleDelete}
          >
            {fileList.length >= 4 ? null : uploadButton}
          </Upload>
        </div>
      </Panel>
      <Modal
        className={styles.modal}
        onCancel={() => setPreviewOpen(false)}
        open={previewOpen}
        footer={null}
      >
        <img
          alt="example"
          style={{
            width: "100%",
          }}
          src={previewImage}
        />
      </Modal>

      {alert.isVisible && (
        <Alert
          style={{
            width: "20%",
          }}
          type={alert.type}
          message={alert.message}
        />
      )}
    </div>
  );
}
