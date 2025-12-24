import { useBankHolidays } from "@/src/features/bank_holiday/hooks/useBankHolidays";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Platform, Text, TextInput, View } from "react-native";
import { StyleSheet } from "react-native-unistyles";

import Button from "@/src/__core/components/Button";
import { useUpdateBankHoliday } from "@/src/features/bank_holiday/hooks/useUpdateBankHoliday";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

const today = new Date();
const sixMonthsFromNow = new Date();
sixMonthsFromNow.setMonth(today.getMonth() + 6);

export const BankHolidayFormSchema = z.object({
        title: z.string().min(1, "Title is required"),
        date: z.date().refine(date => {
                return date >= today && date <= sixMonthsFromNow;
        }, { message: "Date must be between today and 6 months from now" }),
});

export type BankHolidayFormValues = z.infer<typeof BankHolidayFormSchema>;

export default function Index() {
        const { slug } = useLocalSearchParams<{ slug: string }>();
        const bank_holidays = useBankHolidays(s => s.bank_holidays);
        const { mutate: updateBankHoliday, isPending } = useUpdateBankHoliday();

        const bank_holiday = bank_holidays.find(event => event.slug === slug);

        const [showPicker, setShowPicker] = useState(false);

        const {
                control,
                handleSubmit,
                reset,
                formState: { errors },
        } = useForm<BankHolidayFormValues>({
                resolver: zodResolver(BankHolidayFormSchema),
                defaultValues: {
                        title: "",
                        date: new Date(),
                },
        });

        const onSubmit: SubmitHandler<BankHolidayFormValues> = data => {
                updateBankHoliday({
                        slug: slug,
                        title: data.title,
                        date: data.date,
                });
        };

        useEffect(() => {
                if (bank_holiday) {
                        reset({
                                title: bank_holiday.title,
                                date: new Date(bank_holiday.date),
                        });
                }
        }, [bank_holiday, reset]);

        if (!bank_holiday) {
                return (
                        <View style={styles.container}>
                                <Text>Event not found</Text>
                        </View>
                );
        }

        return (
                <View style={styles.container}>
                        <View style={styles.wrapper}>
                                <Text style={styles.header}>{bank_holiday.title}</Text>

                                <Text style={styles.label}>Title</Text>

                                <Controller
                                        control={control}
                                        name="title"
                                        render={({ field: { value, onChange, onBlur } }) => (
                                                <TextInput
                                                        value={value}
                                                        onChangeText={onChange}
                                                        onBlur={onBlur}
                                                        style={styles.input}
                                                />
                                        )}
                                />
                                {errors.title && <Text style={styles.error}>{errors.title.message}</Text>}

                                <Text style={styles.label}>Date</Text>

                                <Controller
                                        control={control}
                                        name="date"
                                        render={({ field: { value, onChange } }) => {
                                                if (Platform.OS === "web") {
                                                        const webValue = value.toISOString().split("T")[0];
                                                        const min = today.toISOString().split("T")[0];
                                                        const max = sixMonthsFromNow.toISOString().split("T")[0];

                                                        return (
                                                                <TextInput
                                                                        style={styles.input}
                                                                        value={webValue}
                                                                        onChangeText={text => {
                                                                                const next = new Date(`${text}T00:00:00`);
                                                                                if (!isNaN(next.getTime())) onChange(next);
                                                                        }}
                                                                        // @ts-expect-error web-only prop
                                                                        type="date"
                                                                />
                                                        );
                                                }

                                                return (
                                                        <>
                                                                <Button.Root
                                                                        styles={[styles.button]}
                                                                        onPress={() => setShowPicker(true)}
                                                                >
                                                                        <Button.Text>{value.toDateString()}</Button.Text>
                                                                </Button.Root>

                                                                {showPicker && (
                                                                        <DateTimePicker
                                                                                value={value}
                                                                                mode="date"
                                                                                minimumDate={today}
                                                                                maximumDate={sixMonthsFromNow}
                                                                                display={Platform.OS === "ios" ? "spinner" : "default"}
                                                                                onChange={(_, selectedDate) => {
                                                                                        setShowPicker(false);
                                                                                        if (selectedDate) onChange(selectedDate);
                                                                                }}
                                                                        />
                                                                )}
                                                        </>
                                                );
                                        }}
                                />
                                {errors.date && <Text style={styles.error}>{errors.date.message}</Text>}

                                <Button.Root onPress={handleSubmit(onSubmit)} styles={[styles.button]}>
                                        <Button.Text>{"Save"}</Button.Text>
                                </Button.Root>
                        </View>
                </View>
        );
}

const styles = StyleSheet.create(({ tokens, colors }) => ({
        container: {
                backgroundColor: colors.base_300,
                justifyContent: "center",
                alignItems: "center",
                flex: 1,
        },
        wrapper: {
                backgroundColor: colors.base_100,
                width: 400,
                padding: tokens.spacing.lg,
                borderRadius: tokens.radius.md,
        },
        label: {
                fontSize: tokens.fontSize.lg,
                marginBottom: tokens.spacing.lg,
                color: colors.base_content,
        },
        input: {
                borderWidth: 1,
                borderColor: colors.base_300,
                borderRadius: tokens.radius.sm,
                padding: tokens.spacing.md,
                marginBottom: tokens.spacing.md,
                color: colors.base_content,
        },
        error: {
                color: colors.error,
                marginBottom: tokens.spacing.md,
        },
        button: {
                marginBottom: tokens.spacing.md,
        },
        header: {
                fontSize: tokens.fontSize.xl,
                textAlign: "center",
                color: colors.base_content,
        },
}));
