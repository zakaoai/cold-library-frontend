import React from "react";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";
import IconButton from "@material-ui/core/IconButton";
import { useForm } from "react-hook-form";
import TextField from "@material-ui/core/TextField";

const SearchForm = ({ setSearch }) => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();
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
              <IconButton color="primary" type="submit" aria-label="submit" component="span">
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
