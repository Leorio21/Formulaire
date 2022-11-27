import React from "react";
import styled from "styled-components";

interface ButtonProps {
    label?: string
    bgColor: string
    color: string
    type?: "submit" | "reset" | "button"
	gridPosition?: string
}

interface GridProps {
	gridPosition: string
}

const Container = styled.div<GridProps>`
	width: 100%;
    display: flex;
    justify-content: center;
	grid-area: ${props => props.gridPosition}
`;

const FormButton = styled.button<ButtonProps>`
    width: 150px;
    height: 25px;
    border-radius: 25px;
    border: none;
    color: ${props => props.color};
    background-color: ${props => props.bgColor};
`;

const Button = ({label, bgColor, color, type, gridPosition = ""}: ButtonProps) => {

	return (
		<Container gridPosition={gridPosition}>
			<FormButton type={type} bgColor={bgColor} color={color} >{label}</FormButton>
		</Container>
	);
};

export default Button;