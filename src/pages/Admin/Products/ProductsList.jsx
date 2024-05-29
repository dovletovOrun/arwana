import { useState, useEffect } from "react";

import { Form, Input, List, Select, Alert } from "antd";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../../../store/admin/products";
import { getCategories } from "../../../store/admin/categories";

import AdminAddButton from "../../../components/AdminAddButton";
import Panel from "../../../components/AdminPanel";
import Drawer from "../../../components/Drawer";

import { FaEdit } from "react-icons/fa";
import {
  MdDelete,
  MdImageNotSupported,
  MdOutlinePermMedia,
} from "react-icons/md";
import { TbListDetails } from "react-icons/tb";

import styles from "./products.module.scss";
import "./antd-pr.scss";

const imagePath = import.meta.env.VITE_IMAGE_PATH;

export default function ProductsList() {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [openEditDrawer, setOpenEditDrawer] = useState(false);
  const [catOptions, setCatOptions] = useState([]);
  const [catId, setCatId] = useState("");
  const [alert, setAlert] = useState({
    type: "",
    message: "",
    isVisible: false,
  });
  const [newProduct, setNewProduct] = useState({
    tkmTitle: "",
    ruTitle: "",
    enTitle: "",
    tkmDescription: "",
    ruDescription: "",
    enDescription: "",
  });
  const [currentProduct, setCurrentProduct] = useState({});

  const products = useSelector((state) => state.products.products);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getProducts());
    dispatch(getCategories()).then((res) => {
      let options = [];

      for (let cat of res.payload.categories) {
        for (let brandCat of cat?.categoryBrands) {
          options = [
            ...options,
            {
              value: brandCat?.id,
              label: cat.ruTitle + "/" + brandCat?.brand.ruTitle,
            },
          ];
        }
      }

      setCatOptions(options);
    });
  }, [dispatch, alert]);

  const onClose = (setFunc) => {
    setFunc(false);
  };

  const handleDrawer = (setFunc) => {
    setFunc(true);
  };

  const hanldleCreateProduct = () => {
    dispatch(
      createProduct({
        catId,
        product: newProduct,
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
      setOpenDrawer(false);
      setNewProduct({
        tkmTitle: "",
        ruTitle: "",
        enTitle: "",
        tkmDescription: "",
        ruDescription: "",
        enDescription: "",
      });
    }, 2000);
  };

  const handleUpdateProduct = () => {
    dispatch(
      updateProduct({
        productId: currentProduct.id,
        product: currentProduct,
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

  return (
    <div className={styles.adminProducts}>
      <div className={styles.productsHead}>
        <span className={styles.productsHeadTitle}>Товары ( Products )</span>
        <AdminAddButton
          onClick={() => handleDrawer(setOpenDrawer)}
          text={"Добавить товар"}
        />
      </div>
      <Panel title={"Все товары"}>
        <List
          itemLayout="vertical"
          style={{
            paddingTop: 15,
          }}
          dataSource={products ? products : []}
          renderItem={(item) => (
            <div className={styles.prCard}>
              <div className={styles.prInfo}>
                <div className={styles.row}>
                  <span className={styles.prPropName}>Название товара:</span>
                  <span className={styles.prProp}>{item.ruTitle}</span>
                </div>
                <div className={styles.row}>
                  <span className={styles.prPropName}>Название бренда: </span>
                  <span className={styles.prProp}>
                    {item?.categoryBrand?.category.ruTitle +
                      "/" +
                      item?.categoryBrand?.brand.ruTitle}
                  </span>
                </div>
                <div className={styles.row}>
                  <span className={styles.prPropName}>Описание:</span>
                  <span className={styles.prProp}>{item.ruDescription}</span>
                </div>
                <div className={styles.row}>
                  <span className={styles.prPropName}>Цена: </span>
                  <span className={styles.prProp}>{item.price} tmt</span>
                </div>
              </div>

              <div className={styles.catProps}>
                {item.medias.length === 0 ? (
                  <div className={styles.noimage}>
                    <MdImageNotSupported color="#fff" size={24} />
                  </div>
                ) : (
                  <img
                    src={imagePath + item.medias[0].fileName}
                    alt="category"
                  />
                )}
                <div className={styles.actions}>
                  <FaEdit
                    onClick={() => {
                      setCurrentProduct(item);
                      handleDrawer(setOpenEditDrawer);
                    }}
                    color="#3DD04F"
                    size={24}
                  />
                  <TbListDetails
                    onClick={() =>
                      navigate(
                        `/admin/products/productdetails/${item.enTitle}`,
                        { state: item.id }
                      )
                    }
                    size={24}
                    color="#5D3FD3"
                  />
                  <MdOutlinePermMedia
                    onClick={() =>
                      navigate("/admin/products/imageupload", {
                        state: item.id,
                      })
                    }
                    color="#ffe37a"
                    size={24}
                  />
                  <MdDelete
                    onClick={() => {
                      dispatch(deleteProduct(item.id))
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
                    color="#E71D36"
                    size={24}
                  />
                </div>
              </div>
            </div>
          )}
        />
      </Panel>

      <Drawer
        open={openDrawer}
        onSubmit={hanldleCreateProduct}
        onClose={() => onClose(setOpenDrawer)}
        name="Добавление товара"
      >
        <div
          style={{
            width: "100%",
          }}
        >
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
          >
            <Form.Item
              style={{
                display: "flex",
                flexDirection: "column",
                color: "#ffffff",
              }}
              label={
                <label className={styles.label}>Название товара (tm)</label>
              }
              name="tkmTitle"
            >
              <Input
                onChange={(e) => {
                  setNewProduct({
                    ...newProduct,
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
              label={
                <label className={styles.label}>Название товара (ru)</label>
              }
              name="ruTitle"
            >
              <Input
                onChange={(e) => {
                  setNewProduct({
                    ...newProduct,
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
              label={
                <label className={styles.label}>Название товара (en)</label>
              }
              name="enTitle"
            >
              <Input
                onChange={(e) => {
                  setNewProduct({
                    ...newProduct,
                    enTitle: e.target.value,
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
              label={<label className={styles.label}>Описание (tm)</label>}
              name="tkmDescription"
            >
              <Input.TextArea
                onChange={(e) => {
                  setNewProduct({
                    ...newProduct,
                    tkmDescription: e.target.value,
                  });
                }}
                style={{ height: 120, resize: "none" }}
              />
            </Form.Item>
            <Form.Item
              style={{
                display: "flex",
                flexDirection: "column",
                color: "#ffffff",
              }}
              label={<label className={styles.label}>Описание (ru)</label>}
              name="ruDescription"
            >
              <Input.TextArea
                onChange={(e) => {
                  setNewProduct({
                    ...newProduct,
                    ruDescription: e.target.value,
                  });
                }}
                style={{ height: 120, resize: "none" }}
              />
            </Form.Item>
            <Form.Item
              style={{
                display: "flex",
                flexDirection: "column",
                color: "#ffffff",
              }}
              label={<label className={styles.label}>Описание (en)</label>}
              name="enDescription"
            >
              <Input.TextArea
                onChange={(e) => {
                  setNewProduct({
                    ...newProduct,
                    enDescription: e.target.value,
                  });
                }}
                style={{ height: 120, resize: "none" }}
              />
            </Form.Item>
            <Form.Item
              style={{
                display: "flex",
                flexDirection: "column",
                color: "#ffffff",
              }}
              label={<label className={styles.label}>Выберите Brand</label>}
            >
              <Select
                showSearch
                placeholder="Выберите бренд"
                optionFilterProp="children"
                onChange={(value) => {
                  setCatId(value);
                }}
                filterOption={(input, option) =>
                  (option?.label ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                options={catOptions}
              />
            </Form.Item>

            <Form.Item
              style={{
                display: "flex",
                flexDirection: "column",
                color: "#ffffff",
              }}
              label={<label className={styles.label}>Цена</label>}
            >
              <Input
                onChange={(e) => {
                  setNewProduct({
                    ...newProduct,
                    price: e.target.value,
                  });
                }}
                type="number"
              />
            </Form.Item>
          </Form>
        </div>
        {alert.isVisible && (
          <Alert
            style={{
              width: "100%",
            }}
            type={alert.type}
            message={alert.message}
          />
        )}
      </Drawer>
      <Drawer
        open={openEditDrawer}
        onSubmit={handleUpdateProduct}
        onClose={() => {
          setCurrentProduct({});
          onClose(setOpenEditDrawer);
        }}
        name="Добавление товара"
      >
        <div
          style={{
            width: "100%",
          }}
        >
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
                value: currentProduct.tkmTitle,
              },
              {
                name: ["ruTitle"],
                value: currentProduct.ruTitle,
              },
              {
                name: ["enTitle"],
                value: currentProduct.enTitle,
              },
              {
                name: ["tkmDescription"],
                value: currentProduct.tkmDescription,
              },
              {
                name: ["ruDescription"],
                value: currentProduct.ruDescription,
              },
              {
                name: ["enDescription"],
                value: currentProduct.enDescription,
              },
              {
                name: ["price"],
                value: currentProduct.price,
              },
            ]}
          >
            <Form.Item
              style={{
                display: "flex",
                flexDirection: "column",
                color: "#ffffff",
              }}
              label={
                <label className={styles.label}>Название товара (tm)</label>
              }
              name="tkmTitle"
            >
              <Input
                onChange={(e) => {
                  setCurrentProduct({
                    ...currentProduct,
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
              label={
                <label className={styles.label}>Название товара (ru)</label>
              }
              name="ruTitle"
            >
              <Input
                onChange={(e) => {
                  setCurrentProduct({
                    ...currentProduct,
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
              label={
                <label className={styles.label}>Название товара (en)</label>
              }
              name="enTitle"
            >
              <Input
                onChange={(e) => {
                  setCurrentProduct({
                    ...currentProduct,
                    enTitle: e.target.value,
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
              label={<label className={styles.label}>Описание (tm)</label>}
              name="tkmDescription"
            >
              <Input.TextArea
                onChange={(e) => {
                  setCurrentProduct({
                    ...currentProduct,
                    tkmDescription: e.target.value,
                  });
                }}
                style={{ height: 120, resize: "none" }}
              />
            </Form.Item>
            <Form.Item
              style={{
                display: "flex",
                flexDirection: "column",
                color: "#ffffff",
              }}
              label={<label className={styles.label}>Описание (ru)</label>}
              name="ruDescription"
            >
              <Input.TextArea
                onChange={(e) => {
                  setCurrentProduct({
                    ...currentProduct,
                    ruDescription: e.target.value,
                  });
                }}
                style={{ height: 120, resize: "none" }}
              />
            </Form.Item>
            <Form.Item
              style={{
                display: "flex",
                flexDirection: "column",
                color: "#ffffff",
              }}
              label={<label className={styles.label}>Описание (en)</label>}
              name="enDescription"
            >
              <Input.TextArea
                onChange={(e) => {
                  setCurrentProduct({
                    ...currentProduct,
                    enDescription: e.target.value,
                  });
                }}
                style={{ height: 120, resize: "none" }}
              />
            </Form.Item>
            <Form.Item
              style={{
                display: "flex",
                flexDirection: "column",
                color: "#ffffff",
              }}
              label={<label className={styles.label}>Выберите Brand</label>}
            >
              <Select
                showSearch
                placeholder="Выберите бренд"
                optionFilterProp="children"
                onChange={(value) => {
                  setCatId(value);
                }}
                filterOption={(input, option) =>
                  (option?.label ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                options={catOptions}
              />
            </Form.Item>

            <Form.Item
              style={{
                display: "flex",
                flexDirection: "column",
                color: "#ffffff",
              }}
              label={<label className={styles.label}>Цена</label>}
              name="price"
            >
              <Input
                onChange={(e) => {
                  setCurrentProduct({
                    ...currentProduct,
                    price: e.target.value,
                  });
                }}
                type="number"
              />
            </Form.Item>
          </Form>
        </div>
        {alert.isVisible && (
          <Alert
            style={{
              width: "100%",
            }}
            type={alert.type}
            message={alert.message}
          />
        )}
      </Drawer>
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
