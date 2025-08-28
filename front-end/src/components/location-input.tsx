import React from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete-next";
import { PageBox } from "./page-container";
import { useTheme } from "src/themes/theme-context";

interface LocationInputProps {
  label: string;
  value: string | null;
  onChange: (value: string | null) => void;
}

export default function LocationInput({
  label,
  value,
  onChange,
}: LocationInputProps) {
  const { theme } = useTheme();

  return (
    <PageBox>
      <GooglePlacesAutocomplete
        selectProps={{
          value: value ? { label: value, value } : null,
          onChange: (newValue: any) => onChange(newValue?.label ?? null),
          placeholder: label,
          styles: {
            control: (base, state) => ({
              ...base,
              minHeight: 56,
              minWidth: 256,
              backgroundColor: theme.backgroundColor,
              borderColor: state.isFocused ? 'var(--color-primary)' : 'var(--color-primary)',
              boxShadow: state.isFocused ? '0 0 0 1px var(--color-primary)' : 'none',
              "&:hover": { borderColor: 'var(--color-primary)' },
            }),
            singleValue: (base) => ({ ...base, color: theme.textColor }),
            placeholder: (base) => ({ ...base, color: theme.textColor }),
            input: (base) => ({ ...base, color: theme.textColor }),
            menu: (base) => ({
              ...base,
              backgroundColor: theme.backgroundColor,
              borderRadius: 4,
              marginTop: 4,
            }),
            option: (base, state) => ({
              ...base,
              backgroundColor: state.isFocused
                ? 'var(--color-secondary)'
                : theme.backgroundColor,
              color: theme.textColor,
              cursor: 'pointer',
              "&:active": { backgroundColor: 'var(--color-primary)' },
            }),
          },
        }}
        autocompletionRequest={{
          types: ["(regions)"],
        }}
      />
    </PageBox>
  );
}
