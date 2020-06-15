import React from "react";
import "./Popularity.css";

const Popularity = ({ children }) => {

    const num = children ? parseInt(children/2) : 0;

    return (
        <div className="Popularity bg">
            <div className="pop-wrap">
                {
                    [...Array(10).keys()].map((b,i) => <div key={i} className={i < num ? "bg-primary-faded":"bg-secondary"}></div>)
                }
            </div>
        </div>
    )
};

export default Popularity;