import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  getCategories,
  addCategory,
  editCategory,
  deleteCategory,
  bindBrandCat,
  deleteCatBrand,
} from "../../../store/admin/categories";
import { getBrands } from "../../../store/admin/brands";

import { Input, Form, List, Alert, Select } from "antd";

import AdminAddButton from "../../../components/AdminAddButton";
import Panel from "../../../components/AdminPanel";
import Drawer from "../../../components/Drawer";

import { FaEdit } from "react-icons/fa";
import {
  MdDelete,
  MdImageNotSupported,
  MdOutlinePermMedia,
} from "react-icons/md";

import styles from "./categories.module.scss";
import "./categories.scss";

const imagePath = import.meta.env.VITE_IMAGE_PATH;

export default function CategoriesList() {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [openEditDrawer, setOpenEditDrawer] = useState(false);
  const [brandOptions, setBrandOptions] = useState([]);
  const [alertType, setAlertType] = useState({
    type: "",
    message: "",
    isVisible: false,
  });
  const [newCategory, setNewCategory] = useState({
    tkmTitle: "",
    ruTitle: "",
    enTitle: "",
  });
  const [currentCategory, setCurrentCategory] = useState({});
  const categories = useSelector((state) => state.categories.categories);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getCategories());
    dispatch(getBrands()).then((res) => {
      const brands = res.payload.brands.map((br) => {
        return {
          label: br.ruTitle,
          value: br.id,
        };
      });

      setBrandOptions(brands);
    });
  }, [dispatch, alertType]);

  const onClose = (setFunc) => {
    setFunc(false);
  };

  const handleDrawer = (setFunc) => {
    setFunc(true);
  };

  const handleAddCategory = () => {
    dispatch(addCategory(newCategory))
      .unwrap()
      .then(() => {
        setAlertType({
          type: "success",
          message: "Успешно!",
          isVisible: true,
        });
        setNewCategory({});
      })
      .catch((e) => {
        setAlertType({
          type: "error",
          message: "Ошибка " + e,
          isVisible: true,
        });
      });

    setTimeout(() => {
      setAlertType({
        type: "",
        message: "",
        isVisible: false,
      });
      setOpenDrawer(false);
      setNewCategory({
        tkmTitle: "",
        ruTitle: "",
        enTitle: "",
      });
    }, 2000);
  };

  const handleUpdateCategory = () => {
    dispatch(
      editCategory({
        id: currentCategory.id,
        category: currentCategory,
      })
    )
      .unwrap()
      .then(() => {
        setAlertType({
          type: "success",
          message: "Успешно!",
          isVisible: true,
        });
      })
      .catch((e) => {
        setAlertType({
          type: "error",
          message: "Ошибка " + e,
          isVisible: true,
        });
      });

    setTimeout(() => {
      setAlertType({
        type: "",
        message: "",
        isVisible: false,
      });
      setOpenEditDrawer(false);
    }, 2000);
  };

  return (
    <div className={styles.adminCats}>
      <div className={styles.catHead}>
        <span className={styles.catHeadTitle}>Коллекции ( Category )</span>
        <AdminAddButton
          onClick={() => handleDrawer(setOpenDrawer)}
          text={"Добавить категорию"}
        />
      </div>
      <Panel title="Все категории">
        <List
          itemLayout="vertical"
          style={{
            paddingTop: 15,
          }}
          dataSource={categories ? categories : []}
          renderItem={(item) => (
            <div className={styles.catCard}>
              <div className={styles.names}>
                <div className={styles.catName}>
                  <span>TKM: </span>
                  <span>{item.tkmTitle}</span>
                </div>
                <div className={styles.catName}>
                  {" "}
                  <span>RU: </span>
                  <span>{item.ruTitle}</span>
                </div>
                <div className={styles.catName}>
                  {" "}
                  <span>EN: </span>
                  <span>{item.enTitle}</span>
                </div>
                <Select
                  mode="multiple"
                  size={"default"}
                  placeholder="Выберите Бренды"
                  defaultValue={() => {
                    const selectedBrands = item?.categoryBrands?.map((val) => {
                      return {
                        value: val.brand?.id,
                        label: val.brand?.ruTitle,
                      };
                    });

                    return selectedBrands;
                  }}
                  style={{
                    width: "100%",
                  }}
                  options={brandOptions}
                  onSelect={(val) => {
                    dispatch(
                      bindBrandCat({
                        brandId: val,
                        catId: item.id,
                      })
                    );
                  }}
                  onDeselect={(val) => {
                    dispatch(
                      deleteCatBrand({
                        brandId: val,
                        catId: item.id,
                      })
                    );
                  }}
                />
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
                      setCurrentCategory(item);
                      handleDrawer(setOpenEditDrawer);
                    }}
                    color="#3DD04F"
                    size={24}
                  />

                  <MdOutlinePermMedia
                    onClick={() =>
                      navigate("/admin/categories/imageupload", {
                        state: item.id,
                      })
                    }
                    color="#ffe37a"
                    size={24}
                  />
                  <MdDelete
                    onClick={() => {
                      dispatch(deleteCategory(item.id))
                        .unwrap()
                        .then(() => {
                          setAlertType({
                            type: "success",
                            message: "Успешно!",
                            isVisible: true,
                          });
                        })
                        .catch((e) => {
                          setAlertType({
                            type: "error",
                            message: "Ошибка " + e,
                            isVisible: true,
                          });
                        });

                      setTimeout(() => {
                        setAlertType({
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
        onSubmit={handleAddCategory}
        open={openDrawer}
        onClose={() => onClose(setOpenDrawer)}
        name="Добавление категории"
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
                <label className={styles.label}>Название категории (tm)</label>
              }
              name="tkmTitle"
            >
              <Input
                onChange={(e) => {
                  setNewCategory({
                    ...newCategory,
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
                <label className={styles.label}>Название категории (ru)</label>
              }
              name="ruTitle"
            >
              <Input
                onChange={(e) => {
                  setNewCategory({
                    ...newCategory,
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
                <label className={styles.label}>Название категории (en)</label>
              }
              name="enTitle"
            >
              <Input
                onChange={(e) => {
                  setNewCategory({
                    ...newCategory,
                    enTitle: e.target.value,
                  });
                }}
              />
            </Form.Item>
          </Form>
        </div>
        {alertType.isVisible && (
          <Alert
            style={{
              width: "100%",
            }}
            type={alertType.type}
            message={alertType.message}
          />
        )}
      </Drawer>
      <Drawer
        onSubmit={handleUpdateCategory}
        open={openEditDrawer}
        onClose={() => {
          setCurrentCategory({});
          onClose(setOpenEditDrawer);
        }}
        name="Добавление категории"
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
                value: currentCategory.tkmTitle,
              },
              {
                name: ["ruTitle"],
                value: currentCategory.ruTitle,
              },
              {
                name: ["enTitle"],
                value: currentCategory.enTitle,
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
                <label className={styles.label}>Название категории (tm)</label>
              }
              name="tkmTitle"
              initialValue={currentCategory.tkmTitle}
            >
              <Input
                onChange={(e) => {
                  setCurrentCategory({
                    ...currentCategory,
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
                <label className={styles.label}>Название категории (ru)</label>
              }
              name="ruTitle"
              initialValue={currentCategory.ruTitle}
            >
              <Input
                onChange={(e) => {
                  setCurrentCategory({
                    ...currentCategory,
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
                <label className={styles.label}>Название категории (en)</label>
              }
              name="enTitle"
              initialValue={currentCategory.enTitle}
            >
              <Input
                onChange={(e) => {
                  setCurrentCategory({
                    ...currentCategory,
                    enTitle: e.target.value,
                  });
                }}
              />
            </Form.Item>
          </Form>
        </div>
        {alertType.isVisible && (
          <Alert
            style={{
              width: "100%",
            }}
            type={alertType.type}
            message={alertType.message}
          />
        )}
      </Drawer>
      {alertType.isVisible && (
        <Alert
          style={{
            width: "20%",
          }}
          type={alertType.type}
          message={alertType.message}
        />
      )}
    </div>
  );
}
