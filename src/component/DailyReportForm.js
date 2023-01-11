import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import styles from "./style.module.css";

const DailyReportForm = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(
          "https://wordpress.betadelivery.com/ips-api/api/viewAllProjectsDataById/18"
        );
        const data = await res.json();
        setItems(data.data);
        console.log(data.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchPost();
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    setFocus,
  } = useForm({ mode: "onChange" });

  const submitform = (data) => {
    console.log(data.person);
    console.log(data.email);
    console.log(data.dateSub);
    console.log(data.project);
    console.log(data.task);
    console.log(data.status);
    console.log(data.time);
  };

  // const savedData = () => {
  //   fetch(
  //     "https://wordpress.betadelivery.com/ips-api/api/viewAllProjectsDataById/18",
  //     {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         name: formData, // Use your own property name / key
  //       }),
  //     }
  //   )
  //     .then((res) => res.json())
  //     .then((result) => setData(result.rows))
  //     .catch((err) => console.log(err));
  // };

  useEffect(() => {
    setValue("dateSub", new Date().toLocaleDateString("en-GB"));
    setFocus("person");
    // eslint-disable-next-line
  }, [setFocus]);

  //   console.log(errors);

  // console.log(errors.email?.message);

  return (
    <div className={styles.dailyreport}>
      <form onSubmit={handleSubmit(submitform)}>
        {/* <input
          type="text"
          {...register("FirstName", {
            required: true,
            minLength: { value: 20, message: "min length required is 20" },
          })}
        /> */}
        <h1 style={{ textAlign: "left" }}>Your Details</h1>
        <div className={styles.sec1}>
          <select
            {...register("person", { required: true })}
            className={styles.select}
          >
            <option value="">Select Name</option>
            <option value="A">Person A</option>
            <option value="B">Person B</option>
          </select>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: "fit-content",
              height: "20px",
            }}
          >
            <input
              style={{ marginLeft: "20px", marginRight: "20px" }}
              placeholder="Email"
              type="email"
              {...register("email", {
                required: true,
                message: "Please enter email address",
                pattern: {
                  value:
                    // eslint-disable-next-line
                    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  message: "Invalid email address",
                },
              })}
              //   aria-invalid={errors.mail ? "true" : "false"}
            />
            <span style={{ color: "red", fontSize: "12px" }}>
              {errors.email?.message}
            </span>
            {/* {errors.email && <span> This field is required</span>} */}
          </div>

          <input
            disabled
            // value={new Date().toLocaleDateString("en-GB")}
            {...register("dateSub")}
          />
        </div>

        <h1 style={{ textAlign: "left" }}>Project Details</h1>
        <div className={styles.sec2}>
          <select
            {...register("project", { required: true })}
            className={styles.select}
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

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: "fit-content",
            }}
          >
            <textarea
              {...register("task", {
                required: true,
                minLength: {
                  value: 10,
                  message: "min length required is 10 words",
                },
              })}
              placeholder="Task worked on"
              // style={{ width: "100%" }}
            />
            <span style={{ color: "red", fontSize: "12px" }}>
              {errors.task?.message}
            </span>
          </div>

          <select
            {...register("status", { required: true })}
            className={styles.select}
          >
            <option value="">Select status</option>
            <option value="A">status A</option>
            <option value="B">status B</option>
          </select>

          <input
            placeholder="Hours Spent"
            type="number"
            {...register("time", { required: true })}
            style={{
              width: "90px",
              height: "30px",
              padding: "0",
              textAlign: "center",
            }}
          />
        </div>

        <div style={{ textAlign: "end" }}>
          <button type="submit" className={styles.submit}>
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default DailyReportForm;
