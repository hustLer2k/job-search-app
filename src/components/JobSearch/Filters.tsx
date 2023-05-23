import { Group, Stack, Title, Button, createStyles, rem } from "@mantine/core";
import IndustrySelect from "./IndustrySelect";
import SalaryInput from "./SalaryInput";
import Cross from "@src/assets/cross.svg";
import Card from "../ui/Card";

const useStyles = createStyles((theme) => ({
    group: {
        justifyContent: "space-between",
    },

    filtersTitle: {
        fontSize: rem(20),
        fontWeight: 700,
    },

    resetButton: {
        fontWeight: 500,
        color: theme.colors.gray[4],
        padding: 0,

        "&:hover": {
            color: theme.colors.blue[3],
        },
        "&:active": {
            color: theme.fn.primaryColor(),
        },
    },

    button: {
        fontWeight: 500,
    },
}));

export default function Filters({
    setPaymentFrom,
    setPaymentTo,
    setCatalogue,
    paymentFrom,
    paymentTo,
    catalogue,
    reset,
    onApply,
    loading,
}: {
    setPaymentFrom: React.Dispatch<React.SetStateAction<number | "">>;
    setPaymentTo: React.Dispatch<React.SetStateAction<number | "">>;
    setCatalogue: (filters: string) => void;
    paymentFrom: number | "";
    paymentTo: number | "";
    catalogue: string | null;
    reset: () => void;
    onApply: () => void;
    loading: boolean;
}) {
    const { classes } = useStyles();

    return (
        <Card padding={20}>
            <Stack bg="white">
                <Group className={classes.group}>
                    <Title order={2} className={classes.filtersTitle}>
                        Фильтры
                    </Title>
                    <Button
                        variant="white"
                        className={classes.resetButton}
                        onClick={reset}
                    >
                        Сбросить все <img src={Cross} />
                    </Button>
                </Group>

                <IndustrySelect setCatalogue={setCatalogue} value={catalogue} />
                <SalaryInput
                    setPayment={setPaymentFrom}
                    placeholder="От"
                    label="Оклад"
                    value={paymentFrom}
                    dataElem="salary-from-input"
                />
                <SalaryInput
                    setPayment={setPaymentTo}
                    placeholder="До"
                    value={paymentTo}
                    dataElem="salary-to-input"
                />

                <Button
                    className={classes.button}
                    type="reset"
                    onClick={onApply}
                    disabled={loading}
                    data-elem="search-button"
                >
                    Применить
                </Button>
            </Stack>
        </Card>
    );
}
