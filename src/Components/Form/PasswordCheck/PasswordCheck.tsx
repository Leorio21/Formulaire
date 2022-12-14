import React from "react";
import { CheckIcon, XMarkIcon } from "@heroicons/react/20/solid";
import { Control, FieldValues, Path, useWatch } from "react-hook-form";
import classNames from "classNames";
import "./PasswordCheck.scss";

interface PasswordCheckProps<T extends FieldValues>{
    name: Path<T>
    control: Control<T>
	gridPosition?: string
}

const passwordCheck = <T extends FieldValues>({name, control, gridPosition = ""}: PasswordCheckProps<T>) => {

	const password = useWatch({ control, name });
	const iconSize = 20;
	const iconCheckColor = "green";
	const iconXColor = "red";

	return (
		<div className={classNames("passwordCheck__container")} style={{gridArea: `${gridPosition}`}}>
			<span>Le mot de passe doit :</span>
			<span className={classNames("passwordCheck__checkLine")}>{password?.match(/[a-z]/) ? <CheckIcon color={iconCheckColor} height={iconSize} />:<XMarkIcon color={iconXColor} height={iconSize} />} contenir au moins 1 minuscule</span>
			<span className={classNames("passwordCheck__checkLine")}>{password?.match(/[A-Z]/) ? <CheckIcon color={iconCheckColor} height={iconSize} />:<XMarkIcon color={iconXColor} height={iconSize} />} contenir au moins 1 majuscule</span>
			<span className={classNames("passwordCheck__checkLine")}>{password?.match(/[0-9].*[0-9]/) ? <CheckIcon color={iconCheckColor} height={iconSize} />:<XMarkIcon color={iconXColor} height={iconSize} />} contenir au moins 2 chiffres</span>
			<span className={classNames("passwordCheck__checkLine")}>{password?.match(/[\W]/) ? <CheckIcon color={iconCheckColor} height={iconSize} />:<XMarkIcon color={iconXColor} height={iconSize} />} contenir au moins 1 symbole</span>
			<span className={classNames("passwordCheck__checkLine")}>{password?.match(/^.{8,20}$/) ? <CheckIcon color={iconCheckColor} height={iconSize} />:<XMarkIcon color={iconXColor} height={iconSize} />} faire entre 8 et 20 caractères</span>
		</div>
	);
};

export default passwordCheck;