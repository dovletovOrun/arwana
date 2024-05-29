import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import {
  createProductOptions,
  updateProductOptions,
  deleteProductOptions,
  uploadProductOptionsImage,
  deleteProductOptionsImage,
} from "../../store/admin/productDetails";

import { Form, Input, Upload, Alert, Button, Modal } from "antd";

import { IoIosCamera } from "react-icons/io";

import styles from "./details-form.module.scss";

const imagePath = import.meta.env.VITE_IMAGE_PATH;

export default function DetailsForm({ pr, productId, alert, setAlert }) {
  const [details, setDetails] = useState({
    tkmTitle: "",
    ruTitle: "",
    enTitle: "",
  });
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    if (pr) {
      setDetails({
        tkmTitle: pr.tkmTitle,
        ruTitle: pr.ruTitle,
        enTitle: pr.enTitle,
      });
      if (pr.medias.length > 0) {
        const fList = pr.medias.map((img) => {
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
      }
    }
  }, [pr]);

  const handleCreate = () => {
    dispatch(
      createProductOptions({
        productId,
        details,
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
  const handleUpdate = () => {
    dispatch(
      updateProductOptions({
        optionsId: pr.id,
        details,
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

  function handleChange({ fileList: newFileList }) {
    setFileList(newFileList);
  }

  const handlePreview = (file) => {
    setPreviewImage(file.url);
    setPreviewOpen(true);
  };

  const handleDelete = (file) => {
    dispatch(
      deleteProductOptionsImage({
        optionsId: pr.id,
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
    <div className={styles.tabContainer}>
      <div className={styles.form}>
        <Form
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 32,
          }}
          style={{
            width: "100%",
          }}
          layout="vertical"
          autoComplete="off"
          labelWrap={false}
          fields={[
            {
              name: ["tkmTitle"],
              value: details?.tkmTitle,
            },
            {
              name: ["ruTitle"],
              value: details?.ruTitle,
            },
            {
              name: ["enTitle"],
              value: details?.enTitle,
            },
          ]}
        >
          <Form.Item
            style={{
              display: "flex",
              flexDirection: "column",
              color: "#ffffff",
            }}
            label={<label className={styles.label}>Доп. инфо. (tm)</label>}
            name="tkmTitle"
            rules={[
              {
                required: true,
                message: "Please input the name!",
              },
            ]}
          >
            <Input
              onChange={(e) => {
                setDetails({
                  ...details,
                  tkmTitle: e.target.value,
                });
              }}
            />
          </Form.Item>
          <Form.Item
            style={{
              display: "flex",
              flexDirection: "column",
              color: "#ffffff",
            }}
            label={<label className={styles.label}>Доп. инфо. (ru)</label>}
            name="ruTitle"
            rules={[
              {
                required: true,
                message: "Please input the name!",
              },
            ]}
          >
            <Input
              onChange={(e) => {
                setDetails({
                  ...details,
                  ruTitle: e.target.value,
                });
              }}
            />
          </Form.Item>
          <Form.Item
            style={{
              display: "flex",
              flexDirection: "column",
              color: "#ffffff",
            }}
            label={<label className={styles.label}>Доп. инфо. (en)</label>}
            name="enTitle"
            rules={[
              {
                required: true,
                message: "Please input the name!",
              },
            ]}
          >
            <Input
              onChange={(e) => {
                setDetails({
                  ...details,
                  enTitle: e.target.value,
                });
              }}
            />
          </Form.Item>
        </Form>
      </div>
      <div className={styles.upload}>
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
            dispatch(
              uploadProductOptionsImage({ optionsId: pr.id, image: formData })
            )
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
      </div>
      <div>
        <Button
          style={{
            marginTop: 10,
            width: "100%",
            fontSize: 14,
            fontWeight: 700,
            minHeight: 40,
            backgroundColor: "#3ccf4e",
          }}
          type="primary"
          onClick={pr ? handleUpdate : handleCreate}
        >
          Сохранить
        </Button>
        <Button
          style={{
            marginTop: 10,
            width: "100%",
            fontSize: 14,
            fontWeight: 700,
            minHeight: 40,
          }}
          disabled={!pr ? true : false}
          danger
          type="primary"
          onClick={() => {
            dispatch(deleteProductOptions(pr.id))
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
          }}
        >
          Удалить
        </Button>
      </div>
      {alert.isVisible && (
        <Alert
          style={{
            width: "20%",
            height: 40,
          }}
          type={alert.type}
          message={alert.message}
        />
      )}
    </div>
  );
}
