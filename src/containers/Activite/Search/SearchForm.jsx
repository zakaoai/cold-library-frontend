import React from "react";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";
import { useForm } from "react-hook-form";
import TextField from "@mui/material/TextField";

const SearchForm = ({ setSearch, defaultSearch }) => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({ defaultValues: { search: defaultSearch } });
  const onSubmit = ({ search }) => setSearch(search);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextField
        label={"Anime à chercher"}
        error={errors.search}
        helperText={errors.search !== undefined ? errors.search.message : ""}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton color="primary" type="submit" aria-label="submit" size="large">
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          ),
          ...register("search", {
            required: "Champs requis",
            minLength: { value: 3, message: "La recherche doit faire 3 caractères minimum" }
          })
        }}
      />
    </form>
  );
};

export default SearchForm;
