import React from 'react'
import { useForm } from "react-hook-form";

export default function FormIndex(errors,field) {
    const {
        register
      } = useForm();
  return (
    <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="group" >
            field <span className="text-red-700">*</span>
          </label>
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="group" type="text"
            {...register("group", { required: true })}
          />
          {errors.group?.type === "required" && (
            <p className="mt-2 block text-gray-700 text-sm font-bold mb-2 pl-2 pr-2 bg-red-200 rounded">
              Group is required
            </p>
          )}
        </div>
  )
}
