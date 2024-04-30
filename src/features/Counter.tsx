import React from "react";
import type { RootState } from "../store";
import { useSelector, useDispatch } from "react-redux";
import { increment } from "./counterSlice";
import { useForm } from "react-hook-form";
import { CounterState } from "./counterSlice";
export function Counter() {
  const count = useSelector((state: RootState) => state.counter);
  const dispatch = useDispatch();
  console.log(count);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CounterState>();
  const onSubmit = (data: CounterState) => {
    console.log(data);
    dispatch(increment(data));
  };
  return (
    <div>
      <div>
        {/* <button
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
        >
          Increment
        </button> */}
        <div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <label>Title</label>
            <input
              type="text"
              {...register("title", {
                minLength: {
                  value: 4,
                  message: "Minimum length of title is 4 character",
                },
              })}
            />
            {errors.title && errors.title.message}
            <br />
            <label>Description</label>
            <input
              type="text"
              {...register("description", {
                required: "Description is Required",
              })}
            />
            {errors.description && errors.description.message}
            <button type="submit">Submit</button>
          </form>
        </div>
        {count &&
          count.map((c) => (
            <div>
              <h1>{c.title}</h1>
              <p>{c.description}</p>
            </div>
          ))}
      </div>
    </div>
  );
}
