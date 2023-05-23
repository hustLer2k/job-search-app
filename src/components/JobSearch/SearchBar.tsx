import { TextInput, Button, useMantineTheme, rem } from "@mantine/core";
import IconSearch from "@src/assets/search-icon.svg";
import { forwardRef } from "react";

const SearchBar = forwardRef(
    (
        {
            onSearch,
            loading,
        }: {
            onSearch: () => void;
            loading: boolean;
        },
        ref: React.Ref<HTMLInputElement>
    ) => {
        const theme = useMantineTheme();

        return (
            <TextInput
                styles={(theme) => ({
                    wrapper: {
                        height: rem(48),
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: `0 ${rem(12)}px`,
                        gap: rem(10),
                        marginBottom: "1.2rem",
                    },

                    input: {
                        height: rem(48),
                        borderColor: theme.colors.gray[1],
                        "&:hover, &:focus": {
                            border: "1px solid",
                            borderColor: theme.colors.blue[4],
                        },
                    },
                })}
                icon={<img src={IconSearch} alt="A loop" />}
                rightSection={
                    <Button
                        size={"sm"}
                        color={theme.primaryColor}
                        variant="filled"
                        fw={500}
                        onClick={onSearch}
                        data-elem="search-button"
                    >
                        Поиск
                    </Button>
                }
                placeholder="Введите название вакансии"
                rightSectionWidth={110}
                ref={ref}
                disabled={loading}
                data-elem="search-input"
            />
        );
    }
);

export default SearchBar;
