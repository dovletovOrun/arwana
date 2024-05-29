import { useEffect, useState } from "react";
import { InboxOutlined } from "@ant-design/icons";
import { message, Upload, Progress } from "antd";
import {
  uploadCatalog,
  deleteBrandCatalog,
  getOneBrand,
} from "../../store/admin/brands";

import { useDispatch } from "react-redux";

const { Dragger } = Upload;

const Dropzone = ({ id }) => {
  const [isDisabled, setIsDisabled] = useState(false);
  const [brandId, setBrandId] = useState("");
  const [fileList, setFileList] = useState([]);
  const [progress, setProgress] = useState(0);
  const dispatch = useDispatch();

  const props = {
    name: "file",
    multiple: false,
    action: `http://localhost:5000//api/brands/catalog/${brandId}`,
    customRequest: function (info) {
      const formData = new FormData();
      const { onProgress } = info;

      formData.append("catalog", info.file);
      const config = {
        headers: { "content-type": "multipart/form-data" },
        onUploadProgress: (event) => {
          const percent = Math.floor((event.loaded / event.total) * 100);
          setProgress(percent);
          if (percent === 100) {
            setTimeout(() => setProgress(0), 1000);
          }
          onProgress({ percent: (event.loaded / event.total) * 100 });
        },
      };
      dispatch(
        uploadCatalog({
          brandId,
          catalog: formData,
          config,
        })
      ).then((res) => {
        setFileList([
          ...fileList,
          {
            status: "done",
            name: res.payload.brandCatalog.fileName,
            uid: res.payload.brandCatalog.id,
          },
        ]);
      });
    },

    onChange(info) {
      const { status } = info.file;
      console.log(status);
      if (status === "done") {
        console.log(status);

        message.success(`${info.file.name} файл загружен успешно.`);
      } else if (status === "error") {
        message.error(`${info.file.name} ошибка`);
      }
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
    onRemove(e) {
      const data = {
        brandId,
        catalogId: e.uid,
      };
      dispatch(deleteBrandCatalog(data)).then((res) => {
        message.success(`${e.name} файл удалён успешно.`);
        setFileList([]);
      });
    },

    fileList: fileList,
    maxCount: 1,
  };

  useEffect(() => {
    if (id) {
      dispatch(getOneBrand(id)).then((res) => {
        setBrandId(res.payload.id);
        let fList = [];
        if (res.payload && res.payload.medias.length > 0) {
          for (let m of res.payload.medias) {
            if (m.fileType === "catalog") {
              fList.push({
                status: "done",
                name: m.fileName,
                uid: m.id,
              });
            }
          }
          setFileList(fList);
        }
      });
    }
  }, [dispatch, id]);

  return (
    <Dragger
      {...props}
      style={{
        width: "100%",
        display: "flex",
        color: "#fff",
      }}
    >
      <p className="ant-upload-drag-icon">
        <InboxOutlined />
      </p>
      <p className="ant-upload-text">
        Click or drag file to this area to upload
      </p>
      {progress > 0 ? (
        <Progress
          strokeColor={progress < 100 ? "white" : "green"}
          percent={progress}
        />
      ) : null}
    </Dragger>
  );
};
export default Dropzone;
