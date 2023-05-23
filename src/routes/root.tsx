import { AppShell, Loader, Center } from "@mantine/core";
import Header from "../components/Header";
import { Outlet, useNavigation } from "react-router-dom";

export default function Root() {
    const navigation = useNavigation();

    const loader = (
        <Center h="100%">
            <Loader size="xl" />
        </Center>
    );

    const content = navigation.state === "loading" ? loader : <Outlet />;

    return (
        <>
            <AppShell
                styles={(theme) => ({
                    root: {
                        padding: "2rem 5%",

                        [theme.fn.smallerThan("xs")]: {
                            padding: "1rem 0.5rem",
                        },
                    },

                    main: {
                        minHeight: "calc(100vh - 5.25rem)",
                    },
                })}
                header={
                    <Header
                        links={[
                            { link: "/", label: "Поиск Вакансий" },
                            { link: "/starred", label: "Избранное" },
                        ]}
                    />
                }
            >
                {content}
            </AppShell>
        </>
    );
}
