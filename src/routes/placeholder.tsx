import { Center, Stack, Text, Button, rem } from "@mantine/core";
import PlaceholderImage from "@src/assets/placeholder.svg";
import { Link } from "react-router-dom";

export default function Placeholder({
    showLink = true,
    mt = "0rem",
    fullscreen = false,
}: {
    showLink?: boolean;
    mt?: string;
    fullscreen?: boolean;
}) {
    return (
        <Center h={`100${fullscreen ? "vh" : "%"}`} mt={mt}>
            <Stack spacing="xl" align="center">
                <img src={PlaceholderImage} alt="Placeholder" width={240} />
                <Text weight={700} size={rem(24)} color="gray.8" align="center">
                    Упс, здесь еще ничего нет!
                </Text>
                {showLink && (
                    <Button
                        variant="light"
                        component={Link}
                        to="/"
                        size="md"
                        styles={(theme) => ({
                            root: {
                                fontWeight: 500,
                                fontSize: rem(14),
                                color: theme.colors.blue[5],
                                backgroundColor: theme.colors.blue[0],
                            },
                        })}
                    >
                        Поиск Вакансий
                    </Button>
                )}
            </Stack>
        </Center>
    );
}
