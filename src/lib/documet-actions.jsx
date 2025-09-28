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

//Fetch Document by ID
const fetchDocumentById = async (id) => {
  const { data, error } = await supabase
    .from("Documents")
    .select("*")
    .eq("id", id)
    .single();
  return data;
};

export const useFetchDocumentById = (id) => {
  return useQuery({ queryKey: ["document", id], queryFn: ()=>fetchDocumentById(id) });
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

//Edit Document
const editDocument = async (document) => {
  const { data, error } = await supabase
    .from("Documents")
    .update(document)
    .eq("id", document.id)
    .select()
    .single();

  if (error) {
    console.error("Error updating document:", error);
    throw error;
  }

  return data;
};

export const useEditDocument = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: editDocument,
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["documents"] });
    },
  });
};
