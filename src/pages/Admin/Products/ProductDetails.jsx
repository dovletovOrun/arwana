// import { useState, useEffect } from "react";
// import { useLocation } from "react-router-dom";
// import { useDispatch } from "react-redux";

// import { getOneProduct } from "../../../store/admin/products";

// import { Tabs } from "antd";
// import AdminAddButton from "../../../components/AdminAddButton";
// import DetailsForm from "../../../components/DetailsForm";

// import styles from "./product-det.module.scss";
// import "./antd-pr.scss";

// export default function ProductDetails() {
//   const dispatch = useDispatch();

//   const [tabs, setTabs] = useState([]);
//   const [alert, setAlert] = useState({
//     type: "",
//     message: "",
//     isVisible: false,
//   });
//   const [prOptions, setPrOptions] = useState({
//     tkmTitle: "earn",
//     ruTitle: "earn",
//     enTitle: "earn",
//   });
//   const { state } = useLocation();

//   useEffect(() => {
//     dispatch(getOneProduct(state)).then((res) => {
//       if (res.payload.productOptions.length > 0) {
//         const options = res.payload.productOptions.map((pr, i) => {
//           return {
//             key: i + 1,
//             label: "Доп. инфо. " + (i + 1),
//             children: (
//               <DetailsForm
//                 pr={pr}
//                 productId={state}
//                 alert={alert}
//                 setAlert={setAlert}
//               />
//             ),
//           };
//         });

//         setTabs(options);
//       } else {
//         setTabs([
//           {
//             key: 1,
//             label: "Доп. инфо. 1",
//             children: (
//               <DetailsForm
//                 pr={null}
//                 productId={state}
//                 alert={alert}
//                 setAlert={setAlert}
//               />
//             ),
//           },
//         ]);
//       }
//     });
//   }, [alert, dispatch]);

//   const handleTabAdd = () => {
//     if (tabs.length === 4) {
//       return;
//     }
//     setTabs([
//       ...tabs,
//       {
//         key: tabs.length + 1,
//         label: `Доп. инфо. ${tabs.length + 1}`,
//         children: (
//           <DetailsForm
//             pr={null}
//             productId={state}
//             alert={alert}
//             setAlert={setAlert}
//           />
//         ),
//       },
//     ]);
//   };

//   return (
//     <div className={styles.container}>
//       <Tabs items={tabs} animated />
//       <AdminAddButton text={"Добавить ещё"} onClick={handleTabAdd} />
//     </div>
//   );
// }
