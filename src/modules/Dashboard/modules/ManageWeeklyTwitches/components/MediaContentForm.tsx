import { useEffect, useState } from "react";
import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    Input,
    Textarea,
    Select,
    VStack
} from "@chakra-ui/react";
import ReactSelect from "react-select";
import moment from "moment";
import { privateGateway } from "@/MuLearnServices/apiGateways";
import { onboardingRoutes } from "@/MuLearnServices/urls";
import {
    ContentTypeConfig,
    MediaContentRecord
} from "../services/types";

interface IgOption {
    label: string;
    value: string;
}

export interface MediaContentFormProps {
    config: ContentTypeConfig;
    values: Record<string, any>;
    errors: Record<string, string[]>;
    onChange: (name: string, value: any) => void;
}

const slugify = (name: string) =>
    name.toLowerCase().trim().replace(/\s+/g, "-");

export function buildInitialValues(
    config: ContentTypeConfig,
    record?: MediaContentRecord
): Record<string, any> {
    const values: Record<string, any> = {};
    config.fields.forEach(field => {
        if (field.kind === "interestGroups") {
            values[field.name] = record?.interest_groups ?? [];
        } else {
            values[field.name] = (record as any)?.[field.name] ?? "";
        }
    });
    return values;
}

export function buildSubmitBody(
    config: ContentTypeConfig,
    values: Record<string, any>
): Record<string, any> {
    const body: Record<string, any> = {};
    config.fields.forEach(field => {
        const raw = values[field.name];
        if (field.kind === "date") {
            if (raw) {
                // raw is YYYY-MM-DD from the native date input.
                body[field.name] = moment(raw, "YYYY-MM-DD").format(
                    config.dateWriteFormat
                );
            } else if (field.required) {
                // Keep required-but-empty so the API returns its own error.
                body[field.name] = raw ?? "";
            }
            return;
        }
        if (field.kind === "interestGroups") {
            if (Array.isArray(raw) && raw.length > 0) body[field.name] = raw;
            else if (field.required) body[field.name] = raw ?? [];
            return;
        }
        // Strip empty optional strings; keep required even if empty so the API
        // returns its own "required" error message.
        if (raw === "" || raw === null || raw === undefined) {
            if (field.required) body[field.name] = raw;
            return;
        }
        body[field.name] = raw;
    });
    return body;
}

const MediaContentForm = ({
    config,
    values,
    errors,
    onChange
}: MediaContentFormProps) => {
    const [igOptions, setIgOptions] = useState<IgOption[]>([]);

    const needsIgs = config.fields.some(f => f.kind === "interestGroups");

    useEffect(() => {
        if (!needsIgs) return;
        let active = true;
        (async () => {
            try {
                const res = await privateGateway.get(
                    onboardingRoutes.interestGroups,
                    { params: { perPage: 1000, pageIndex: 1 } }
                );
                const list: any[] =
                    res?.data?.response?.interestGroup ?? [];
                if (!active) return;
                setIgOptions(
                    list.map(ig => ({
                        label: ig.name,
                        value: slugify(ig.name)
                    }))
                );
            } catch {
                if (active) setIgOptions([]);
            }
        })();
        return () => {
            active = false;
        };
    }, [needsIgs]);

    return (
        <VStack spacing={4} align="stretch">
            {config.fields.map(field => {
                const fieldErrors = errors[field.name];
                const isInvalid = !!fieldErrors?.length;
                return (
                    <FormControl
                        key={field.name}
                        isRequired={field.required}
                        isInvalid={isInvalid}
                    >
                        <FormLabel>{field.label}</FormLabel>

                        {field.kind === "textarea" && (
                            <Textarea
                                value={values[field.name] ?? ""}
                                rows={3}
                                onChange={e =>
                                    onChange(field.name, e.target.value)
                                }
                            />
                        )}

                        {field.kind === "zone" && (
                            <Select
                                placeholder="Select zone"
                                value={values[field.name] ?? ""}
                                onChange={e =>
                                    onChange(field.name, e.target.value)
                                }
                            >
                                <option value="north">North</option>
                                <option value="central">Central</option>
                                <option value="south">South</option>
                            </Select>
                        )}

                        {field.kind === "interestGroups" && (
                            <ReactSelect
                                isMulti
                                options={igOptions}
                                value={(values[field.name] ?? []).map(
                                    (v: string) =>
                                        igOptions.find(o => o.value === v) ?? {
                                            label: v,
                                            value: v
                                        }
                                )}
                                onChange={selected =>
                                    onChange(
                                        field.name,
                                        (selected as IgOption[]).map(
                                            s => s.value
                                        )
                                    )
                                }
                            />
                        )}

                        {(field.kind === "text" ||
                            field.kind === "url" ||
                            field.kind === "date") && (
                            <Input
                                type={
                                    field.kind === "date"
                                        ? "date"
                                        : field.kind === "url"
                                        ? "url"
                                        : "text"
                                }
                                value={values[field.name] ?? ""}
                                onChange={e =>
                                    onChange(field.name, e.target.value)
                                }
                            />
                        )}

                        {isInvalid && (
                            <FormErrorMessage>
                                {fieldErrors.join(" ")}
                            </FormErrorMessage>
                        )}
                    </FormControl>
                );
            })}
        </VStack>
    );
};

export default MediaContentForm;
