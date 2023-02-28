import React, {useEffect, useState} from 'react';
import {Map, Placemark, YMaps} from "react-yandex-maps";
import _ from 'lodash';
import {useNavigate} from "react-router-dom";
import PropTypes from "prop-types";

function YandexMap(props) {
    const {branchesList, placemarkClick} = props;
    const navigate = useNavigate();
    const [center, setCenter] = useState([0, 0]);

    useEffect(() => {
        if (!_.isEmpty(branchesList)) {
            let mediumNum = [0, 0];

            branchesList.forEach(b => {
                mediumNum[0] = +mediumNum[0] + +b.lat;
                mediumNum[1] = +mediumNum[1] + +b.lon;
            });

            setCenter([
                mediumNum[0] / branchesList.length,
                mediumNum[1] / branchesList.length,
            ]);
        }
    }, [branchesList]);

    return (
        <YMaps
            query={{
                ns: 'use-load-option'
            }}>
            <Map
                modules={["geocode"]}
                width="100%"
                height="100%"
                state={{
                    center: !_.isEmpty(branchesList) ? center : [40.234325, 44.497457],
                    zoom: 12,
                }}
            >
                {
                    !_.isEmpty(branchesList) ? (
                        branchesList.map(branch => (
                            <Placemark
                                key={branch.id}
                                geometry={[branch.lat, branch.lon]}
                                onClick={() => {
                                    if (placemarkClick) navigate(`/branch/${branch.id}`)
                                }}
                                options={{
                                    preset: 'islands#geolocationIcon',
                                    iconColor: 'red',
                                }}
                            />
                        ))
                    ) : null
                }
            </Map>
        </YMaps>
    );
}

YandexMap.propTypes = {
    branchesList: PropTypes.array.isRequired,
    placemarkClick: PropTypes.bool.isRequired,
}

export default YandexMap;
