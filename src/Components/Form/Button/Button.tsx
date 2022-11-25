import React from "react";
import styled from "styled-components";

interface ButtonProps {
    label?: string
    bgColor: string
    color: string
    type?: "submit" | "reset" | "button"
}

const FormButton = styled.button<ButtonProps>`
    width: 150px;
    height: 25px;
    border-radius: 25px;
    border: none;
    color: ${props => props.color};
    background-color: ${props => props.bgColor};
`;

const Button = ({label, bgColor, color, type}: ButtonProps) => {

	return (
		<FormButton type={type} bgColor={bgColor} color={color} >{label}</FormButton>
	);
};

export default Button;