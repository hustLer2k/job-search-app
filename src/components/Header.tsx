import { createStyles, Header, Group, rem, Title } from "@mantine/core";
import { NavLink } from "react-router-dom";
import logo from "../assets/logo.svg";

const useStyles = createStyles((theme) => ({
    header: {
        display: "flex",
        alignItems: "center",
        height: "100%",
        justifyContent: "space-evenly",
        width: "100%",
    },

    link: {
        display: "block",
        lineHeight: 1,
        padding: `${rem(8)} ${rem(12)}`,
        borderRadius: theme.radius.sm,
        textDecoration: "none",
        color: theme.black,
        fontSize: rem(16),
    },

    linkActive: {
        color: theme.colors.blue[4],
        fontWeight: 500,
    },

    logoGroup: {
        [theme.fn.largerThan("md")]: {
            width: "25%",
            display: "flex",
            justifyContent: "center",
        },

        [theme.fn.smallerThan("xs")]: {
            display: "none",
        },
    },

    navGroup: {
        [theme.fn.largerThan("md")]: {
            width: "25%",
            marginRight: "37.5%",
            display: "flex",
            justifyContent: "center",
        },

        "& > *": {
            whiteSpace: "nowrap",
        },
    },
}));

interface HeaderSimpleProps {
    links: { link: string; label: string }[];
}

export default function SimpleHeader({ links }: HeaderSimpleProps) {
    const { classes, cx } = useStyles();

    const items = links.map((link) => (
        <NavLink
            key={link.label}
            to={link.link}
            className={({ isActive }) =>
                cx(classes.link, {
                    [classes.linkActive]: isActive,
                })
            }
        >
            {link.label}
        </NavLink>
    ));

    return (
        <Header height={rem(84)} className={classes.header}>
            <Group className={classes.logoGroup}>
                <img src={logo} alt="Logo"></img>
                <Title>Jobored</Title>
            </Group>

            <Group spacing={60} noWrap className={classes.navGroup}>
                {items}
            </Group>
        </Header>
    );
}
