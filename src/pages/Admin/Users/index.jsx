// import { useState, useEffect } from "react";

// import { useDispatch, useSelector } from "react-redux";
// import { registerAdmin } from "../../../store/admin/auth";
// import {
//   getAdmins,
//   updateAdmin,
//   deleteAdmin,
// } from "../../../store/admin/adminSettings";

// import Cookies from "universal-cookie";

// import { Form, Input, Alert, List } from "antd";

// import AdminAddButton from "../../../components/AdminAddButton";
// import Panel from "../../../components/AdminPanel";
// import Drawer from "../../../components/Drawer";

// import { FaEdit } from "react-icons/fa";
// import { MdDelete } from "react-icons/md";

// import styles from "./users.module.scss";
// import "../Products/antd-pr.scss";

// const cookies = new Cookies();

// export default function Users() {
//   const [openDrawer, setOpenDrawer] = useState(false);
//   const [openEditDrawer, setOpenEditDrawer] = useState(false);
//   const [registerInfo, setRegisterInfo] = useState({
//     name: "",
//     password: "",
//   });
//   const [alertType, setAlertType] = useState({
//     type: "",
//     message: "",
//     isVisible: false,
//   });
//   const [currentAdmin, setCurrentAdmin] = useState({});
//   const admins = useSelector((state) => state.adminSettings.admins);

//   const dispatch = useDispatch();

//   useEffect(() => {
//     dispatch(getAdmins());
//   }, [dispatch, alertType]);

//   const onClose = (setFunc) => {
//     setFunc(false);
//   };

//   const handleDrawer = (setFunc) => {
//     setFunc(true);
//   };

//   const handleRegister = () => {
//     dispatch(
//       registerAdmin({
//         admin: registerInfo,
//         token: cookies.get("adminAccessToken"),
//       })
//     )
//       .unwrap()
//       .then(() => {
//         setAlertType({
//           type: "success",
//           message: "Успешно!",
//           isVisible: true,
//         });
//       })
//       .catch((e) => {
//         setAlertType({
//           type: "error",
//           message: "Ошибка " + e,
//           isVisible: true,
//         });
//       });

//     setTimeout(() => {
//       setAlertType({
//         type: "",
//         message: "",
//         isVisible: false,
//       });
//       setOpenDrawer(false);
//     }, 2000);
//   };

//   const handleAdminUpdate = () => {
//     dispatch(
//       updateAdmin({
//         id: currentAdmin.id,
//         user: currentAdmin,
//       })
//     )
//       .unwrap()
//       .then(() => {
//         setAlertType({
//           type: "success",
//           message: "Успешно!",
//           isVisible: true,
//         });
//       })
//       .catch((e) => {
//         setAlertType({
//           type: "error",
//           message: "Ошибка " + e,
//           isVisible: true,
//         });
//       });

//     setTimeout(() => {
//       setAlertType({
//         type: "",
//         message: "",
//         isVisible: false,
//       });
//       setOpenEditDrawer(false);
//     }, 2000);
//   };

//   return (
//     <div className={styles.admins}>
//       <div className={styles.adminsHead}>
//         <span className={styles.adminsHeadTitle}>Пользователи</span>
//         <AdminAddButton
//           onClick={() => handleDrawer(setOpenDrawer)}
//           text={"Добавить админа"}
//         />
//       </div>
//       <Panel title="Все админы">
//         <List
//           itemLayout="vertical"
//           style={{
//             paddingTop: 15,
//           }}
//           dataSource={admins ? admins : []}
//           renderItem={(item) => (
//             <div className={styles.adminCard}>
//               <div className={styles.adminName}>{item.name}</div>
//               <div className={styles.actions}>
//                 <FaEdit
//                   onClick={() => {
//                     setCurrentAdmin(item);
//                     handleDrawer(setOpenEditDrawer);
//                   }}
//                   color="#3DD04F"
//                   size={24}
//                 />
//                 <MdDelete
//                   onClick={() => {
//                     dispatch(deleteAdmin(item.id))
//                       .unwrap()
//                       .then(() => {
//                         setAlertType({
//                           type: "success",
//                           message: "Успешно!",
//                           isVisible: true,
//                         });
//                       })
//                       .catch((e) => {
//                         setAlertType({
//                           type: "error",
//                           message: "Ошибка " + e,
//                           isVisible: true,
//                         });
//                       });

//                     setTimeout(() => {
//                       setAlertType({
//                         type: "",
//                         message: "",
//                         isVisible: false,
//                       });
//                     }, 2000);
//                   }}
//                   color="#E71D36"
//                   size={24}
//                 />
//               </div>
//             </div>
//           )}
//         />
//       </Panel>
//       <Drawer
//         onSubmit={handleRegister}
//         open={openDrawer}
//         onClose={() => onClose(setOpenDrawer)}
//         name="Добавить админа"
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
//               style={{
//                 display: "flex",
//                 flexDirection: "column",
//                 color: "#ffffff",
//               }}
//               label={<label className={styles.label}>Login</label>}
//               name="name"
//             >
//               <Input
//                 onChange={(e) => {
//                   setRegisterInfo({
//                     ...registerInfo,
//                     name: e.target.value,
//                   });
//                 }}
//               />
//             </Form.Item>
//             <Form.Item
//               style={{
//                 display: "flex",
//                 flexDirection: "column",
//                 color: "#ffffff",
//               }}
//               label={<label className={styles.label}>Password</label>}
//               name="password"
//             >
//               <Input.Password
//                 onChange={(e) => {
//                   setRegisterInfo({
//                     ...registerInfo,
//                     password: e.target.value,
//                   });
//                 }}
//               />
//             </Form.Item>
//           </Form>
//         </div>
//         {alertType.isVisible && (
//           <Alert
//             style={{
//               width: "100%",
//             }}
//             type={alertType.type}
//             message={alertType.message}
//           />
//         )}
//       </Drawer>
//       <Drawer
//         onSubmit={handleAdminUpdate}
//         open={openEditDrawer}
//         onClose={() => {
//           setCurrentAdmin({});
//           onClose(setOpenEditDrawer);
//         }}
//         name="Добавить админа"
//       >
//         <div
//           style={{
//             width: "100%",
//           }}
//         >
//           <Form
//             name="edit"
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
//                 name: ["name"],
//                 value: currentAdmin.name,
//               },
//             ]}
//           >
//             <Form.Item
//               style={{
//                 display: "flex",
//                 flexDirection: "column",
//                 color: "#ffffff",
//               }}
//               label={<label className={styles.label}>Login</label>}
//               name="name"
//               initialValue={currentAdmin.name}
//             >
//               <Input
//                 onChange={(e) => {
//                   setCurrentAdmin({
//                     ...currentAdmin,
//                     name: e.target.value,
//                   });
//                 }}
//               />
//             </Form.Item>
//             <Form.Item
//               style={{
//                 display: "flex",
//                 flexDirection: "column",
//                 color: "#ffffff",
//               }}
//               label={<label className={styles.label}>New Password</label>}
//               name="password"
//             >
//               <Input.Password
//                 onChange={(e) => {
//                   setCurrentAdmin({
//                     ...currentAdmin,
//                     password: e.target.value,
//                   });
//                 }}
//               />
//             </Form.Item>
//           </Form>
//         </div>
//         {alertType.isVisible && (
//           <Alert
//             style={{
//               width: "100%",
//             }}
//             type={alertType.type}
//             message={alertType.message}
//           />
//         )}
//       </Drawer>
//       {alertType.isVisible && (
//         <Alert
//           style={{
//             width: "20%",
//           }}
//           type={alertType.type}
//           message={alertType.message}
//         />
//       )}
//     </div>
//   );
// }
