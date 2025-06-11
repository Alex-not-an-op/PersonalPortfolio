import Link from "next/link";
import { FC } from "react";
import { Layout } from "../components/Layout";
import { SectionTitle } from "../components/SectionTitle";
import Contact from "../assets/Contact.svg"

export const contact = {
	adress: "Hamburg, Germany",
	phone: "+49 1743504268",
	email: "alex.masterOfIceTea@gmail.com",
	github: "https://github.com/AlexMasterOfIceTea",
	linkedIn: "https://www.linkedin.com/in/alexander-schneider-285b80248/"
} as const;

const InputField: FC<{ placeholder: string; name: string }> = ({ placeholder, name }) => (
	<div className="rounded-md bg-black/70 px-4 py-2 focus-within:ring-2 focus-within:ring-emerald-500">
		<input
			className="w-full bg-transparent text-white placeholder-gray-300 focus:outline-none"
			{...{ name, placeholder }}
		></input>
	</div>
);

const InputArea: FC<{ placeholder: string; name: string }> = ({ placeholder, name }) => (
	<div className="rounded-md bg-black/70 px-4 py-2 focus-within:ring-2 focus-within:ring-emerald-500">
		<textarea
			rows={5}
			className="w-full resize-y bg-transparent text-white placeholder-gray-300 focus:outline-none"
			{...{ name, placeholder }}
		></textarea>
	</div>
);

const SubmitButton: FC = () => (
	<button
		type="submit"
		className="mt-4 group w-2/3 self-end rounded-full border-2 border-transparent bg-emerald-500 px-4 py-3 text-lg text-black transition-colors duration-150 
			hover:ring-emerald-500 hover:ring-4 hover:bg-black/75 hover:text-white
			focus:ring-emerald-500 focus:ring-4 focus:bg-black/75 focus:text-white focus:outline-none
		"
	>
		Submit
	</button>
);

const ContactInfo = () => (
	<>
		<div>
			<img width={32} src="/contact/pin.svg" className="inline-block mr-4" />
			{contact.adress}
		</div>
		<div>
			<img width={32} src="/contact/email.svg" className="inline-block mr-4" />
			{contact.email}
		</div>
		<div>
			<img width={32} src="/contact/phone.svg" className="inline-block mr-4" />
			{contact.phone}
		</div>
		<div>
			<img width={32} src="/contact/github.svg" className="inline-block mr-4" />
			<Link href={contact.github}>
				<a>{contact.github.substring(0, 25) + "..."}</a>
			</Link>
		</div>
		<div>
			<img width={32} src="/contact/linkedin.svg" className="inline-block mr-4" />
			<Link href={contact.linkedIn}>
				<a>{contact.linkedIn.substring(0, 25) + "..."}</a>
			</Link>
		</div>
	</>
);

const FormCard = () => (
	<div
		style={{ boxShadow: "0 0 4rem 0 rgba(0,0,0,.2)" }}
		className="max-w-lg md:max-w-4xl w-full p-4 bg-black/20 backdrop-blur-md overflow-hidden rounded-xl z-20"
	>
		<h2 className="text-center font-bold font-montserrat text-4xl s text-white">Get in touch</h2>
		<div className="flex flex-row w-full gap-x-4 min-h-fit">
			<form
				className="flex w-full min-w-max max-w-md flex-col gap-y-2 mt-8"
				name="contact"
				method="POST"
				data-netlify="true"
			>
				{/* This is required for netlify forms */}
				<input type="hidden" name="form-name" value="contact" />
				<InputField placeholder="Name" name="name" />
				<InputField placeholder="Email" name="email" />
				<InputArea placeholder="Your Message" name="message" />
				<SubmitButton />
			</form>
			<div className="hidden md:flex flex-col gap-y-6 border-l-2 h-full border-white my-8 p-4 text-white text-lg">
				<ContactInfo />
			</div>
		</div>
	</div>
);

export const ContactSection = () => (
	<>
		<div
			id="contact_section"
			className="w-screen min-h-[calc(100vh-60px)] bg-gradient-to-b from-emerald-700 to-slate-900 relative"
		>
			<Layout>
				<div className="w-full flex text-white py-4">
                    <div className="flex flex-row justify-end w-full">
					<SectionTitle href="#contact_section" alt="Contact"><Contact /></SectionTitle>
                    </div>
				</div>
				<div className="h-full w-full flex justify-center mt-24">
					<FormCard />
				</div>
				<div className="w-full mt-8 md:hidden max-w-lg mx-auto text-white text-lg">
					<h3 className="text-3xl font-bold font-montserrat mb-8 text-white">
						Or find me here:
					</h3>
					<div className="ml-4 my-16 flex flex-col gap-y-4">
						<ContactInfo />
					</div>
				</div>
			</Layout>
		</div>
	</>
);
