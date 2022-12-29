import React, { useEffect, useState } from "react";
import { XMarkIcon } from "@heroicons/react/20/solid";
import classNames from "classNames";
import "./Notify.scss";

interface NotifyProps {
	id: string
	content: string
	color: string
	setNotify: ( notifyContent: string, visibility?: boolean) => void
}

export const Notify = ({id, content, color, setNotify}: NotifyProps) => {

	const [isActive, setIsActive] = useState(false);

	const onCloseHandle = () => {
		document.getElementById(id)!.style.visibility = "hidden";
		setNotify("");
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
				<div className={classNames(`notify__notifyContent notify__notifyContent--${color}`)}>
					{content}
					<p className={classNames(`notify__closeButton notify__closeButton--${color}`)} onClick={onCloseHandle}>
						<XMarkIcon height={15} />
					</p>
				</div>
			}
		</>
	);
};
