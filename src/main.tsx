import React from "react";
import ReactDOM from "react-dom/client";
import { MantineProvider } from "@mantine/core";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./routes/root.tsx";
import Placeholder from "./routes/placeholder.tsx";
import CustomFonts from "./components/CustomFonts.tsx";
import Starred from "./routes/Starred.tsx";
import JobSearch from "./routes/JobSearch.tsx";
import JobPage, { loader as jobLoader } from "./routes/JobPage.tsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        errorElement: <Placeholder fullscreen={true} />,
        children: [
            {
                index: true,
                element: <JobSearch />,
            },
            {
                path: "starred",
                element: <Starred />,
            },
            {
                path: "job/:id",
                element: <JobPage />,
                loader: jobLoader,
            },
        ],
    },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <MantineProvider
            withGlobalStyles
            withNormalizeCSS
            theme={{
                colors: {
                    gray: [
                        "#F5F5F6",
                        "#EAEBED",
                        "#D5D6DC",
                        "#BEC0C7",
                        "#ACADB9",
                        "#7B7C88",
                        "#707079",
                        "#5C5C61",
                        "#343A40",
                        "#3D3D3F",
                    ],

                    blue: [
                        "#DEECFF",
                        "#C9E0FF",
                        "#B7D6FF",
                        "#92C1FF",
                        "#5E96FC",
                        "#3B7DD3",
                        "#3C71B7",
                        "#41689A",
                        "#435E82",
                        "#425670",
                    ],
                },

                globalStyles: () => ({
                    "*, *::before, *::after": {
                        boxSizing: "border-box",
                    },

                    body: {
                        backgroundColor: "#F7F7F8",
                    },
                }),

                headings: {
                    fontFamily: "Poppins, sans-serif",
                    fontWeight: 600,

                    sizes: {
                        h1: { fontSize: "1.5rem" },
                    },
                },
                fontFamily: "Inter, sans-serif",

                black: "#232134",
                primaryColor: "blue",
                primaryShade: 4,
                loader: "oval",
                defaultRadius: 8,
            }}
        >
            <CustomFonts />
            <RouterProvider router={router} />
        </MantineProvider>
    </React.StrictMode>
);
