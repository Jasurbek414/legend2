import React, { useState } from "react";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function Loginpage() {
  const [token, setToken] = useState("");
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (formData) => {
    try {
      const response = await axios.post(
        'api/auth/authenticate',
        formData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.status >= 200 && response.status < 300) {
        const data = response.data;
        setToken(data.access_token);
       
        // console.log(data);
        // return

        sessionStorage.setItem("token", data.access_token);
        sessionStorage.setItem("myId", data?.id)
        sessionStorage.setItem("role", data?.role)

        window.location.replace("/"); 
        
      } else {
        console.error(`Server returned an error: ${response.statusText}`);
      }
    } catch (error) {
      toast.error(`Tizimga kira olmadingiz‼️`, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  return (
    <>
      <div className="flex w-[100%] h-[100vh]">
        <div className="bg-[#F5F5F5] w-[50%] flex items-center justify-center">
          <img
            src="https://images.unsplash.com/photo-1497294815431-9365093b7331?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1950&q=80"
            className="h-full"
            alt="Login background"
          />
        </div>
        <div className="w-[50%] flex items-center">
          <div className="ml-28 w-[440px] h-[406px]">
            <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
              <h1 className="text-neutral-800 text-5xl font-bold font-sans">
                Tizimga kirish
              </h1>

              <input
                className="w-[440px] h-[56px] pl-5 rounded-md border border-stone-300 mt-6"
                type="text"
                placeholder="Username"
                {...register("username", { required: true })}
              />
              <input
                className="w-[440px] h-[56px] pl-5 rounded-md border border-stone-300 mt-6"
                type="password"
                placeholder="Password"
                {...register("password", { required: true })}
              />
              <button
                type="submit"
                className="cursor-pointer w-[440px] h-[52px] bg-neutral-900 rounded-lg flex items-center justify-center text-white text-lg font-bold font-sans mt-6"
              >
                Kirish
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Loginpage;
