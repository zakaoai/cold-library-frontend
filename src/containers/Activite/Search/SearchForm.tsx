import SearchFormValues from "@/interfaces/containers/Activite/Search/SearchFormValues";
import { AnimeDTO } from "@/interfaces/services/AnimeService/AnimeDTO";
import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import { UseMutateFunction } from "@tanstack/react-query";
import { useCallback } from "react";

import { UseFormReturn } from "react-hook-form";

interface SearchFormProps {
  searchAnime: UseMutateFunction<AnimeDTO[], unknown, string, unknown>;
  form: UseFormReturn<SearchFormValues, unknown, undefined>;
}

const SearchForm = ({ searchAnime, form }: SearchFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = form;
  const onSubmit = useCallback(({ search }: SearchFormValues) => searchAnime(search), [searchAnime]);

  const searchInput = register("search", {
    required: "Champs requis",
    minLength: { value: 3, message: "La recherche doit faire 3 caractères minimum" }
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextField
        label={"Anime à chercher"}
        error={!!errors.search}
        helperText={errors.search?.message || ""}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton color="primary" type="submit" aria-label="submit" size="large">
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          ),
          ...searchInput
        }}
      />
    </form>
  );
};

export default SearchForm;
