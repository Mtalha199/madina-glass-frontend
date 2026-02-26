"use client";
import { useState } from "react";

export const useModal = (initialState: boolean = false) => {
  const [isOpen, setIsOpen] = useState(initialState);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  function toggleModal() {
    setIsOpen((prev) => !prev);
  }

  return { isOpen, openModal, closeModal, toggleModal };
};
