import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import PetInfoForm from "../components/PetInfoForm";

import "../assets/styles/Buttons.css";
import "../assets/styles/Colors.css";

const CreatePet = () => {
  const navigate = useNavigate();

  const [alert, setAlert] = useState("");
  const [user, setUser] = useState({});

  useEffect(() => {
    async function check() {
      const res = await fetch("/api/currUser", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.ok) {
        const result = await res.json();
        setUser(result);
      } else {
        navigate("/login");
      }
    }

    check();
  }, []);

  const handleCancel = () => {
    navigate("/");
  };

  const handleSubmit = async (pet) => {
    const res = await fetch("/api/pet", {
      method: "POST",
      body: JSON.stringify({
        userId: user.id,
        name: pet.name,
        species: pet.species,
        breed: pet.breed,
        color: pet.color,
        weight: pet.weight,
        gender: pet.gender,
        neuteredOrSpayed: pet.neuteredOrSpayed,
        birthday: pet.birthday,
        personality: pet.personality,
        timestamp: new Date(),
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.ok) {
      navigate("/");
    } else {
      setAlert("Failed to create new pet.");
    }
  };

  return (
    <PetInfoForm
      handleSubmit={handleSubmit}
      handleCancel={handleCancel}
      title="Tell us about your pet"
      submitButtonText="Create"
      alert={alert}
    />
  );
};

CreatePet.propTypes = {};

export default CreatePet;
