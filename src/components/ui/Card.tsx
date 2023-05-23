import { createStyles, rem } from "@mantine/core";

const useStyles = createStyles((theme, { padding }: { padding: number }) => ({
    card: {
        border: `1px solid ${theme.colors.gray[1]}`,
        borderRadius: 12,
        padding: rem(padding),
        backgroundColor: theme.white,

        "&:not(:last-child)": {
            marginBottom: "1rem",
        },
    },
}));

export default function Card({
    children,
    padding = 24,
}: {
    children: React.ReactNode;
    padding?: number;
}) {
    const { classes } = useStyles({ padding });

    return <div className={classes.card}>{children}</div>;
}
