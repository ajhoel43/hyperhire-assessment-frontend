import { useMutation, useQuery } from "@tanstack/react-query";
// import Config from "react-native-config";
import { composeURLParams } from "@/lib/utils";
import type { AccountProps } from "@/types/account";

type Response = {
	message: string;
	// people?: AccountProps,
	// peoples?: AccountProps[]
	[key: string]: any;
};

type MutationParamsProps = {
	accountId: number;
};

// const apiURL = Config.API_URL || "http://localhost:8000";
const apiURL = "http://localhost:8000";

export const useLikeMutation = () => {
	// const queryClient = useQueryClient();

	const likeAccount = useMutation({
		mutationFn: async ({ accountId }: MutationParamsProps) => {
			const res = (await fetch(`${apiURL}/api/${accountId}/like`).then((res) =>
				res.json(),
			)) as Response;

			return res;
		},
		onSuccess: () => {
			// TODO: Save into Recoil State
		},
		onError: (error) => {
			console.log("useLikeMutation.likeAccount -> error", error);
		},
	});

	const dislikeAccount = useMutation({
		mutationFn: async ({ accountId }: MutationParamsProps) => {
			const res = (await fetch(`${apiURL}/api/${accountId}/dislike`).then(
				(res) => res.json(),
			)) as Response;

			return res;
		},
		onSuccess: (response) => {
			// TODO: Save into Recoil State
			console.log("useLikeMutation.dislikeAccount -> Success Dislike");
		},
		onError: (error) => {
			console.log("useLikeMutation.dislikeAccount -> error", error);
		},
	});

	return { likeAccount, dislikeAccount };
};

export const useRecommendationAccount = () => {
	return useQuery({
		queryKey: ["acc-recommendation"],
		queryFn: () => fetchRecommended(),
		placeholderData: (prevData) => prevData,
	});
};

export const useLikedAccount = () => {
	return useQuery({
		queryKey: ["acc-liked"],
		queryFn: () => fetchLiked(),
		placeholderData: (prevData) => prevData,
	});
};

type ResponseGetPagination = Response & {
	peoples: {
		data: AccountProps[];
		current_page: number;
		next_page_url: string;
		prev_page_url: string;
	};
};

const fetchRecommended = async () => {
	const endpoint = `/api/people/recommendation`;
	const defaultLimit = 10;
	const params = composeURLParams({ limit: defaultLimit });

	const result = (await fetch(`${apiURL}${endpoint}?${params}`, {
		method: "GET",
	}).then((res) => res.json())) as Response & {
		peoples: {
			data: AccountProps[];
			[key: string]: any;
		};
	};

	console.log("Recommended Account", result);

	return result;
};

const fetchLiked = async () => {
	const endpoint = `/api/people/liked`;
	const defaultLimit = 10;
	const params = composeURLParams({ limit: defaultLimit });

	const result = (await fetch(`${apiURL}${endpoint}?${params}`, {
		method: "GET",
	}).then((res) => res.json())) as ResponseGetPagination;

	return result;
};
