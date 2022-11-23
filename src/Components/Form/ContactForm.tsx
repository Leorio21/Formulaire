import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { IFormValues } from "../../Interface/Form";
import LabeledInput from "./LabeledInput/LabeledInput";
import styled from "styled-components";
import PasswordCheck from "./PasswordCheck/PasswordCheck";

const schemaSignUp = yup.object({
	password: yup.string()
		.required("Ce champ est obligatoire")
		.min(8, "Il faut au moins 8 caractères")
		.max(20, "Il faut au maximum 20 caractères")
		.matches( /[A-Z]/, "Il faut au moins 1 majuscule")
		.matches( /[a-z]/, "Il faut au moins 1 minuscule")
		.matches( /[0-9].*[0-9]/, "Il faut au moins 2 chiffres")
		.matches( /[\W]/, "Il faut au moins 1 symbole") ,
}).required();

const Form = styled.form`
	display: flex;
	flex-direction: column;
	justify-content: center;
`;

const onFormSubmit = (data: IFormValues) => {
	console.log(data);
};

const ContactForm = () => {

	const { register, handleSubmit, control, formState: { errors } } = useForm<IFormValues>({resolver: yupResolver(schemaSignUp)});
	
	return (
		<Form onSubmit={handleSubmit(onFormSubmit)}>
			<LabeledInput
				label="Mot de passe* :"
				register={register}
				id={"password"}
				type={"password"}
				name={"password"}
				placeHolder={"Votre mot de passe"}
				error={errors.password?.message}
				required={false}
			/>
			<PasswordCheck control={control} name={"password"} />
		</Form>
	);
};

export default ContactForm;