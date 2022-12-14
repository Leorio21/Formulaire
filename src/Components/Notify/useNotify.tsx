import React, { useReducer } from "react";
import styled from "styled-components";
import { Notify } from "./Notify";

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

const initialContent = "";
const notifyReducer = (state: string, action: { isVisible: boolean, text: string}) => {
	state = action.text;
	return state;
};

export const useNotify = (): {
	dispatchNotify: ({ isVisible, text}:{isVisible: boolean,  text: string}) => string,
	NotifyContainer: ({id, textColor , backGroundColor}: NotifyProps) => JSX.Element
} => {

	const [notify, dispatchNotify] = useReducer(notifyReducer, initialContent);

	const NotifyContainer = ({id, textColor = "white", backGroundColor = "green"}: NotifyProps) => {

		return (
			<Container id={id}>
				{notify && <Notify id={id} content={notify} textColor={textColor}  backGroundColor={backGroundColor} dispatchNotify={dispatchNotify} />}
			</Container>
		);
	};

	return {dispatchNotify, NotifyContainer};
};