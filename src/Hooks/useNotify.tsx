import React, { useState } from "react";
import styled from "styled-components";
import { Notify } from "../Components/Notify/Notify";

interface NotifyProps {
	id: string
	backGroundColor?: string
	textColor?: string
}

const Container = styled.div`
	position: absolute;
	top: 0px;
	left: 50%;
	background-color: transparent;
	z-index: 99;
	visibility: hidden;
	`;

export const useNotify = (): {
	content: string,
	notifyContent: (newContent: string) => void,
	NotifyContainer: ({id, textColor , backGroundColor}: NotifyProps) => JSX.Element
} => {

	const [content, setContent] = useState("");

	const notifyContent = (newContent: string) => {
		setContent(newContent);
	};

	const NotifyContainer = ({id, textColor = "white", backGroundColor = "green"}: NotifyProps) => {

		return (
			<Container id={id}>
				<Notify id={id} content={content} textColor={textColor}  backGroundColor={backGroundColor}/>
			</Container>
		);
	};

	return {content, notifyContent, NotifyContainer};
};