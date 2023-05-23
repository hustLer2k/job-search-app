import {
    createStyles,
    PaginationProps,
    Pagination as MantinePagination,
} from "@mantine/core";

const useStyles = createStyles((theme) => ({
    pagination: {
        justifyContent: "center",
        marginTop: "2.5rem",
    },

    paginationControls: {
        border: `1px solid ${theme.colors.gray[2]}`,
        borderRadius: 4,
    },
}));

export default function Pagination(props: PaginationProps) {
    const { classes } = useStyles();

    return (
        <MantinePagination
            {...props}
            className={classes.pagination}
            classNames={{
                control: classes.paginationControls,
            }}
        />
    );
}
