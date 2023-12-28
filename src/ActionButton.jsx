import styled from "styled-components"

const StyledActionButton = styled.button`
  justify-self: end;
  display: flex;
  align-items: center;
  gap: 0.8rem;
  border: none;
  background-color: transparent;
  transition: opacity 0.3s;

  &:hover {
    opacity: 0.4;
  }

  @media (min-width: 768px) {
    grid-column: 3 / 4;
    grid-row: 1 / 2;
  }
`
const Icon = styled.img``

const Text = styled.p`
  font-weight: 500;
  font-size: 1.6rem;
  color: var(${({ color }) => color});
`

export default function ActionButton({ src, text, color, onClick }) {
  return (
    <StyledActionButton onClick={onClick}>
      <Icon src={src} alt={`${text.toLowerCase()} icon`} />
      <Text color={color}>{text}</Text>
    </StyledActionButton>
  )
}
