import React from "react";
import { CheckIcon, XMarkIcon } from "@heroicons/react/20/solid";
import { Control, FieldValues, Path, useWatch } from "react-hook-form";
import classNames from "classNames";
import "./PasswordConfirm.scss";

interface PasswordConfirmProps<T extends FieldValues>{
    name: Path<T>
    nameConfirm: Path<T>
    control: Control<T>
	gridPosition?: string
}

const PasswordConfirm = <T extends FieldValues>({name, nameConfirm, control, gridPosition = ""}: PasswordConfirmProps<T>) => {

	const password = useWatch({name, control});
	const passwordConfirm = useWatch({name: nameConfirm, control});
	const iconSize = 20;
	const iconCheckColor = "green";
	const iconXColor = "red";

	return (
		<div className={classNames("passwordConfirm__container")} style={{gridArea: `${gridPosition}`}}>
			{password === passwordConfirm
				?
				<span className={classNames("passwordConfirm__checkLine")}><CheckIcon color={iconCheckColor} height={iconSize} /> Les mots de passe sont identiques</span>
				:
				<span className={classNames("passwordConfirm__checkLine")}><XMarkIcon color={iconXColor} height={iconSize} /> Les mots de passe ne sont pas identiques</span>
			}
		</div>
	);
};

export default PasswordConfirm;