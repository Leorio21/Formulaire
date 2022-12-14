import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { XMarkIcon } from "@heroicons/react/20/solid";

interface NotifyProps {
	id: string
	content: string
	backGroundColor: string
	textColor: string
	dispatchNotify: ({ isVisible, text}:({isVisible: boolean,  text?: string})) => string
}

interface NotifyStyleProps {
	backGroundColor: string
	textColor: string
}

const NotifyContent = styled.div<NotifyStyleProps>`
	position: absolute;
	top: 20px;
	left: calc(50% - 155px);
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

export const Notify = ({id, content, textColor, backGroundColor, dispatchNotify}: NotifyProps) => {

	const [isActive, setIsActive] = useState(false);

	const onCloseHandle = () => {
		document.getElementById(id)!.style.visibility = "hidden";
		dispatchNotify({isVisible: false});
	};

	useEffect(() => {
		if (content) {
			document.getElementById(id)!.style.visibility = "visible";
			setIsActive(true);
		}
	}, [content]);

	return (
		<>
			{isActive &&
				<NotifyContent textColor={textColor}  backGroundColor={backGroundColor}>
					{content}
					<CloseButton onClick={onCloseHandle}>
						<XMarkIcon height={15} color={textColor} />
					</CloseButton>
				</NotifyContent>
			}
		</>
	);
};
