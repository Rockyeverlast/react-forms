import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import styles from "./style.module.css";

const DataTable = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(
          "https://wordpress.betadelivery.com/ips-api/api/viewAllProjectsDataById/18"
        );
        const data = await res.json();
        setItems(data.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchPost();
  }, []);

  const {
    // register,
    // handleSubmit,
    // formState: { errors },
    // setValue,
    setFocus,
  } = useForm({ mode: "onChange" });

  useEffect(() => {
    setFocus("project");
  }, [setFocus]);

  //   const submitform = (data) => {
  //     console.log(data.person);
  //     console.log(data.email);
  //     console.log(data.dateSub);
  //     console.log(data.project);
  //     console.log(data.task);
  //     console.log(data.status);
  //     console.log(data.time);
  //   };

  return (
    <>
      <div className={styles.table}>
        {/* <div
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <form>
            <select
              {...register("project", { required: true })}
              className={styles.tableselect}
              onChange={(e) => {
                console.log(setItems(e.target.value));
              }}
            >
              <option value="">Select project</option>
              <option value="A">Project A</option>
              <option value="B">Project B</option>
              {items.map((item) => {
                return (
                  <option value={item.id} key={item.id}>
                    {item.name}
                  </option>
                );
              })}
            </select>
          </form>
        </div> */}

        {items.map((item) => {
          return (
            <table key={item.id}>
              <thead>
                <tr>
                  <th>Project Name</th>
                  <th>Total Hours</th>
                  <th>Last updated</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{item.name}</td>
                  <td>{item.total_hours}</td>
                  <td>{item.last_updated}</td>
                </tr>
              </tbody>
            </table>
          );
        })}
      </div>
    </>
  );
};

export default DataTable;
