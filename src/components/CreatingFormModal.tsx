import { useState } from "react";
import _ from "lodash";
import axios from "axios";

import Modal from "./Modal";

const API_URL = "http://localhost:8000/person/";

// TODO: ORGANIZE TYPE USAGE IN EVERY METHOD OF THE MODULE

const createPerson = (data: Object) => {
    try {
        (async () => {
            if (_.isEmpty(data)) {
                // TODO: USE SOME ALERT MESSAGE VALIDITY NOTIFICATION
                return;
            }

            await axios.post(
                API_URL,
                { 
                    "Name": _.get(data, "Name", ""),
                    "Birthday": _.get(data, "Birthday", ""),
                    "Cpf": _.get(data, "Cpf", 0),
                    "Gender": _.get(data, "Gender", ""),
                    "Height": _.get(data, "Height", 0),
                    "Weight": _.get(data, "Weight", 0)
                }
            );

            window.location.reload()  // TODO: RETURN THE DATA INSTEAD OF RELOAD PAGE
        })();
    } catch (error) {
        // TODO: USE SOME ALERT MESSAGE TO HANDLE ERRORS AND WARNINGS
        console.debug(error);
    }
}

const CreatingForm = (
    data,
    setData,
    handleChange
) => {
    return (
        <>
            <form className="mt-6 w-full">
                <div className="mb-2">
                    <p className="pt-8 text-ciano-900">
                        Name.
                    </p>
                    <input
                        className="
                            block 
                            w-full 
                            px-4 
                            py-2 
                            mt-2 
                            text-ciano-700 
                            bg-white 
                            border-2
                            rounded-md 
                            focus:border-ciano-400 
                            focus:ring-ciano-300 
                            focus:outline-none 
                            focus:ring 
                            focus:ring-opacity-40
                        "
                        value={data.Name}
                        onChange={handleChange}
                        name="Name"
                    />

                    <p className="py-2 text-ciano-900">
                        Birthday.
                    </p>
                    <input
                        type="date"
                        className="
                            block 
                            w-full 
                            px-4 
                            py-2 
                            mt-2 
                            text-ciano-700 
                            bg-white 
                            border-2
                            rounded-md 
                            focus:border-ciano-400 
                            focus:ring-ciano-300 
                            focus:outline-none 
                            focus:ring 
                            focus:ring-opacity-40
                        "
                        value={data.Birthday}
                        onChange={handleChange}
                        name="Birthday"
                    />

                    <p className="py-2 text-ciano-900">
                        CPF
                    </p>
                    <input
                        className="
                            block 
                            w-full 
                            px-4 
                            py-2 
                            mt-2 
                            text-ciano-700 
                            bg-white 
                            border-2
                            rounded-md 
                            focus:border-ciano-400 
                            focus:ring-ciano-300 
                            focus:outline-none 
                            focus:ring 
                            focus:ring-opacity-40
                        "
                        value={data.Cpf}
                        onChange={handleChange}
                        name="Cpf"
                    />

                    <p className="py-2 text-ciano-900">
                        Gender.
                    </p>
                    <input
                        className="
                            block 
                            w-full 
                            px-4 
                            py-2 
                            mt-2 
                            text-ciano-700 
                            bg-white 
                            border-2
                            rounded-md 
                            focus:border-ciano-400 
                            focus:ring-ciano-300 
                            focus:outline-none 
                            focus:ring 
                            focus:ring-opacity-40
                        "
                        value={data.Gender}
                        onChange={handleChange}
                        name="Gender"
                    />

                    <p className="py-2 text-ciano-900">
                        Height.
                    </p>
                    <input
                        className="
                            block 
                            w-full 
                            px-4 
                            py-2 
                            mt-2 
                            text-ciano-700 
                            bg-white 
                            border-2
                            rounded-md 
                            focus:border-ciano-400 
                            focus:ring-ciano-300 
                            focus:outline-none 
                            focus:ring 
                            focus:ring-opacity-40
                        "
                        value={data.Height}
                        onChange={handleChange}
                        name="Height"
                    />

                    <p className="py-2 text-ciano-900">
                        Weight.
                    </p>
                    <input
                        className="
                            block 
                            w-full 
                            px-4 
                            py-2 
                            mt-2 
                            text-ciano-700 
                            bg-white 
                            border-2
                            rounded-md 
                            focus:border-ciano-400 
                            focus:ring-ciano-300 
                            focus:outline-none 
                            focus:ring 
                            focus:ring-opacity-40

                        "
                        value={data.Weight}
                        onChange={handleChange}
                        name="Weight"
                    />
                </div>
            </form >
        </>
    )
}

export default function CreatingFormModal({
    showModal,
    setShowModal
}) {
    const [data, setData] = useState({
        Name: "",
        Birthday: "",
        Cpf: "",
        Gender: "",
        Height: "",
        Weight: "",
    });
    const handleChange = e => {
        const { name, value } = e.target;
        setData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    return (
        <Modal
            showModal={showModal}
            setShowModal={setShowModal}
            child={
                CreatingForm(
                    data,
                    setData,
                    handleChange
                )
            }
            actionButtonText="Create!"
            actionButtonBgCollor="esmerald"
            actionButtonCallback={() => createPerson(data)}
            cancelButtonCallback={() => setShowModal(false)}
        ></Modal>
    );
}