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
const apiURL = "https://demo-hyperhire.ajulity.com";

export const useLikeMutation = () => {
	// const queryClient = useQueryClient();

	const likeAccount = useMutation({
		mutationFn: async ({ accountId }: MutationParamsProps) => {
			const res = (await fetch(`${apiURL}/api/people/${accountId}/like`, { method: 'POST' }).then((res) =>
				res.json(),
			)) as Response;

			return res;
		},
		onSuccess: () => {
			// TODO: Save into Recoil State
      console.log("useLikeMutation.likeAccount -> success");
		},
		onError: (error) => {
			console.log("useLikeMutation.likeAccount -> error", error);
		},
	});

	const dislikeAccount = useMutation({
		mutationFn: async ({ accountId }: MutationParamsProps) => {
			const res = (await fetch(`${apiURL}/api/people/${accountId}/dislike`, { method: 'POST' }).then(
				(res) => res.json(),
			)) as Response;

			return res;
		},
		onSuccess: (response) => {
			// TODO: Save into Recoil State
			console.log("useLikeMutation.dislikeAccount -> success");
		},
		onError: (error) => {
			console.log("useLikeMutation.dislikeAccount -> error", error);
		},
	});

	return { likeAccount, dislikeAccount };
};

export const useRecommendationAccount = (params: GetParams) => {
	return useQuery({
		queryKey: ["acc-recommendation", params.page, params.limit],
		queryFn: () => fetchRecommended(params),
		placeholderData: (prevData) => prevData,
	});
};

export const useLikedAccount = (params: GetParams) => {
	return useQuery({
		queryKey: ["acc-liked", params.page, params.limit],
		queryFn: () => fetchLiked(params),
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

type GetParams = {
  page?: number;
  limit?: number
}

const fetchRecommended = async ({ page = 1, limit = 10 }: GetParams) => {
	const endpoint = `/api/people/recommendation`;
	const params = composeURLParams({ limit, page });

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

const fetchLiked = async ({ page = 1, limit = 10 }: GetParams) => {
	const endpoint = `/api/people/liked`;
	const params = composeURLParams({ limit, page });

	const result = (await fetch(`${apiURL}${endpoint}?${params}`, {
		method: "GET",
	}).then((res) => res.json())) as ResponseGetPagination;

	return result;
};
