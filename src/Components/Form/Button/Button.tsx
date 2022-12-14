import React from "react";
import classNames from "classNames";
import "./Button.scss";

interface ButtonProps {
    label: string
    color: string
    type: "submit" | "reset" | "button"
	gridPosition?: string
    onClick?: () => void
}

const Button = ({label, color, type, gridPosition = "", onClick}: ButtonProps) => {

	return (
		<div className={classNames("button__container")} style={{gridArea: `${gridPosition}`}}>
			<button className={classNames(`button__button button__button--${color}`)} type={type} onClick={onClick}>{label}</button>
		</div>
	);
};

export default Button;