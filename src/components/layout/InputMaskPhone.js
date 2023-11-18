"use client";
import React from "react";
import InputMask from "react-input-mask";

const InputMaskPhone = ({ input }) => {
  return (
    <InputMask mask="+7 (999) 999-99-99" maskChar="_">
      {() => input}
    </InputMask>
  );
};

export default InputMaskPhone;
