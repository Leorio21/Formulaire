import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { IFormValues } from "../../Interface/Form";
import LabeledInput from "./LabeledInput/LabeledInput";
import styled from "styled-components";
import PasswordCheck from "./PasswordCheck/PasswordCheck";
import Button from "./Button/Button";

const schemaValidation = yup.object().shape({
	homePhone: yup.string()
		.when("mobilePhone", {
			is: "",
			then: yup.string()
				.required("Veuillez saisir un numéro de téléphone")
				.matches( /^[0][1-59][0-9]{8}$/, "Veuillez saisir un numéro de téléphone fixe valide"),
			otherwise: yup.string()
				.matches( /^[0][1-59][0-9]{8}$/, {message: "Veuillez saisir un numéro de téléphone fixe valide", excludeEmptyString: true})
				.optional(),			
		}),
	mobilePhone: yup.string()
		.when("homePhone", {
			is: "",
			then: yup.string()
				.required("Veuillez saisir un numéro de téléphone")
				.matches( /^[0][67][0-9]{8}$/, "Veuillez saisir un numéro de téléphone portable valide"),
			otherwise: yup.string()
				.matches( /^[0][67][0-9]{8}$/, {message: "Veuillez saisir un numéro de téléphone portable valide", excludeEmptyString: true})
				.optional(),
		}),
	password: yup.string()
		.required("Ce champ est obligatoire")
		.min(8, "Il faut au moins 8 caractères")
		.max(20, "Il faut au maximum 20 caractères")
		.matches( /[A-Z]/, "Il faut au moins 1 majuscule")
		.matches( /[a-z]/, "Il faut au moins 1 minuscule")
		.matches( /[0-9].*[0-9]/, "Il faut au moins 2 chiffres")
		.matches( /[\W]/, "Il faut au moins 1 symbole")
}, [["homePhone", "mobilePhone"]]);

const Form = styled.form`
	padding: 10px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;

const Footer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
`;

const FooterItem = styled.span`
	
`;

const onFormSubmit = (data: IFormValues) => {
	console.log(data);
};

const ContactForm = () => {

	const { register, handleSubmit, control, formState: { errors } } = useForm<IFormValues>({resolver: yupResolver(schemaValidation)});
	
	return (
		<Form onSubmit={handleSubmit(onFormSubmit)}>
			
			<LabeledInput
				label="Tel port.<sup>(1)</sup> :"
				register={register}
				id={"mobilePhone"}
				type={"text"}
				name={"mobilePhone"}
				placeHolder={"0102030405"}
				error={errors.mobilePhone?.message}
				required={true}
			/>
			<LabeledInput
				label="Tel fixe<sup>(1)</sup>:"
				register={register}
				id={"homePhone"}
				type={"text"}
				name={"homePhone"}
				placeHolder={"0102030405"}
				error={errors.homePhone?.message}
				required={true}
			/>
			<LabeledInput
				label="Mot de passe* :"
				register={register}
				id={"password"}
				type={"password"}
				name={"password"}
				placeHolder={"Votre mot de passe"}
				error={errors.password?.message}
				required={true}
			/>
			<PasswordCheck control={control} name={"password"} />
			
			<Button label={"Valider"} bgColor={"green"} color={"white"} type={"submit"} />
			<Footer>
				<FooterItem>* Champs obligatoire</FooterItem>
				<FooterItem><sup>(1)</sup> Au moins 1 des champs obligatoire</FooterItem>
			</Footer>
		</Form>
	);
};

export default ContactForm;