import {
  queryOptions,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { supabase } from "@/utils/supabase";

//Fetch Documents
const fetchDocuments = async () => {
  const { data, error } = await supabase.from("Documents").select("*");
  return data;
};

export const useFetchDocuments = () => {
  return useQuery({ queryKey: ["documents"], queryFn: fetchDocuments });
};

// Add Document
const addDocument = async (document) => {
  const { data, error } = await supabase
    .from("Documents")
    .insert(document)
    .single();

  if (error) {
    throw error;
  }
  return data;
};

export const useAddDocument = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addDocument,
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["documents"] });
    },
  });
};
