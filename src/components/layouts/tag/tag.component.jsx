import React from "react";
import "./tag.styles.scss";

function Tag({ children }) {
   return <span className={`tag ${children}`}>{children}</span>;
}

export default Tag;
