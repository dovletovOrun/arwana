// import { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";

// import {
//   createBrand,
//   // getBrands,
//   updateBrand,
//   deleteBrand,
// } from "../../../store/admin/brands";
// import { getCategories } from "../../../store/admin/categories";
// import { bindBrandCat, deleteCatBrand } from "../../../store/admin/categories";

// import { Form, Input, Alert, Select, List } from "antd";

// import AdminAddButton from "../../../components/AdminAddButton";
// import Panel from "../../../components/AdminPanel";
// import Drawer from "../../../components/Drawer";
// import Dropzone from "../../../components/Dropzone";

// import { MdOutlinePermMedia, MdImageNotSupported } from "react-icons/md";
// import { FaEdit } from "react-icons/fa";
// import { MdDelete } from "react-icons/md";

// import styles from "./brands.module.scss";
// import "../Products/antd-pr.scss";

// const imagePath = import.meta.env.VITE_IMAGE_PATH;

// export default function BrandsList() {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const [openDrawer, setOpenDrawer] = useState(false);
//   const [openEditDrawer, setOpenEditDrawer] = useState(false);
//   const [currentBrand, setCurrentBrand] = useState({
//     logoId: "",
//   });
//   const [catSelectOptions, setCatSelectOptions] = useState([]);
//   const [newBrand, setNewBrand] = useState({
//     tkmTitle: "",
//     ruTitle: "",
//     enTitle: "",
//     tkmDescription: "",
//     ruDescription: "",
//     enDescription: "",
//     isMain: false,
//   });
//   const [alert, setAlert] = useState({});
//   const [brandImage, setBrandImage] = useState("");

//   const brands = useSelector((state) => state.brands.brands);

//   useEffect(() => {
//     dispatch(getCategories()).then((res) => {
//       const options =
//         res &&
//         res.payload.categories.map((cat) => {
//           return {
//             label: cat.ruTitle,
//             value: cat.id,
//           };
//         });
//       setCatSelectOptions(options);
//     });

//     // dispatch(getBrands()).then((res) => {
//     //   for (let br of res.payload.brands) {
//     //     if (br.medias.length > 0) {
//     //       for (let img of br.medias) {
//     //         if (img.fileType === "image") {
//     //           setBrandImage(img.fileName);
//     //         }
//     //       }
//     //     }
//     //   }
//     // });
//   }, [dispatch, alert]);

//   const onClose = (setFunc) => {
//     setFunc(false);
//   };

//   const handleDrawer = (setFunc) => {
//     setFunc(true);
//   };

//   const handleAddBrand = () => {
//     dispatch(createBrand(newBrand))
//       .unwrap()
//       .then((res) => {
//         setAlert({
//           type: "success",
//           message: "Успешно!",
//           isVisible: true,
//         });
//         setNewBrand({});
//       })
//       .catch((e) => {
//         setAlert({
//           type: "error",
//           message: "Ошибка " + e,
//           isVisible: true,
//         });
//       });

//     setTimeout(() => {
//       setAlert({
//         type: "",
//         message: "",
//         isVisible: false,
//       });
//       setOpenDrawer(false);
//       setNewBrand({
//         tkmTitle: "",
//         ruTitle: "",
//         enTitle: "",
//         tkmDescription: "",
//         ruDescription: "",
//         enDescription: "",
//       });
//     }, 2000);
//   };

//   const handleUpdateBrand = () => {
//     dispatch(
//       updateBrand({
//         brandId: currentBrand.id,
//         brand: currentBrand,
//       })
//     )
//       .unwrap()
//       .then((res) => {
//         setAlert({
//           type: "success",
//           message: "Успешно!",
//           isVisible: true,
//         });
//         setCurrentBrand(res.brand);
//       })
//       .catch((e) => {
//         setAlert({
//           type: "error",
//           message: "Ошибка " + e,
//           isVisible: true,
//         });
//       });

//     setTimeout(() => {
//       setAlert({
//         type: "",
//         message: "",
//         // isVisible: false,
//       });
//     }, 2000);
//   };

//   return (
//     <div className={styles.adminBrands}>
//       <div className={styles.brandHead}>
//         <span className={styles.brandHeadTitle}>Бренды</span>
//         <AdminAddButton
//           onClick={() => handleDrawer(setOpenDrawer)}
//           text={"Добавить бренд"}
//         />
//       </div>
//       <Panel title="Все бренды">
//         <List
//           itemLayout="vertical"
//           style={{
//             paddingTop: 15,
//           }}
//           dataSource={brands ? brands : []}
//           renderItem={(item) => (
//             <div className={styles.brandCard}>
//               <div className={styles.names}>
//                 <div className={styles.brandName}>
//                   <span>TKM: </span>
//                   <span>{item.tkmTitle}</span>
//                 </div>
//                 <div className={styles.brandName}>
//                   {" "}
//                   <span>RU: </span>
//                   <span>{item.ruTitle}</span>
//                 </div>
//                 <div className={styles.brandName}>
//                   {" "}
//                   <span>EN: </span>
//                   <span>{item.enTitle}</span>
//                 </div>
//                 <Select
//                   mode="multiple"
//                   size={"default"}
//                   placeholder="Выберите Категории"
//                   defaultValue={() => {
//                     const selectedCats =
//                       item &&
//                       item.brandCategories?.map((val) => {
//                         return {
//                           value: val.category.id,
//                           label: val.category.ruTitle,
//                         };
//                       });

//                     return selectedCats;
//                   }}
//                   style={{
//                     width: "100%",
//                   }}
//                   options={catSelectOptions}
//                   onSelect={(val) => {
//                     dispatch(
//                       bindBrandCat({
//                         brandId: item.id,
//                         catId: val,
//                       })
//                     );
//                   }}
//                   onDeselect={(val) => {
//                     dispatch(
//                       deleteCatBrand({
//                         brandId: item.id,
//                         catId: val,
//                       })
//                     );
//                   }}
//                 />
//               </div>
//               <div className={styles.catProps}>
//                 {item.medias.length === 0 ? (
//                   <div className={styles.noimage}>
//                     <MdImageNotSupported color="#fff" size={24} />
//                   </div>
//                 ) : (
//                   <img
//                     src={imagePath + item.medias[0].fileName}
//                     alt="category"
//                   />
//                 )}
//                 <div className={styles.actions}>
//                   <FaEdit
//                     color="#3DD04F"
//                     onClick={() => {
//                       setCurrentBrand(item);
//                       handleDrawer(setOpenEditDrawer);
//                     }}
//                     size={24}
//                   />

//                   <MdOutlinePermMedia
//                     onClick={() =>
//                       navigate("/admin/brands/imageupload", {
//                         state: item.id,
//                       })
//                     }
//                     color="#ffe37a"
//                     size={24}
//                   />
//                   <MdDelete
//                     onClick={() => {
//                       dispatch(deleteBrand(item.id))
//                         .unwrap()
//                         .then(() => {
//                           setAlert({
//                             type: "success",
//                             message: "Успешно!",
//                             isVisible: true,
//                           });
//                         })
//                         .catch((e) => {
//                           setAlert({
//                             type: "error",
//                             message: "Ошибка " + e,
//                             isVisible: true,
//                           });
//                         });

//                       setTimeout(() => {
//                         setAlert({
//                           type: "",
//                           message: "",
//                           isVisible: false,
//                         });
//                       }, 2000);
//                     }}
//                     color="#E71D36"
//                     size={24}
//                   />
//                 </div>
//               </div>
//             </div>
//           )}
//         />
//       </Panel>
//       <Drawer
//         onSubmit={handleAddBrand}
//         open={openDrawer}
//         onClose={() => onClose(setOpenDrawer)}
//         name="Добавление бренда"
//       >
//         <div
//           style={{
//             width: "100%",
//           }}
//         >
//           <Form
//             name="basic"
//             labelCol={{
//               span: 8,
//             }}
//             wrapperCol={{
//               span: 32,
//             }}
//             style={{
//               width: "100%",
//             }}
//             layout="vertical"
//             autoComplete="off"
//             labelWrap={false}
//           >
//             <Form.Item
//               label={
//                 <label className={styles.label}>Название бренда(tm)</label>
//               }
//               name="tkmTitle"
//             >
//               <Input
//                 onChange={(e) => {
//                   setNewBrand({
//                     ...newBrand,
//                     tkmTitle: e.target.value,
//                   });
//                 }}
//               />
//             </Form.Item>
//             <Form.Item
//               label={
//                 <label className={styles.label}>Название бренда (ru)</label>
//               }
//               name="ruTitle"
//             >
//               <Input
//                 onChange={(e) => {
//                   setNewBrand({
//                     ...newBrand,
//                     ruTitle: e.target.value,
//                   });
//                 }}
//               />
//             </Form.Item>
//             <Form.Item
//               label={
//                 <label className={styles.label}>Название бренда (en)</label>
//               }
//               name="enTitle"
//             >
//               <Input
//                 onChange={(e) => {
//                   setNewBrand({
//                     ...newBrand,
//                     enTitle: e.target.value,
//                   });
//                 }}
//               />
//             </Form.Item>
//             <Form.Item
//               label={
//                 <label className={styles.label}>Описание бренда (tm)</label>
//               }
//               name="tkmDescription"
//             >
//               <Input.TextArea
//                 onChange={(e) => {
//                   setNewBrand({
//                     ...newBrand,
//                     tkmDescription: e.target.value,
//                   });
//                 }}
//                 style={{ height: 120, resize: "none" }}
//               />
//             </Form.Item>
//             <Form.Item
//               label={
//                 <label className={styles.label}>Описание бренда (ru)</label>
//               }
//               name="ruDescription"
//             >
//               <Input.TextArea
//                 onChange={(e) => {
//                   setNewBrand({
//                     ...newBrand,
//                     ruDescription: e.target.value,
//                   });
//                 }}
//                 style={{ height: 120, resize: "none" }}
//               />
//             </Form.Item>
//             <Form.Item
//               label={
//                 <label className={styles.label}>Описание бренда (en)</label>
//               }
//               name="enDescription"
//             >
//               <Input.TextArea
//                 onChange={(e) => {
//                   setNewBrand({
//                     ...newBrand,
//                     enDescription: e.target.value,
//                   });
//                 }}
//                 style={{ height: 120, resize: "none" }}
//               />
//             </Form.Item>
//             <Form.Item>
//               <Select
//                 options={[
//                   {
//                     label: "Главная (да)",
//                     value: true,
//                   },
//                   {
//                     label: "Главная (нет)",
//                     value: false,
//                   },
//                 ]}
//                 onChange={(val) => {
//                   setNewBrand({
//                     ...newBrand,
//                     isMain: val,
//                   });
//                 }}
//               />
//             </Form.Item>
//           </Form>
//         </div>
//         {alert.isVisible && (
//           <Alert
//             style={{
//               width: "100%",
//             }}
//             type={alert.type}
//             message={alert.message}
//           />
//         )}
//       </Drawer>
//       <Drawer
//         onSubmit={handleUpdateBrand}
//         open={openEditDrawer}
//         onClose={() => {
//           setCurrentBrand({});
//           onClose(setOpenEditDrawer);
//         }}
//         name="Добавление бренда"
//       >
//         <div
//           style={{
//             width: "100%",
//           }}
//         >
//           <Form
//             name="basic"
//             labelCol={{
//               span: 8,
//             }}
//             wrapperCol={{
//               span: 32,
//             }}
//             style={{
//               width: "100%",
//             }}
//             layout="vertical"
//             autoComplete="off"
//             labelWrap={false}
//             fields={[
//               {
//                 name: ["tkmTitle"],
//                 value: currentBrand.tkmTitle,
//               },
//               {
//                 name: ["ruTitle"],
//                 value: currentBrand.ruTitle,
//               },
//               {
//                 name: ["enTitle"],
//                 value: currentBrand.enTitle,
//               },
//               {
//                 name: ["tkmDescription"],
//                 value: currentBrand.tkmDescription,
//               },
//               {
//                 name: ["ruDescription"],
//                 value: currentBrand.ruDescription,
//               },
//               {
//                 name: ["enDescription"],
//                 value: currentBrand.enDescription,
//               },
//               {
//                 name: ["isMain"],
//                 value: currentBrand.isMain,
//               },
//             ]}
//           >
//             <Form.Item
//               label={
//                 <label className={styles.label}>Название бренда(tm)</label>
//               }
//               name="tkmTitle"
//             >
//               <Input
//                 onChange={(e) => {
//                   setCurrentBrand({
//                     ...currentBrand,
//                     tkmTitle: e.target.value,
//                   });
//                 }}
//               />
//             </Form.Item>
//             <Form.Item
//               label={
//                 <label className={styles.label}>Название бренда (ru)</label>
//               }
//               name="ruTitle"
//             >
//               <Input
//                 onChange={(e) => {
//                   setCurrentBrand({
//                     ...currentBrand,
//                     ruTitle: e.target.value,
//                   });
//                 }}
//               />
//             </Form.Item>
//             <Form.Item
//               label={
//                 <label className={styles.label}>Название бренда (en)</label>
//               }
//               name="enTitle"
//             >
//               <Input
//                 onChange={(e) => {
//                   setCurrentBrand({
//                     ...currentBrand,
//                     enTitle: e.target.value,
//                   });
//                 }}
//               />
//             </Form.Item>
//             <Form.Item
//               label={
//                 <label className={styles.label}>Описание бренда (tm)</label>
//               }
//               name="tkmDescription"
//             >
//               <Input.TextArea
//                 onChange={(e) => {
//                   setCurrentBrand({
//                     ...currentBrand,
//                     tkmDescription: e.target.value,
//                   });
//                 }}
//                 style={{ height: 120, resize: "none" }}
//               />
//             </Form.Item>
//             <Form.Item
//               label={
//                 <label className={styles.label}>Описание бренда (ru)</label>
//               }
//               name="ruDescription"
//             >
//               <Input.TextArea
//                 onChange={(e) => {
//                   setCurrentBrand({
//                     ...currentBrand,
//                     ruDescription: e.target.value,
//                   });
//                 }}
//                 style={{ height: 120, resize: "none" }}
//               />
//             </Form.Item>
//             <Form.Item
//               label={
//                 <label className={styles.label}>Описание бренда (en)</label>
//               }
//               name="enDescription"
//             >
//               <Input.TextArea
//                 onChange={(e) => {
//                   setCurrentBrand({
//                     ...currentBrand,
//                     enDescription: e.target.value,
//                   });
//                 }}
//                 style={{ height: 120, resize: "none" }}
//               />
//             </Form.Item>
//             <Form.Item name="isMain">
//               <Select
//                 options={[
//                   {
//                     label: "Главная (да)",
//                     value: true,
//                   },
//                   {
//                     label: "Главная (нет)",
//                     value: false,
//                   },
//                 ]}
//                 onChange={(val) => {
//                   setCurrentBrand({
//                     ...currentBrand,
//                     isMain: val,
//                   });
//                 }}
//               />
//             </Form.Item>

//             <Form.Item>
//               <Dropzone id={currentBrand.id} />
//             </Form.Item>
//           </Form>
//         </div>
//         {alert.isVisible && (
//           <Alert
//             style={{
//               width: "100%",
//             }}
//             type={alert.type}
//             message={alert.message}
//           />
//         )}
//       </Drawer>
//       {alert.isVisible && (
//         <Alert
//           style={{
//             width: "20%",
//           }}
//           type={alert.type}
//           message={alert.message}
//         />
//       )}
//     </div>
//   );
// }
