import {
    createStyles,
    Title,
    Text,
    rem,
    Group,
    Anchor,
    Box,
} from "@mantine/core";
import Card from "./ui/Card";
import LocationIcon from "@src/assets/location-icon.svg";
import Star from "./icons/Star";
import { JobType } from "@src/routes/JobSearch";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const useStyles = createStyles((theme, alt: boolean) => ({
    anchor: {
        color: "inherit",
    },

    title: {
        color: alt ? theme.black : theme.colors.blue[4],
        fontWeight: alt ? 700 : 600,
        fontFamily: theme.fontFamily,
        fontSize: alt ? rem(28) : rem(20),
        lineHeight: alt ? rem(34) : rem(24),

        [theme.fn.smallerThan("xs")]: {
            fontSize: alt ? rem(22) : rem(18),
        },
    },

    separatedText: {
        margin: `${alt ? 0.8 : 0.5}rem 0`,
        fontSize: alt ? rem(20) : rem(16),

        [theme.fn.smallerThan("xs")]: {
            fontSize: alt ? rem(16) : rem(14),

            "& > span": {
                display: "block",
            },
        },

        whiteSpace: "pre-line",
    },

    salary: {
        fontWeight: alt ? 700 : 600,
        fontSize: alt ? rem(20) : rem(16),

        [theme.fn.smallerThan("xs")]: {
            fontSize: alt ? rem(16) : rem(14),
        },
    },

    separator: {
        fontSize: rem(20),
        margin: "0 0.7rem",
        color: theme.colors.gray[5],
        fontFamily: theme.headings.fontFamily,

        [theme.fn.smallerThan("xs")]: {
            visibility: "hidden",
            height: rem(15),
        },
    },

    town: {
        [theme.fn.smallerThan("xs")]: {
            marginTop: "0.5rem",
            fontSize: rem(14),
        },
    },
}));

interface Props extends JobType {
    alternativeStyle?: boolean;
    onStar?: (id: string) => void;
}

export interface StarredStorage {
    [key: string]: JobType;
}

export default function Job(props: Props) {
    const { classes } = useStyles(!!props.alternativeStyle);

    let salaryText = "",
        currency = props.currency;
    if (props.payment_from && props.payment_to) {
        salaryText = `${props.payment_from} - ${props.payment_to}`;
    } else if (props.payment_from) {
        salaryText = `от ${props.payment_from}`;
    } else if (props.payment_to) {
        salaryText = `до ${props.payment_to}`;
    } else {
        salaryText = "не указана";
        currency = "";
    }

    const [active, setActive] = useState(false);

    useEffect(() => {
        if (localStorage.starred) {
            const starred: StarredStorage = JSON.parse(localStorage.starred);

            if (props.id in starred) {
                setActive(true);
            }
        }
    }, [props.id]);

    const clickHandler = (event: React.MouseEvent<SVGElement>) => {
        event.preventDefault();

        const starred: StarredStorage = localStorage.starred
            ? JSON.parse(localStorage.starred)
            : {};

        if (active) {
            delete starred[props.id];
            setActive(false);
        } else {
            starred[props.id] = props;
            setActive(true);
        }

        localStorage.starred = JSON.stringify(starred);

        props.onStar?.(props.id);
    };

    const Wrapper = props.alternativeStyle ? Box : Anchor;
    const wrapperProps = props.alternativeStyle
        ? {}
        : { component: Link, to: `/job/${props.id}`, underline: false };

    return (
        <Card>
            {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
            {/* @ts-ignore */}
            <Wrapper
                {...wrapperProps}
                className={classes.anchor}
                data-elem={`vacancy-${props.id}`}
            >
                <Group position="apart" noWrap>
                    <Title order={2} className={classes.title}>
                        {props.profession}
                    </Title>

                    <Star
                        active={active}
                        clickHandler={clickHandler}
                        dataElem={`vacancy-${props.id}-shortlist-button`}
                    />
                </Group>
                <Text className={classes.separatedText}>
                    <span className={classes.salary}>
                        з/п {salaryText} {currency}
                    </span>
                    <span className={classes.separator}>•</span>
                    <span>{props.type_of_work.title}</span>
                </Text>
                <Group spacing="xs">
                    <img src={LocationIcon} />
                    <Text className={classes.town}>
                        {props.town.title}
                    </Text>{" "}
                </Group>
            </Wrapper>
        </Card>
    );
}
