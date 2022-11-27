import React from "react";
import { Path, UseFormRegister } from "react-hook-form";
import styled from "styled-components";
import { IFormValues } from "../../../Interface/Form";
import parse from "html-react-parser";

interface LabeledInputProps {
	id: string
	type: string
	name: Path<IFormValues>
    label: string
    placeHolder: string
    register: UseFormRegister<IFormValues>
	error?: string
    required: boolean
	revelation?: boolean
	gridPosition?: string
}

interface GridProps {
	gridPosition: string
}

const Label = styled.label<GridProps>`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	color: white;
	width: 100%;
	grid-area: ${props => props.gridPosition};
`;

const Title = styled.span`
	display: flex;
	padding-left: 10px;
`;

const Error = styled.span`
	color: red;
	height: 25px;
	padding: 5px 0px 5px 10px;
	font-weight: bold;
	font-size: 12px;
	text-align: left;
`;

const Input = styled.input`
	width: 95%;
	border-radius: 10px;
	padding: 5px 10px;
`;

const LabeledInput = ({id, type, name, label, placeHolder, register, error, required, gridPosition = ""}: LabeledInputProps) => {
	return (
		<Label htmlFor={id} gridPosition={gridPosition} ><Title>{parse(label)}</Title>
			<Input id={id} type={type} {...register(name, { required })} placeholder={placeHolder} ></Input>
			<Error>{error}</Error>
		</Label>
	);
};

export default LabeledInput;