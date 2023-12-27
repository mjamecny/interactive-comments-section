import styled from "styled-components"

const StyledMessageInput = styled.textarea`
  width: 100%;
  height: 100px;
  border-radius: 5px;
  border: 2px solid var(--color-light-gray);
  resize: none;
  padding: 0.8rem 1.6rem;
  color: var(--color-dark-blue);
  grid-column: 1 / -1;

  &:focus {
    outline: 2px solid var(--color-dark-blue);
  }
`

export default function MessageInput({ placeholder = "", value, onChange }) {
  return (
    <StyledMessageInput
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    ></StyledMessageInput>
  )
}
