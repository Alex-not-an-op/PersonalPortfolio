import { Html, Main, NextScript, Head } from "next/document";

export default () => (
	<Html>
		<Head>
			<link rel="preconnect" href="https://fonts.googleapis.com" />
			<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
			<link
				href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500&family=Poppins:wght@300;400;500&display=swap"
				rel="stylesheet"
			/>
		</Head>
		<body className="overflow-x-hidden">
			<Main />
			<NextScript />
		</body>
	</Html>
);
