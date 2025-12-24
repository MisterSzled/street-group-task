import { useMutation, UseMutationOptions, UseMutationResult } from "@tanstack/react-query";

type SafeMutationResult<TVariables, TData, TError>
        = Omit<UseMutationResult<TData, TError, TVariables>, "mutate" | "mutateAsync"> & {
                mutate: (variables: TVariables, ...args: any[]) => void;
                mutateAsync: (variables: TVariables, ...args: any[]) => Promise<TData | undefined>;
        }

export function useSingleMutation<
        TData = unknown,
        TError = unknown,
        TVariables = void
>(options: UseMutationOptions<TData, TError, TVariables>): SafeMutationResult<TVariables, TData, TError> {
        const mutation = useMutation<TData, TError, TVariables>(options);

        const safeMutate = (variables: TVariables, ...rest: any[]) => {
                if (!mutation.isPending) {
                        mutation.mutate(variables, ...rest);
                }
        };

        const safeMutateAsync = async (variables: TVariables, ...rest: any[]): Promise<TData | undefined> => {
                if (mutation.isPending) {
                        return undefined
                }
                try {
                        return await mutation.mutateAsync(variables, ...rest);
                } catch (error) {
                        throw error
                }
        }

        return {
                ...mutation,
                mutate: safeMutate,
                mutateAsync: safeMutateAsync
        } as SafeMutationResult<TVariables, TData, TError>
}