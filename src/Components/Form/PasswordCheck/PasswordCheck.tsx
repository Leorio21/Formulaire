import React from "react";
import { CheckIcon, XMarkIcon } from "@heroicons/react/20/solid";

import { Control, FieldValues, Path, useWatch } from "react-hook-form";
import styled from "styled-components";

interface PasswordCheckProps<T extends FieldValues>{
    name: Path<T>
    control: Control<T>
}

const Container = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	font-size: 14px;
	margin-bottom: 10px;
`;

const CheckLine = styled.span`
	display: flex;
	align-items: center;
`;

const passwordCheck = <T extends FieldValues>({name, control}: PasswordCheckProps<T>) => {

	const password = useWatch({ control, name });
	const iconSize = 20;
	const iconCheckColor = "green";
	const iconXColor = "red";

	return (
		<Container>
			<span>Le mot de passe doit :</span>
			<CheckLine>{password?.match(/[a-z]/) ? <CheckIcon color={iconCheckColor} height={iconSize} />:<XMarkIcon color={iconXColor} height={iconSize} />} contenir au moins 1 minuscule</CheckLine>
			<CheckLine>{password?.match(/[A-Z]/) ? <CheckIcon color={iconCheckColor} height={iconSize} />:<XMarkIcon color={iconXColor} height={iconSize} />} contenir au moins 1 majuscule</CheckLine>
			<CheckLine>{password?.match(/[0-9].*[0-9]/) ? <CheckIcon color={iconCheckColor} height={iconSize} />:<XMarkIcon color={iconXColor} height={iconSize} />} contenir au moins 2 chiffres</CheckLine>
			<CheckLine>{password?.match(/[\W]/) ? <CheckIcon color={iconCheckColor} height={iconSize} />:<XMarkIcon color={iconXColor} height={iconSize} />} contenir au moins 1 symbole</CheckLine>
			<CheckLine>{password?.match(/^.{8,20}$/) ? <CheckIcon color={iconCheckColor} height={iconSize} />:<XMarkIcon color={iconXColor} height={iconSize} />} faire entre 8 et 20 caractères</CheckLine>
		</Container>
	);
};

export default passwordCheck;