import React, { useReducer } from "react";
import { Notify } from "./Notify";
import classNames from "classNames";
import "./useNotify.scss";

interface NotifyProps {
	id: string
	backGroundColor?: string
	color?: string
}

const initialContent = "";
const notifyReducer = (state: string, action: { isVisible: boolean, text: string}) => {
	state = action.text;
	return state;
};

export const useNotify = (): {
	setNotify: (notifyContent: string, visibility?: boolean ) => void,
	NotifyContainer: ({id, color , backGroundColor}: NotifyProps) => JSX.Element
} => {

	const [notify, dispatchNotify] = useReducer(notifyReducer, initialContent);

	const setNotify = (notifyContent: string, visibile = false) => {
		dispatchNotify({isVisible: visibile, text: notifyContent});
	};

	const NotifyContainer = ({id, color = "primary"}: NotifyProps) => {

		return (
			<div id={id} className={classNames("useNotify__container")}>
				{notify && <Notify id={id} content={notify} color={color} setNotify={setNotify} />}
			</div>
		);
	};

	return {setNotify, NotifyContainer};
};