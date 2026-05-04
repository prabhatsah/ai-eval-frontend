import { render, screen } from "@testing-library/react";

test("renders hello", () => {
  render(<div>Hello Jest</div>);
  expect(screen.getByText("Hello Jest")).toBeInTheDocument();
});
