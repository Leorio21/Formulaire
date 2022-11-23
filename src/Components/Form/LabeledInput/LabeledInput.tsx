import React from "react";
import { Path, UseFormRegister } from "react-hook-form";
import styled from "styled-components";
import { IFormValues } from "../../../Interface/Form";

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
}

const Label = styled.label`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	color: white;
`;

const Title = styled.span`
	display: flex;
`;

const Error = styled.span`
	color: red;
	padding-left: 10px;
	font-weight: bold;
	font-size: 12px;
	text-align: left;
`;

const Input = styled.input`
	width: 350px;
`;

const LabeledInput = ({id, type, name, label, placeHolder, register, error, required}: LabeledInputProps) => {
	return (
		<Label htmlFor={id}><Title>{label}<Error>{error}</Error></Title>
			<Input id={id} type={type} {...register(name, { required })} placeholder={placeHolder} ></Input>
		</Label>
	);
};

export default LabeledInput;