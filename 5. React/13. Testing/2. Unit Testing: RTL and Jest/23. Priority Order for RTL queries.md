# Priority order for RTL queries

We should be following same priority order of RTL quries as it is available on the documentation. If one is not available then go to next. For example if `ByRole` is not available then go for `ByLabelText`. If `ByLabelText` is not available then go for the next ByPlacholderText and so on...

1. `ByRole`
2. `ByLabelText`
3. `ByPlaceholderText`
4. `ByText`
5. `ByDisplayValue`
6. `ByAltText`
7. `ByTitle`
8. `ByTestId`
