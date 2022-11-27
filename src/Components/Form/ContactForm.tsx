import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { IFormValues } from "../../Interface/Form";
import LabeledInput from "./LabeledInput/LabeledInput";
import styled from "styled-components";
import PasswordCheck from "./PasswordCheck/PasswordCheck";
import Button from "./Button/Button";
import PasswordConfirm from "./PasswordConfirm/PasswordConfirm";
import { devices } from "../../Styles/Styles";

const schemaValidation = yup.object().shape({
	firstName: yup.string()
		.required("Veuillez saisir votre prénom")	
		.matches( /^[a-zÀ-ÖØ-öø-ÿ -]+$/i, "Présence de caractères non authorisés"),
	lastName: yup.string()
		.required("Veuillez saisir votre nom")	
		.matches( /^[a-z -]+$/i, "Présence de caractères non authorisés"),
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
	email: yup.string()
		.matches( /^([a-z0-9-_.]+)@([a-z0-9-]+)\.([a-z-]{2,})$/i, {message: "Veuillez saisir un email valide", excludeEmptyString: true})
		.optional(),
	password: yup.string()
		.required("Ce champ est obligatoire")
		.min(8, "Il faut au moins 8 caractères")
		.max(20, "Il faut au maximum 20 caractères")
		.matches( /[A-Z]/, "Il faut au moins 1 majuscule")
		.matches( /[a-z]/, "Il faut au moins 1 minuscule")
		.matches( /[0-9].*[0-9]/, "Il faut au moins 2 chiffres")
		.matches( /[\W]/, "Il faut au moins 1 symbole"),
	confirmPassword: yup.string()
		.required("Ce champ est obligatoire")
		.oneOf([yup.ref("password")], "Les mot de passe ne correspondent pas"),
}, [["homePhone", "mobilePhone"]]);

const Container = styled.div`	
	padding: 10px;
	width: calc(100% - 20px);
	max-width: 1440px;
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	@media screen and ${devices.desktopL} {
		margin: auto;
	}
`;

const Form = styled.form`
	padding: 10px;
	display: flex;
	width: calc(100% - 20px);
	flex-flow: row wrap;
	justify-content: center;
	align-items: center;
	@media screen and ${devices.tablette} {
		display: grid;
		grid-template-columns: 50% 50%;
		grid-template-areas:
			"input1 input2"
			"input3 input4"
			"input5 ."
			"input6 input7"
			"passCheck passConfirm"
			"button button";
		column-gap: 10px;
		row-gap: 10px;
		align-items: start;
	}
`;

const Footer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
`;

const onFormSubmit = (data: IFormValues) => {
	console.log(data);
};

const ContactForm = () => {

	const { register, handleSubmit, control, formState: { errors } } = useForm<IFormValues>({defaultValues: { password: "", confirmPassword: "" }, resolver: yupResolver(schemaValidation)});
	
	return (
		<Container>
			<Form onSubmit={handleSubmit(onFormSubmit)}>
				<LabeledInput
					label="Prénom* :"
					register={register}
					id={"firstName"}
					type={"text"}
					name={"firstName"}
					placeHolder={"Votre prénom"}
					error={errors.firstName?.message}
					required={true}
					gridPosition={"input1"}
				/>
				<LabeledInput
					label="Nom* :"
					register={register}
					id={"lastName"}
					type={"text"}
					name={"lastName"}
					placeHolder={"Votre nom"}
					error={errors.lastName?.message}
					required={true}
					gridPosition={"input2"}
				/>
				<LabeledInput
					label="Tel port.<sup>(1)</sup> :"
					register={register}
					id={"mobilePhone"}
					type={"text"}
					name={"mobilePhone"}
					placeHolder={"0612345789"}
					error={errors.mobilePhone?.message}
					required={true}
					gridPosition={"input3"}
				/>
				<LabeledInput
					label="Tel fixe<sup>(1)</sup>:"
					register={register}
					id={"homePhone"}
					type={"text"}
					name={"homePhone"}
					placeHolder={"0123456789"}
					error={errors.homePhone?.message}
					required={true}
					gridPosition={"input4"}
				/>
				<LabeledInput
					label="Email :"
					register={register}
					id={"email"}
					type={"text"}
					name={"email"}
					placeHolder={"Votre email"}
					error={errors.email?.message}
					required={true}
					gridPosition={"input5"}
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
					gridPosition={"input6"}
				/>
				<PasswordCheck control={control} name={"password"} gridPosition={"passCheck"} />
				<LabeledInput
					label="Confirmer votre mot de passe* :"
					register={register}
					id={"confirmPassword"}
					type={"password"}
					name={"confirmPassword"}
					placeHolder={"Confirmer votre mot de passe"}
					error={errors.confirmPassword?.message}
					required={true}
					gridPosition={"input7"}
				/>
				<PasswordConfirm control={control} name={"password"} nameConfirm={"confirmPassword"} gridPosition={"passConfirm"} />
				<Button label={"Valider"} bgColor={"green"} color={"white"} type={"submit"} gridPosition={"button"}/>
			</Form>
			<Footer>
				<span>* Champs obligatoire</span>
				<span><sup>(1)</sup> Au moins 1 des champs obligatoire</span>
			</Footer>
		</Container>
	);
};

export default ContactForm;