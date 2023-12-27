import { useSearchParams } from "react-router-dom";
import styled, { css } from "styled-components";

const StyledFilter = styled.div`
  border: 1px solid var(--color-grey-100);
  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-sm);
  border-radius: var(--border-radius-sm);
  padding: 0.4rem;
  display: flex;
  gap: 0.4rem;
`;

const FilterButton = styled.button`
  background-color: var(--color-grey-0);
  border: none;

  ${(props) =>
    props.active &&
    css`
      background-color: var(--color-brand-600);
      color: var(--color-brand-50);
    `}

  border-radius: var(--border-radius-sm);
  font-weight: 500;
  font-size: 1.4rem;
  /* To give the same height as select */
  padding: 0.44rem 0.8rem;
  transition: all 0.3s;

  &:hover:not(:disabled) {
    background-color: var(--color-brand-600);
    color: var(--color-brand-50);
  }
`;

function Filter({ fieldFilter, options }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentOption = searchParams.get(fieldFilter) || options.at(0).value;

  function handleClick(value) {
    // We set the value in the url with the key discount
    searchParams.set(fieldFilter, value);

    // Reset the page number to 1 in case there had been any pagination
    if (searchParams.get("page")) searchParams.set("page", 1);

    // Refresh the URL
    setSearchParams(searchParams);
  }

  return (
    <StyledFilter>
      {options.map((option) => (
        <FilterButton
          active={option.value === currentOption}
          disabled={option.value === currentOption}
          onClick={() => handleClick(option.value)}
          key={option.value}
        >
          {option.label}
        </FilterButton>
      ))}
    </StyledFilter>
  );
}

export default Filter;
