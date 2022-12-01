import React, { useEffect } from "react";
import styled from "styled-components";
import { XMarkIcon } from "@heroicons/react/20/solid";

interface NotifyProps {
	id: string
	content: string
	backGroundColor: string
	textColor: string
}

interface NotifyStyleProps {
	backGroundColor: string
	textColor: string
}

const NotifyContent = styled.div<NotifyStyleProps>`
	position: absolute;
	top: 20px;
	left: calc(50% - 135px);
	width: 250px;
	height: 30px;
	padding: 10px 30px;
	display: flex;
	justify-content: flex-start;
	align-items: center;
	border-radius: 15px;
	color: ${props => props.textColor};
	background-color: ${props => props.backGroundColor};
`;

const CloseButton = styled.p`
	position: absolute;
	cursor: pointer;
	top: 5px;
	right: 10px;
	width: 15px;
	height: 15px;
`;

export const Notify = ({id, content, textColor, backGroundColor}: NotifyProps) => {

	const onCloseHandle = () => {
		document.getElementById(id)!.style.visibility = "hidden";
	};

	useEffect(() => {
		if (content) {
			document.getElementById(id)!.style.visibility = "visible";
		}
	}, [content]);

	return (
		<NotifyContent textColor={textColor}  backGroundColor={backGroundColor}>
			{content}
			<CloseButton onClick={onCloseHandle}>
				<XMarkIcon height={15} color={textColor} />
			</CloseButton>
		</NotifyContent>
	);
};
