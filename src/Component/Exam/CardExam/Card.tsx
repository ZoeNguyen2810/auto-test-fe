import React from "react";
import './Card.scss'
export const Card = () => {
    return (
        <span style={{ display: 'flex' }} className="container">
            <span>
                <img
                    src="https://assets.leetcode.com/users/images/49479bba-73b3-45d2-9272-99e773d784b2_1687290663.3168745.jpeg"
                    alt=""
                />
            </span>
            <span>
                <img
                    src="https://assets.leetcode.com/users/images/770789b0-c96b-4663-86d1-baab25534864_1669795265.8012726.png"
                    alt=""
                />
            </span>
            <span>
                <img
                    src="https://assets.leetcode.com/users/images/b0a08a5c-c575-48f6-9110-b6ae4e011e98_1655746322.579097.png"
                    alt=""
                />
            </span>
        </span>
    );
};
