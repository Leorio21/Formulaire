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
		.oneOf([yup.ref("password")], "Les mot de passe ne correspondent pas"),
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
		<>
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
				/>
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
					label="Email :"
					register={register}
					id={"email"}
					type={"text"}
					name={"email"}
					placeHolder={"Votre email"}
					error={errors.email?.message}
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
				<LabeledInput
					label="Confirmer votre mot de passe* :"
					register={register}
					id={"confirmPassword"}
					type={"password"}
					name={"confirmPassword"}
					placeHolder={"Confirmer votre mot de passe"}
					error={errors.confirmPassword?.message}
					required={true}
				/>
				<PasswordConfirm control={control} name={"password"} nameConfirm={"confirmPassword"} />
				<Button label={"Valider"} bgColor={"green"} color={"white"} type={"submit"} />
			</Form>
			<Footer>
				<FooterItem>* Champs obligatoire</FooterItem>
				<FooterItem><sup>(1)</sup> Au moins 1 des champs obligatoire</FooterItem>
			</Footer>
		</>
	);
};

export default ContactForm;