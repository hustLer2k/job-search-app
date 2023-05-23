import { Container, rem } from "@mantine/core";
import { useLoaderData, LoaderFunctionArgs } from "react-router-dom";
import { JobType } from "./JobSearch";
import Job from "@src/components/Job";
import { RichTextEditor } from "@mantine/tiptap";

import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

interface JobTypeWithText extends JobType {
    vacancyRichText: string;
}

export default function JobPage() {
    const jobData = useLoaderData() as JobTypeWithText;

    const editor = useEditor({
        extensions: [StarterKit],
        content: jobData.vacancyRichText,
        editable: false,
    });

    return (
        <Container size={rem(780)} p={0}>
            <Job alternativeStyle {...jobData} />

            <RichTextEditor
                editor={editor}
                styles={(theme) => ({
                    root: {
                        marginTop: "1.5rem",
                        padding: rem(24),
                        border: `1px solid ${theme.colors.gray[1]}`,
                        backgroundColor: theme.white,
                        borderRadius: 12,

                        [theme.fn.smallerThan("xs")]: {
                            padding: rem(10),
                        },
                    },

                    content: {
                        "& p": {
                            fontSize: rem(16),
                        },
                        "& strong": {
                            fontSize: rem(20),
                            fontFamily: theme.headings.fontFamily,
                        },
                    },
                })}
            >
                <RichTextEditor.Content />
            </RichTextEditor>
        </Container>
    );
}

export function loader({ params }: LoaderFunctionArgs) {
    return fetch(
        `https://startup-summer-2023-proxy.onrender.com/2.0/vacancies/${params.id}`,
        {
            headers: {
                "x-secret-key": import.meta.env.VITE_SECRET_KEY,
                "X-Api-App-Id": import.meta.env.VITE_APP_ID,
            },
        }
    );
}
