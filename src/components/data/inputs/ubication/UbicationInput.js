import React, { useState, useEffect } from "react";
import styles from "./UbicationInput.module.scss";
import DropDownInput from "../dropDown/DropDownInput.js";

const UbicationInput = ({ countries, provinces, localities, onChange }) => {
    const [selectedCountry, setSelectedCountry] = useState("");
    const [selectedProvince, setSelectedProvince] = useState("");
    const [selectedLocality, setSelectedLocality] = useState("");

    const provinceOptions = provinces.filter(p => p.country_id === Number(selectedCountry));
    const localityOptions = localities.filter(l => l.province_id === Number(selectedProvince));

    useEffect(() => {
        setSelectedProvince("");
        setSelectedLocality("");
    }, [selectedCountry]);

    useEffect(() => {
        setSelectedLocality("");
    }, [selectedProvince]);

    useEffect(() => {
        // Notificar cambios
        if (onChange) {
            onChange({
                country_id: selectedCountry || null,
                province_id: selectedProvince || null,
                locality_id: selectedLocality || null
            });
        }
    }, [selectedCountry, selectedProvince, selectedLocality]);

    return (
        <div className={styles.ubicationInput}>
            <DropDownInput
                placeholderText="Country"
                options={countries.map(c => ({
                    id: String(c.id),
                    label: c.name,
                }))}
                defaultSelected={selectedCountry}
                onChange={setSelectedCountry}
            />
            <DropDownInput
                placeholderText="Provincia"
                options={provinceOptions.map(p => ({
                    id: String(p.id),
                    label: p.name,
                }))}
                defaultSelected={selectedProvince}
                onChange={setSelectedProvince}
            />
            <DropDownInput
                placeholderText="Localidad"
                options={localityOptions.map(l => ({
                    id: String(l.id),
                    label: l.name,
                }))}
                defaultSelected={selectedLocality}
                onChange={setSelectedLocality}
            />
        </div>
    );
};

export default UbicationInput;
