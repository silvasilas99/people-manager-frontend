import { useEffect, useState } from "react";
import axios from "axios";
import _ from "lodash";

import Button from "./Button";
import EditingFormModal from "./EditingFormModal";

const API_URL = "http://localhost:8000/person/";

// TODO: SLICE THIS COMPONENT IN DIFERENTS MODULES AND ORGANIZE TO MANAGE RESPONSABILITIES CORRECTLY

export default function PeopleTable() {
    const [showEditingFormModal, setShowEditingFormModal] = useState(false);

    const [allPeopleData, setAllPeopleData] = useState([]);

    const [personToEditCurrentData, setPersonToEditCurrentData] = useState({});
    const [personToEditId, setPersonToEditId] = useState("");

    /**
     * 
     * @set to allPeopleData the data from API_URL api path  
     */
    const findAllPersonDataFromApi = async () => {
        const res = await axios.get(API_URL);
        return _.get(res, "data", []);
    };
    useEffect(() => {
        findAllPersonDataFromApi()
            .then((data) => setAllPeopleData(data))
            .catch((e: Error) => console.debug(e));
    }, []);

    const openSetPersonIdAndOpenModal = (personData: Object) => {
        setPersonToEditId(_.get(personData, "id", ""));
        !_.isEmpty(personData) &&
            setPersonToEditCurrentData(personData);
        console.log(personData);
        setShowEditingFormModal(true);
    }
    useEffect(() => {
        if (_.isEmpty(personToEditId)) {
            return;
        }
        if (!_.isEmpty(personToEditCurrentData)) {
            setPersonToEditCurrentData(personToEditCurrentData);
        }
    }, []);

    return (
        <>
            <table
                className="
                    table-auto 
                    bg-white 
                    w-full 
                    text-lg 
                    bg-white 
                    text-center 
                    text-gray-900
                "
            >
                <thead className="text-xlg uppercase ">
                    <tr>
                        <th scope="col" className="py-3 px-6">Name</th>
                        <th scope="col" className="py-3 px-6">Gender</th>
                        <th scope="col" className="py-3 px-6">Height</th>
                        <th scope="col" className="py-3 px-6">Weight</th>
                        <th scope="col" className="py-3 px-6"></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        !_.isEmpty(allPeopleData) &&
                        _.map(
                            allPeopleData,
                            (person: Object) => {
                                return (
                                    <tr className="border-b" key={_.get(person, "id", "no-id")}>
                                        {/* TODO: TRANSFORM THIS ENTIRE TAG IN A DEDICATED COMPONENT */}
                                        <td className="py-4 px-6">
                                            <span className="capitalize ">
                                                {_.get(person, "Name", "")}
                                            </span>
                                        </td>
                                        <td className="py-4 px-6">
                                            <span className="capitalize">
                                                {_.get(person, "Gender", "")}
                                            </span>
                                        </td>
                                        <td className="py-4 px-6">
                                            <span className="capitalize">
                                                {_.get(person, "Height", "")}
                                            </span>
                                        </td>
                                        <td className="py-4 px-6">
                                            <span className="capitalize">
                                                {_.get(person, "Weight", "")}
                                            </span>
                                        </td>
                                        <td className="py-4 px-6">
                                            <span className="pr-3">
                                                <button
                                                    className={`
                                                        h-8 
                                                        w-20 
                                                        rounded-2xl 
                                                        text-lg 
                                                        font-bold 
                                                        text-white
                                                        bg-yellow-300
                                                        active: bg-yellow-500
                                                        hover: bg-yellow-200
                                                    `}
                                                    onClick={() => openSetPersonIdAndOpenModal(person)}
                                                >
                                                    Edit
                                                </button>
                                                <button className="bg-yellow-300"></button>
                                            </span>
                                        </td>
                                    </tr>
                                );
                            }
                        )
                    }
                </tbody>
            </table>

            {!_.isEmpty(personToEditCurrentData) &&
                <EditingFormModal
                    showModal={showEditingFormModal}
                    setShowModal={setShowEditingFormModal}
                    personToEditCurrentData={personToEditCurrentData}
                />
            }
        </>
    );
}
