import styled from "styled-components"

const StyledButton = styled.button`
  background-color: var(--color-moderate-blue);
  color: var(--color-white);
  text-transform: uppercase;
  border: none;
  border-radius: 9px;
  justify-self: ${({ isEditing }) => (isEditing ? "start" : "end")};
  padding: 1.2rem 3.2rem;
  font-size: 1.8rem;
  transition: opacity 0.3s;

  &:hover {
    opacity: 0.5;
  }

  @media (min-width: 768px) {
    grid-column: 3 / 4;
    grid-row: ${({ isEditing }) => (isEditing ? "3 / 4" : "1 / 2")};
    justify-self: end;
  }
`

export default function Button({ children, isEditing, onClick }) {
  return (
    <StyledButton onClick={onClick} isEditing={isEditing}>
      {children}
    </StyledButton>
  )
}
