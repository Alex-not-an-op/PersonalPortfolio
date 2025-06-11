import React, { FC } from "react";

export const Layout: FC<{ children: React.ReactNode }> = ({ children }) => (
	<div className="mx-auto max-w-[1600px] p-4 md:p-8">{children}</div>
);
