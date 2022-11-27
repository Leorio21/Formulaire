import React from "react";
import { CheckIcon, XMarkIcon } from "@heroicons/react/20/solid";

import { Control, FieldValues, Path, useWatch } from "react-hook-form";
import styled from "styled-components";

interface PasswordConfirmProps<T extends FieldValues>{
    name: Path<T>
    nameConfirm: Path<T>
    control: Control<T>
	gridPosition?: string
}

interface GridProps {
	gridPosition: string
}

const Container = styled.div<GridProps>`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	font-size: 14px;
	margin-bottom: 10px;
	width: 100%;
	grid-area: ${props => props.gridPosition};
`;

const CheckLine = styled.span`
	display: flex;
	align-items: center;
`;

const PasswordConfirm = <T extends FieldValues>({name, nameConfirm, control, gridPosition = ""}: PasswordConfirmProps<T>) => {

	const password = useWatch({name, control});
	const passwordConfirm = useWatch({name: nameConfirm, control});
	const iconSize = 20;
	const iconCheckColor = "green";
	const iconXColor = "red";

	return (
		<Container gridPosition={gridPosition}>
			{password === passwordConfirm ? <CheckLine><CheckIcon color={iconCheckColor} height={iconSize} /> Les mots de passe sont identiques</CheckLine>:<CheckLine><XMarkIcon color={iconXColor} height={iconSize} /> Les mots de passe ne sont pas identiques</CheckLine>}
		</Container>
	);
};

export default PasswordConfirm;