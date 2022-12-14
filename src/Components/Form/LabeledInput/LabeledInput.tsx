import React from "react";
import { Path, UseFormRegister } from "react-hook-form";
import { IFormValues } from "../../../Interface/Form";
import parse from "html-react-parser";
import classNames from "classNames";
import "./LabeledInput.scss";

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

const LabeledInput = ({id, type, name, label, placeHolder, register, error, required, gridPosition = ""}: LabeledInputProps) => {
	return (
		<label className={classNames("labeledInput__label")} htmlFor={id}  style={{gridArea: `${gridPosition}`}}><span className={classNames("labeledInput__title")}>{parse(label)}</span>
			<input  className={classNames("labeledInput__input")} id={id} type={type} {...register(name, { required })} placeholder={placeHolder} ></input>
			<span className={classNames("labeledInput__error")}>{error}</span>
		</label>
	);
};

export default LabeledInput;