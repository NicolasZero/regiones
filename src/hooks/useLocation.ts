import api from "@/api/api_regiones";
import { useEffect, useState } from "react";


const useLocation = (estado_id = 0, municipio_id = 0 )  => {
    const [state, setState] = useState([]);
    const [municipality, setMunicipality] = useState([]);
    const [parish, setParish] = useState([]);

    useEffect(() => {
        api.get(`/location/state`).then((response) => {
            setState(response.data.data);
        });
    }, []);

    useEffect(() => {
        if (estado_id > 0) {
            api.get(`/location/municipality/state/${estado_id}`).then((response) => {
                setMunicipality(response.data.data);
            });
        } else {
            setMunicipality([]);
        }
    }, [estado_id]);

    useEffect(() => {
        if (municipio_id > 0) {
            api.get(`location/parish/municipality/${municipio_id}`).then((response) => {
                setParish(response.data.data);
            });
        } else {
            setParish([]);
        }
    }, [municipio_id]);

    return { state, municipality, parish };
}

export default useLocation;